/**
 * Written by Brian McCarthy
 */
using System;

namespace MediaLibrarySystem.Models
{
    public class MusicAlbum : MediaItem
    {
        public string Artist { get; set; } = string.Empty;
        public int TrackCount { get; set; }
        public string SampleUrl { get; set; } = string.Empty;

        public MusicAlbum(string title, int year, string artist, int trackCount, string thumbnail = "", double reviewScore = 0, string sampleUrl = "")
            : base(title, year, thumbnail, reviewScore)
        {
            Artist = artist;
            TrackCount = trackCount;
            SampleUrl = sampleUrl;
        }

        public override string GetDisplayInfo() => $"Music Album: {Title} by {Artist} ({Year}) - {TrackCount} tracks";
        public override string GetShortDescription() => $"{Title} by {Artist}";
        public override double GetEstimatedValue() => base.GetEstimatedValue() + (TrackCount > 12 ? 4.0 : 0.0);
        public override string GetCategoryInfo() => "Music";
    }
}
