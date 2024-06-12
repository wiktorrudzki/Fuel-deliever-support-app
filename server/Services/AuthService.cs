using Data;
using Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Exceptions;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Security.Claims;
using server.Services.Interfaces;

namespace server.Services
{
    public class AuthService:IAuthService
    {
        private readonly AppDbContext _context;
        private readonly AuthenticationSettings _authenticationSettings;
        private readonly IConfiguration _config;

        public AuthService(AuthenticationSettings authenticationSettings,AppDbContext context, IConfiguration config)
        {
            _authenticationSettings = authenticationSettings;
            _context = context;
            _config = config;
        }

        public UserWithTokenDto GenerateToken(LoginUserDto loginUserDto)
        {
            var user = _context.Users.Include(u => u.Auth).FirstOrDefault(p => p.Auth.Login == loginUserDto.Login);
            if (user is null) { throw new BadRequest400Exception("Login or Password is wrong"); }

            bool iscorrect = user.Auth.Password == loginUserDto.Password;
            if (!iscorrect) { throw new BadRequest400Exception("Login or Password is wrong"); }
            //var iscorrect = _passwordHasher.VerifyHashedPassword(user, user.Password, loginUserDto.Password);
            //if (iscorrect == PasswordVerificationResult.Failed) { throw new BadRequest400Exception("Login or Password is wrong"); }


            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Auth.Login),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.JwtKey));
            var credentails = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(_authenticationSettings.JwtExpireDays);
            var token = new JwtSecurityToken(_authenticationSettings.JwtIssuer, _authenticationSettings.JwtIssuer, claims, expires: expires, signingCredentials: credentails);
            var tokenHandler = new JwtSecurityTokenHandler();
            return new UserWithTokenDto()
            {
                Id = user.Id,
                Token = tokenHandler.WriteToken(token),
                Login = user.Auth.Login,
                Name = user.Name,
                LastName = user.LastName, 
            };
        }
    }
}
