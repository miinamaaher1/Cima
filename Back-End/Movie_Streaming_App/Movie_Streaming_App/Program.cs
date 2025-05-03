namespace Movie_Streaming_App
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddControllers();
            builder.Services.AddHttpsRedirection(options =>
            {
                options.RedirectStatusCode = StatusCodes.Status307TemporaryRedirect;
                options.HttpsPort = 443;
            });
            builder.Services.AddCors(
                c => c.AddPolicy(
                    "allow",
                    c => c.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()
                ));
            var app = builder.Build();

            app.UseHttpsRedirection();
            app.UseHsts();
            app.UseCors("allow");
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
