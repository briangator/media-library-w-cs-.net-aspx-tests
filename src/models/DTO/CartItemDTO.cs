using System;

namespace MediaLibrarySystem.Models.DTO
{
    public class CartItemDTO
    {
        public string ItemId { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public double Price { get; set; }
        public int Quantity { get; set; }
    }
}
