/// <reference types="cypress" />

describe('Create Event', () => {
  beforeEach(() => {
    // navigate to the home page
    cy.visit('/');
    cy.get('[data-cy=create-event-link').as("create-event-link");
    // go to the "Create Event" page
    cy.get('@create-event-link').click();

    cy.get('#event-name').as('name');
    cy.get('#event-venue').as('venue');
    cy.get('#event-date-month').as('date-month');
    cy.get('#event-date-day').as('date-day');
    cy.get('#event-date-year').as('date-year');
    cy.get('#ticket-quantity').as('quantity');
    cy.get('textarea[name="event-notes"]').as('notes');
    cy.get('input[name="event-image"]').as('image');
  });

  it('should create a new event', () => {
    cy.location('pathname').should('equal','/create-event')
    // fill-in the form
    cy.get('@name').type('ndao');
    cy.get('@venue').type('ndao');
    cy.get('@date-month').select('11');
    cy.get('@date-day').select('20');
    cy.get('@date-year').select('2021');
    cy.get('@quantity').type('10');
    cy.get('@notes').type('Don\'t miss out!');
    cy.get('@image').check('./assets/event-2.jpg');
    // submit the form
    cy.get('button').contains('Create').click();
    // assert that a new event has been created
    cy.get('h2').should('have.text', 'Event Details');
  });
});