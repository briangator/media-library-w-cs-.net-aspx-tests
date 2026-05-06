/**
 * Written by Brian McCarthy
 * Business Logic Layer for Media Operations
 */
using System;
using System.Collections.Generic;
using System.Linq;

namespace MediaLibrarySystem.Services
{
    public class MediaService
    {
        private readonly IMediaLibrary _library;

        public MediaService(IMediaLibrary library)
        {
            _library = library;
        }

        public List<MediaItem> GetItemsByYear(int year)
        {
            return _library.Items.Where(i => i.Year == year).ToList();
        }

        public List<MediaItem> Search(string query)
        {
            if (string.IsNullOrWhiteSpace(query)) return _library.Items;
            
            return _library.Items.Where(i => 
                i.Title.Contains(query, StringComparison.OrdinalIgnoreCase) || 
                i.GetShortDescription().Contains(query, StringComparison.OrdinalIgnoreCase)
            ).ToList();
        }

        public double CalculateTotalValue()
        {
            return _library.Items.Sum(i => i.GetEstimatedValue());
        }

        public Dictionary<string, int> GetStats()
        {
            return new Dictionary<string, int>
            {
                { "TotalItems", _library.Items.Count },
                { "Books", _library.Items.Count(i => i is Book) },
                { "DVDs", _library.Items.Count(i => i is DVD) },
                { "Albums", _library.Items.Count(i => i is MusicAlbum) }
            };
        }
    }
}
