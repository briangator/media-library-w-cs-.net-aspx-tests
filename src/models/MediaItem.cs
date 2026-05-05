/**
 * Written by Brian McCarthy
 */
using System;
using System.Collections.Generic;

namespace MediaLibrarySystem.Models
{
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

        public int MediaId => _mediaId;

        public string Title
        {
            get => _title;
            set
            {
                if (string.IsNullOrWhiteSpace(value)) throw new ArgumentException("Title cannot be empty");
                _title = value;
            }
        }

        public int Year
        {
            get => _year;
            set
            {
                if (value < 1800 || value > DateTime.Now.Year) throw new ArgumentException("Invalid year");
                _year = value;
            }
        }

        public string Thumbnail { get => _thumbnail; set => _thumbnail = value; }
        public double ReviewScore { get => _reviewScore; set => _reviewScore = Math.Max(0, Math.Min(5, value)); }

        public abstract string GetDisplayInfo();
        public virtual string GetBasicInfo() => $"{Title} ({Year})";
        public virtual double GetEstimatedValue() => Math.Max(5.0, 25.0 - ((DateTime.Now.Year - Year) * 2.0));
        public virtual string GetCategoryInfo() => "General Media";
        public abstract string GetShortDescription();
        public virtual bool MatchesSearch(string searchTerm) => Title.ToLower().Contains(searchTerm.ToLower());
        public virtual List<string> GetSearchableTerms() => new List<string> { Title };
    }
}
