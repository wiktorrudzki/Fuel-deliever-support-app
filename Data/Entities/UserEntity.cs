﻿namespace Data.Entities
{
    public class UserEntity
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? LastName { get; set; }

        public  AuthEntity? Auth { get; set; }
    }
}
