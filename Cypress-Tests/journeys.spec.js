/**
 * Written by Brian McCarthy
 * Full Cypress JavaScript Framework 
 */

describe('Media Library Pro - User Journeys', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Test 01: Verifies the application loads with correct branding', () => {
    cy.get('h1').should('contain', 'C# MediaLibrary Pro');
  });

  it('Test 02: Performs a title search', () => {
    cy.get('input[placeholder*="Search"]').type('Python');
    cy.get('.group').should('have.length.at.least', 2);
  });

  it('Test 03: Adds a book to the shopping cart', () => {
    cy.contains('Add to Cart').first().click();
    cy.contains('Cart: 1 items').should('be.visible');
  });

  it('Test 04: Navigates to the terminal and verifies logs', () => {
    cy.contains('Terminal').click();
    cy.get('.font-mono').should('contain', 'Initialized');
  });

  it('Test 05: Generates a detailed report in the terminal', () => {
    cy.contains('Terminal').click();
    cy.contains('Generate Report').click();
    cy.get('.font-mono').should('contain', 'Detailed Library Report');
  });

  it('Test 06: Validates Top 5 lists are populated', () => {
    cy.get('.grid').first().within(() => {
      cy.get('h3').should('contain', 'TOP');
    });
  });

  it('Test 07: Checks review score constraints', () => {
    cy.get('.text-amber-500').each(($el) => {
      const score = parseFloat($el.text());
      expect(score).to.be.at.most(5);
    });
  });

  it('Test 08: Verifies category filtering (visual)', () => {
    cy.contains('Film').should('exist');
  });

  it('Test 09: Tests the checkout flow', () => {
    cy.contains('Add to Cart').click();
    cy.contains('Checkout Now').click();
    cy.contains('Cart: 0 items').should('not.exist');
  });

  it('Test 10: Validates thumbnails are loading', () => {
    cy.get('img').should('be.visible').and(($img) => {
      expect($img[0].naturalWidth).to.be.greaterThan(0);
    });
  });

  it('Test 11: Checks responsive layout on iPad', () => {
    cy.viewport('ipad-2');
    cy.get('header').should('be.visible');
  });

  it('Test 12: Verifies book-specific metadata (page count)', () => {
    cy.contains('pgs').should('be.visible');
  });

  it('Test 13: Verifies search clear functionality', () => {
    cy.get('input').type('Test').clear();
    cy.get('.group').should('have.length.at.least', 10);
  });

  it('Test 14: Dark mode compliance check', () => {
    cy.get('body').should('have.class', 'bg-neutral-950');
  });

  it('Test 15: Session reset validation', () => {
    cy.reload();
    cy.get('h1').should('exist');
  });
});
