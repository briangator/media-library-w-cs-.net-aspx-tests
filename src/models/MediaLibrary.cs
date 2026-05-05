/**
 * Written by Brian McCarthy
 */
using System;
using System.Collections.Generic;
using System.Linq;

namespace MediaLibrarySystem.Models
{
    public class MediaLibrary
    {
        private List<MediaItem> _items = new List<MediaItem>();
        public List<MediaItem> Items => _items;

        public void AddItem(MediaItem item)
        {
            if (item == null) throw new ArgumentNullException(nameof(item));
            _items.Add(item);
        }

        public List<string> GetDetailedReport()
        {
            var report = new List<string>();
            report.Add("=== Detailed Library Report ===");
            double totalValue = 0;
            foreach (var item in _items)
            {
                report.Add($"{item.GetDisplayInfo()} | Value: ${item.GetEstimatedValue():F2}");
                totalValue += item.GetEstimatedValue();
            }
            report.Add($"Total Library Value: ${totalValue:F2}");
            return report;
        }
    }
}
