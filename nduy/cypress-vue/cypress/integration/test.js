describe("My First Test", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "Random Dog Images");
  });

  it("Pressing counter button increments button", () => {
    cy.get("#myCounter").click();
    cy.contains("h2", "Dog count: 2");
  });
});
