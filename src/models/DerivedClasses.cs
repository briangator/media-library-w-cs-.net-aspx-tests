/**
 * Written by Brian McCarthy
 */
using System;
using System.Collections.Generic;

namespace MediaLibrarySystem.Models
{
    public class Book : MediaItem
    {
        public string Author { get; set; } = string.Empty;
        public int PageCount { get; set; }

        public Book(string title, int year, string author, int pageCount, string thumbnail = "", double reviewScore = 0)
            : base(title, year, thumbnail, reviewScore)
        {
            Author = author;
            PageCount = pageCount;
        }

        public override string GetDisplayInfo() => $"Book: {Title} by {Author} ({Year}) - {PageCount} pages";
        public override string GetShortDescription() => $"{Title} by {Author}";
        public override double GetEstimatedValue() => base.GetEstimatedValue() + (PageCount > 300 ? 5.0 : 0.0);
        public override string GetCategoryInfo() => "Literature";
    }

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
