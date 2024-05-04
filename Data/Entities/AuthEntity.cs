using System.ComponentModel.DataAnnotations;

namespace Data.Entities
{
    public class AuthEntity
    {
        [Key]
        public int UserId { get; set; }
        public string? Login { get; set; }
        public string? Password { get; set; }
        public UserEntity User { get; set; }

    }
}
