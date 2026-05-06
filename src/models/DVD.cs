/**
 * Written by Brian McCarthy
 */
using System;

namespace MediaLibrarySystem.Models
{
    public class DVD : MediaItem
    {
        public string Director { get; set; } = string.Empty;
        public int DurationMinutes { get; set; }
        public string TrailerUrl { get; set; } = string.Empty;

        public DVD(string title, int year, string director, int durationMinutes, string thumbnail = "", double reviewScore = 0, string trailerUrl = "")
            : base(title, year, thumbnail, reviewScore)
        {
            Director = director;
            DurationMinutes = durationMinutes;
            TrailerUrl = trailerUrl;
        }

        public override string GetDisplayInfo() => $"DVD: {Title} directed by {Director} ({Year}) - {DurationMinutes} min";
        public override string GetShortDescription() => $"{Title} directed by {Director}";
        public override double GetEstimatedValue() => base.GetEstimatedValue() + (DurationMinutes > 120 ? 3.0 : 0.0);
        public override string GetCategoryInfo() => "Film";
    }
}
