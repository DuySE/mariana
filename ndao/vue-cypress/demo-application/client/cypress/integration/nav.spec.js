/// <reference types="cypress" />

describe('Navigation to List events', () => {
  beforeEach(() => {
    cy.get('[data-cy=list-events-link').as("list-events-link");
  });

  it('should have a list events link that navigates to the list events view', () => {
    // navigate to the homepage
    cy.visit('/');
    // check that the "List Events" link is there
    expect(cy.get('@list-events-link')).to.exist;
    // click on the "List Events" link
    cy.get('@list-events-link').click();
    // verify a user has been redirected to the "List Events" page
    expect(cy.get('h2').contains('Event List')).to.exist;
    cy.location('pathname').should('equal','/list-events')
  });
});

describe('Navigation to Create event', () => {
  beforeEach(() => {
    cy.get('[data-cy=create-event-link').as("create-event-link");
  });

  it('should have a list events link that navigates to the list events view', () => {
    // navigate to the homepage
    cy.visit('/');
    // check that the "Create Event" link is there
    expect(cy.get('@create-event-link')).to.exist;
    // click on the "Create Events" link
    cy.get('@create-event-link').click();
    // verify a user has been redirected to the "Create Event" page
    expect(cy.get('h2').contains('Create Event')).to.exist;
    cy.location('pathname').should('equal','/create-event')
  });
});