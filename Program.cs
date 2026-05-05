/**
 * Written by Brian McCarthy
 */
using System;

namespace MediaLibrarySystem
{
    class Program
    {
        /// <summary>
        /// Entry point for the MediaLibrarySystem application.
        /// </summary>
        static void Main(string[] args)
        {
            Console.WriteLine("Welcome to the Media Library Management System!");
            Console.WriteLine("=============================================");

            try
            {
                MediaLibrary library = new MediaLibrary();

                // Seed items
                library.AddItem(new Book("The Great Gatsby", 1925, "F. Scott Fitzgerald", 180));
                library.AddItem(new DVD("The Matrix", 1999, "The Wachowskis", 136));
                library.AddItem(new MusicAlbum("Abbey Road", 1969, "The Beatles", 17));

                library.DisplayAllItems();

                Console.WriteLine("\n=== Search Demo ===");
                var searchResults = library.SearchItems("Matrix");
                Console.WriteLine($"Search results for 'Matrix':");
                foreach (var item in searchResults)
                {
                    Console.WriteLine($"  - {item.GetDisplayInfo()}");
                }

                library.GetDetailedReport();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }

            Console.WriteLine("\nThank you for using the Media Library System!");
            Console.ReadLine();
        }
    }
}
