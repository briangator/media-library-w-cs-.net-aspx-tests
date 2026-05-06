/**
 * Written by Brian McCarthy
 * SPDX-License-Identifier: Apache-2.0
 */

export interface IDisplayable {
  getDisplayInfo(): string;
  getShortDescription(): string;
}

export interface ISearchable {
  matchesSearch(searchTerm: string): boolean;
  getSearchableTerms(): string[];
}
