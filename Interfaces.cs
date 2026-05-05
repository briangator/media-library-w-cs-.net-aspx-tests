/**
 * Written by Brian McCarthy
 * MediaLibrarySystem provides a framework for managing a digital media library.
 */
using System;
using System.Collections.Generic;

namespace MediaLibrarySystem
{
    /// <summary>
    /// Defines a method for displaying information about a media item.
    /// </summary>
    public interface IDisplayable
    {
        string GetDisplayInfo();
    }

    /// <summary>
    /// Provides methods for searching and describing media items.
    /// </summary>
    public interface ISearchable
    {
        bool MatchesSearch(string searchTerm);
        List<string> GetSearchableTerms();
        string GetShortDescription();
    }
}
