using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using OutlayService.Models;

namespace OutlayService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("specificdoman")]
    [Route("auth")]
    public class AuthenticationController : ControllerBase
    {
        private readonly OutlayDbContext _context;
        public AuthenticationController(OutlayDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<User>> Login([FromBody]User user)
        {
            if(string.IsNullOrEmpty(user.UserName) || string.IsNullOrEmpty(user.Password))
            {
                return BadRequest("Enter your username and password");
            }

            try
            {
                var exists = _context.Users.Any(n => n.UserName == user.UserName && n.Password == user.Password);
                if (exists)
                
                    return Ok(CreateToken(user));
                
                 return BadRequest("Wrong Credentials");
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
          
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult<User>> Register([FromBody]User user)
        {
            try
            {
                var exists = _context.Users.Any(n => n.UserName == user.UserName);
                if (exists) return BadRequest("User already exists");
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return Ok(CreateToken(user));

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
            
        }

        private JwtPackage CreateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var claims = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Email,user.UserName)
            });
            const string secretKey = "your secret key goes here";
            var securityKey = new SymmetricSecurityKey(Encoding.Default.GetBytes(secretKey));
            var signinCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            var token = (JwtSecurityToken)tokenHandler.CreateJwtSecurityToken(
                 subject: claims,
                 signingCredentials: signinCredentials
                );
            var tokenString = tokenHandler.WriteToken(token);
            return new JwtPackage
            {
                UserName = user.UserName,
                Token = tokenString
            };
        }
    }
}
public class JwtPackage{
    public string Token { get; set; }
    public string UserName { get; set; }
}