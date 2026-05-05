/**
 * Written by Brian McCarthy
 * C# Representation of the React Dashboard Logic
 */
using System;
using System.Collections.Generic;
using MediaLibrarySystem.Models;

namespace MediaLibrarySystem.Frontend
{
    /// <summary>
    /// Represents the main application logic for the Media Library Dashboard.
    /// </summary>
    public class AppController
    {
        private MediaLibrary _library;
        private List<MediaItem> _cart;
        private string _searchTerm = "";

        public AppController()
        {
            _library = new MediaLibrary();
            _cart = new List<MediaItem>();
        }

        /// <summary>
        /// Handles the Add to Cart polymorphic action.
        /// </summary>
        public void AddToCart(MediaItem item)
        {
            _cart.Add(item);
            Console.WriteLine($"Polymorphic Purchase: {item.Title} added to secure session.");
        }

        /// <summary>
        /// Logic for calculating unique Top 5 rankings.
        /// </summary>
        public List<MediaItem> GetTopRated(string category)
        {
            return _library.Items
                .Where(i => i.GetCategoryInfo().Contains(category))
                .OrderByDescending(i => i.ReviewScore)
                .GroupBy(i => i.Title)
                .Select(g => g.First())
                .Take(5)
                .ToList();
        }
    }
}
