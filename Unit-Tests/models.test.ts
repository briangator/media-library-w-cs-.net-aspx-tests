/**
 * Written by Brian McCarthy
 * Unit tests for Media Library Models
 */

import { describe, it, expect } from 'vitest';
import { Book } from '../src/models/Book';
import { MediaLibrary } from '../src/models/MediaLibrary';

describe('MediaItem OOP Logic', () => {
  it('should enforce encapsulation on title', () => {
    const book = new Book("Valid Title", 2000, "Author", 300);
    expect(() => { book.title = ""; }).toThrow("Title cannot be empty");
  });

  it('should demonstrate polymorphic valuation', () => {
    const book = new Book("Book", 2024, "Author", 200); // New book
    const baseValue = 25.0; // Current year is 2026 in metadata, age = 2. 25 - (2*2) = 21.0
    const expected = 21.0 + (200 / 100.0); // 23.0
    expect(book.virtualGetEstimatedValue()).toBeCloseTo(23.0, 1);
  });
});
