using System;
using System.Collections.Generic;

namespace MediaLibrarySystem.Models.DTO
{
    public class OrderDTO
    {
        public string OrderId { get; set; } = Guid.NewGuid().ToString();
        public List<CartItemDTO> Items { get; set; } = new List<CartItemDTO>();
        public double TotalAmount { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    }
}
