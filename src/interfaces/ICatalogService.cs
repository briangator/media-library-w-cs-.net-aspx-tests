using System;
using System.Collections.Generic;
using MediaLibrarySystem.Models;

namespace MediaLibrarySystem.Interfaces
{
    public interface ICatalogService
    {
        IEnumerable<MediaItem> GetAllItems();
        MediaItem GetById(string id);
        void AddItem(MediaItem item);
    }
}
