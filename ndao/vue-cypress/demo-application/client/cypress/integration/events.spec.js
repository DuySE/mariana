/// <reference types="cypress" />

describe("Event", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:8081/event", {
      fixture: "list-events.json",
    }).as("get-list-events");
  });

  it("should list all events", () => {
    cy.visit("/");
    cy.wait("@get-list-events", { timeout: 10000 });
  });
});
