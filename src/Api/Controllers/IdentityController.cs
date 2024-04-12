using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("identity")]
[Authorize]
public class IdentityController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return new JsonResult(from c in User.Claims select new { c.Type, c.Value });
    }
}

[Route("home")]
[Authorize]
public class HomeDataController : ControllerBase
{
    [HttpGet]
    public IActionResult GetContext()
    {
        return Ok(new CompanyContext
        {
            CompanyName = "PretendCo",
            CompanyId = 123
        });
    }
}

public record struct CompanyContext
{
    public int CompanyId { get; init; }
    public string CompanyName { get; init; }
}
