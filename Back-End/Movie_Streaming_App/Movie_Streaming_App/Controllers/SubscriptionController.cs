using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Movie_Streaming_App.Controllers
{
    [Authorize]
    [Route("api/subscriptions")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
    }
}
