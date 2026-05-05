/**
 * Written by Brian McCarthy
 */
using System;
using System.Collections.Generic;

namespace MediaLibrarySystem
{
    /// <summary>
    /// Manages a collection of media items.
    /// </summary>
    public class MediaLibrary
    {
        private List<MediaItem> _mediaItems;

        public MediaLibrary()
        {
            _mediaItems = new List<MediaItem>();
        }

        public void AddItem(MediaItem item)
        {
            if (item == null)
                throw new ArgumentNullException(nameof(item));
            _mediaItems.Add(item);
            Console.WriteLine($"Added: {item.GetShortDescription()}");
        }

        public void DisplayAllItems()
        {
            if (_mediaItems.Count == 0)
            {
                Console.WriteLine("No items in the library.");
                return;
            }
            Console.WriteLine("\n=== Media Library Contents ===");
            foreach (MediaItem item in _mediaItems)
            {
                Console.WriteLine(item.GetDisplayInfo());
            }
        }

        public MediaItem? FindByTitle(string title)
        {
            if (string.IsNullOrWhiteSpace(title))
                return null;
            return _mediaItems.Find(item => item.Title.ToLower().Contains(title.ToLower()));
        }

        public List<MediaItem> SearchItems(string searchTerm)
        {
            List<MediaItem> results = new List<MediaItem>();
            foreach (MediaItem item in _mediaItems)
            {
                if (item.MatchesSearch(searchTerm))
                    results.Add(item);
            }
            return results;
        }

        public void GetDetailedReport()
        {
            Console.WriteLine("\n=== Detailed Library Report ===");
            double totalValue = 0;
            foreach (MediaItem item in _mediaItems)
            {
                Console.WriteLine($"{item.GetDisplayInfo()}");
                Console.WriteLine($"  Category: {item.GetCategoryInfo()}");
                Console.WriteLine($"  Estimated Value: ${item.GetEstimatedValue():F2}");
                Console.WriteLine();
                totalValue += item.GetEstimatedValue();
            }
            Console.WriteLine($"Total Library Value: ${totalValue:F2}");
        }
    }
}
