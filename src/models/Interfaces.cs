/**
 * Written by Brian McCarthy
 */
using System;
using System.Collections.Generic;

namespace MediaLibrarySystem.Models
{
    public interface IDisplayable
    {
        string GetDisplayInfo();
    }

    public interface ISearchable
    {
        bool MatchesSearch(string searchTerm);
        List<string> GetSearchableTerms();
        string GetShortDescription();
    }
}
