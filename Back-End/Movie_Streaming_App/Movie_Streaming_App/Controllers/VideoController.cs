using Microsoft.AspNetCore.Mvc;
using Movie_Streaming_App.Models;
using System.Text.Json;

namespace Movie_Streaming_App.Controllers
{
    [Route("api/videos")]
    [ApiController]
    public class VideoController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public VideoController(IConfiguration configuration) => _configuration = configuration;
        [HttpGet("stream")]
        public async Task<IActionResult> StreamVideo(string name)
        {
            using var client = new HttpClient();

            #region Finding Youtube Video ID

            var response = await client.GetAsync($"https://www.googleapis.com/youtube/v3/search?part=snippet&q={name + "Official Trailer"}&type=video&key={_configuration["YoutubeKey"]}");
            if (!response.IsSuccessStatusCode)
                return NotFound();
            string? videoId;
            try
            {
                using JsonDocument doc = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
                videoId = doc.RootElement.GetProperty("items")[0].GetProperty("id").GetProperty("videoId").GetString();
            }
            catch
            {
                return NotFound();
            }

            #endregion

            #region Getting Stream URLs

            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri($"https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id={videoId}"),
                Headers =
                {
                    { "x-rapidapi-key", _configuration["RapidApiKey"] },
                    { "x-rapidapi-host", _configuration["RapidApiHost"] },
                },
            };
            response = await client.SendAsync(request);
            if (!response.IsSuccessStatusCode)
                return NotFound();
            var videoFormats = new List<VideoFormat>();
            try
            {
                using JsonDocument doc = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
                var fullFormats = doc.RootElement.GetProperty("adaptiveFormats");
                foreach (var format in fullFormats.EnumerateArray())
                {
                    if (format.TryGetProperty("qualityLabel", out var quality))
                    {
                        if (!videoFormats.Any(f => f.Quality == int.Parse(quality.ToString().Split("p")[0])))
                            videoFormats.Add(new VideoFormat()
                            {
                                Url = format.GetProperty("url").ToString(),
                                Quality = int.Parse(quality.ToString().Split("p")[0])
                            });
                    }
                    else break;
                }
            }
            catch
            {
                return NotFound();
            }

            #endregion

            return Ok(videoFormats);
        }
    }
}
