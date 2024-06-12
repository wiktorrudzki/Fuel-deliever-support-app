namespace Data.Models
{
    public class UserDto
    {
        public string? Name { get; set; }
        public string? LastName { get; set; }
    }

    public class UserWithTokenDto: UserDto
    {
        public required int Id { get; set; }
        public required string Login { get; set; }
        public required string Token { get; set; }
    }
}
