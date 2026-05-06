using System;

namespace MediaLibrarySystem.Models.DTO
{
    public class UserProfileDTO
    {
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string JoinDate { get; set; } = string.Empty;
        public string Preference { get; set; } = string.Empty;
    }
}
