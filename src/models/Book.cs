/**
 * Written by Brian McCarthy
 */
using System;

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
}
