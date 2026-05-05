/**
 * Written by Brian McCarthy
 */
using System;
using System.Collections.Generic;

namespace MediaLibrarySystem
{
    /// <summary>
    /// Abstract base class representing a generic media item with common properties and validation logic.
    /// </summary>
    public abstract class MediaItem : IDisplayable, ISearchable
    {
        private static int _nextId = 1;
        private readonly int _mediaId;
        private string _title = string.Empty;
        private int _year;
        private string _thumbnail = string.Empty;
        private double _reviewScore;

        protected MediaItem(string title, int year, string thumbnail = "", double reviewScore = 0)
        {
            _mediaId = _nextId++;
            Title = title;
            Year = year;
            Thumbnail = thumbnail;
            ReviewScore = reviewScore;
        }

        public string Thumbnail
        {
            get => _thumbnail;
            set => _thumbnail = value;
        }

        public double ReviewScore
        {
            get => _reviewScore;
            set => _reviewScore = Math.Max(0, Math.Min(5, value));
        }

        /// <summary>
        /// Gets the unique identifier for this media item.
        /// </summary>
        public int MediaId => _mediaId;

        /// <summary>
        /// Gets or sets the title of the media item.
        /// </summary>
        public string Title
        {
            get => _title;
            set
            {
                ValidateTitle(value);
                _title = value;
            }
        }

        /// <summary>
        /// Gets or sets the year the media item was released or published.
        /// </summary>
        public int Year
        {
            get => _year;
            set
            {
                ValidateYear(value);
                _year = value;
            }
        }

        protected void ValidateTitle(string title)
        {
            if (string.IsNullOrWhiteSpace(title))
                throw new ArgumentException("Title cannot be empty or whitespace");
            if (title.Length > 100)
                throw new ArgumentException("Title cannot exceed 100 characters");
        }

        protected void ValidateYear(int year)
        {
            if (year < 1800 || year > DateTime.Now.Year)
                throw new ArgumentException($"Year must be between 1800 and {DateTime.Now.Year}");
        }

        public abstract string GetDisplayInfo();

        public virtual string GetBasicInfo()
        {
            return $"{Title} ({Year})";
        }

        public virtual double GetEstimatedValue()
        {
            int age = DateTime.Now.Year - Year;
            return Math.Max(5.0, 25.0 - (age * 2.0));
        }

        public virtual string GetCategoryInfo()
        {
            return "General Media Item";
        }

        public abstract string GetShortDescription();

        public virtual bool MatchesSearch(string searchTerm)
        {
            return Title.ToLower().Contains(searchTerm.ToLower());
        }

        public virtual List<string> GetSearchableTerms()
        {
            return new List<string> { Title };
        }
    }
}
