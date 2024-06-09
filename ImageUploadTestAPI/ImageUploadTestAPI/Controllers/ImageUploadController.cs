using ImageUploadTestAPI.model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ImageUploadTestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageUploadController : ControllerBase
    {
        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage([FromForm]Person person)
        {
            if (person.File == null || person.File.Length == 0)
                return BadRequest("No file uploaded.");

            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images", person.File.FileName);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                await person.File.CopyToAsync(stream);
            }

            return Ok(new { filePath = $"/images/{person.File.FileName}" });
        }
    }
}
