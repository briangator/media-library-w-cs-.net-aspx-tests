/**
 * Written by Brian McCarthy
 */
using System;
using System.Collections.Generic;

namespace MediaLibrarySystem
{
    /// <summary>
    /// Represents a book in the media library, including author and page count information.
    /// </summary>
    public class Book : MediaItem
    {
        private string _author = string.Empty;
        private int _pageCount;

        public Book(string title, int year, string author, int pageCount, string thumbnail = "", double reviewScore = 0)
            : base(title, year, thumbnail, reviewScore)
        {
            Author = author;
            PageCount = pageCount;
        }

        public string Author
        {
            get => _author;
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                    throw new ArgumentException("Author cannot be empty");
                _author = value;
            }
        }

        public int PageCount
        {
            get => _pageCount;
            set
            {
                if (value <= 0)
                    throw new ArgumentException("Page count must be positive");
                _pageCount = value;
            }
        }

        public override string GetDisplayInfo() => $"Book: {Title} by {Author} ({Year}) - {PageCount} pages";

        public override string GetShortDescription() => $"{Title} by {Author}";

        public override double GetEstimatedValue()
        {
            double baseValue = base.GetEstimatedValue();
            double pageBonus = PageCount > 300 ? 5.0 : 0.0;
            return baseValue + pageBonus;
        }

        public override string GetCategoryInfo() => "Literature";

        public override List<string> GetSearchableTerms()
        {
            var terms = base.GetSearchableTerms();
            terms.Add(Author);
            return terms;
        }
    }

    /// <summary>
    /// Represents a DVD in the media library.
    /// </summary>
    public class DVD : MediaItem
    {
        private string _director = string.Empty;
        private int _durationMinutes;
        private string _trailerUrl = string.Empty;

        public DVD(string title, int year, string director, int durationMinutes, string thumbnail = "", double reviewScore = 0, string trailerUrl = "")
            : base(title, year, thumbnail, reviewScore)
        {
            Director = director;
            DurationMinutes = durationMinutes;
            TrailerUrl = trailerUrl;
        }

        public string TrailerUrl
        {
            get => _trailerUrl;
            set => _trailerUrl = value;
        }

        public string Director
        {
            get => _director;
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                    throw new ArgumentException("Director cannot be empty");
                _director = value;
            }
        }

        public int DurationMinutes
        {
            get => _durationMinutes;
            set
            {
                if (value <= 0)
                    throw new ArgumentException("Duration must be positive");
                _durationMinutes = value;
            }
        }

        public override string GetDisplayInfo() => $"DVD: {Title} directed by {Director} ({Year}) - {DurationMinutes} min";

        public override string GetShortDescription() => $"{Title} directed by {Director}";

        public override double GetEstimatedValue()
        {
            double baseValue = base.GetEstimatedValue();
            double durationBonus = DurationMinutes > 120 ? 3.0 : 0.0;
            return baseValue + durationBonus;
        }

        public override string GetCategoryInfo() => "Film";

        public override List<string> GetSearchableTerms()
        {
            var terms = base.GetSearchableTerms();
            terms.Add(Director);
            return terms;
        }
    }

    /// <summary>
    /// Represents a music album in the media library.
    /// </summary>
    public class MusicAlbum : MediaItem
    {
        private string _artist = string.Empty;
        private int _trackCount;
        private string _sampleUrl = string.Empty;

        public MusicAlbum(string title, int year, string artist, int trackCount, string thumbnail = "", double reviewScore = 0, string sampleUrl = "")
            : base(title, year, thumbnail, reviewScore)
        {
            Artist = artist;
            TrackCount = trackCount;
            SampleUrl = sampleUrl;
        }

        public string SampleUrl
        {
            get => _sampleUrl;
            set => _sampleUrl = value;
        }

        public string Artist
        {
            get => _artist;
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                    throw new ArgumentException("Artist cannot be empty");
                _artist = value;
            }
        }

        public int TrackCount
        {
            get => _trackCount;
            set
            {
                if (value <= 0)
                    throw new ArgumentException("Track count must be positive");
                _trackCount = value;
            }
        }

        public override string GetDisplayInfo() => $"Music Album: {Title} by {Artist} ({Year}) - {TrackCount} tracks";

        public override string GetShortDescription() => $"{Title} by {Artist}";

        public override double GetEstimatedValue()
        {
            double baseValue = base.GetEstimatedValue();
            double trackBonus = TrackCount > 12 ? 4.0 : 0.0;
            return baseValue + trackBonus;
        }

        public override string GetCategoryInfo() => "Music";

        public override List<string> GetSearchableTerms()
        {
            var terms = base.GetSearchableTerms();
            terms.Add(Artist);
            return terms;
        }
    }
}
