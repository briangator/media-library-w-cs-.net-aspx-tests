using System;

namespace MediaLibrarySystem.Configuration
{
    public class AppSettings
    {
        public string Version { get; set; } = "2.0.0";
        public string Environment { get; set; } = "Production";
        public bool EnableAnalytics { get; set; } = true;
        public string ApiEndpoint { get; set; } = "https://api.medialibrary.pro/v2";
    }
}
