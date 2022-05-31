describe("Form test", () => {
  it("Can fill the form", () => {
    cy.visit("/");
    cy.get("form");

    cy.get('input[name="name"]')
      .type("Duy")
      .should("have.value", "Duy");

    cy.get('input[name="email"]')
      .type("ngduy@gmail.com")
      .should("have.value", "ngduy@gmail.com");

    cy.get("textarea")
      .type("What are your hobbies?")
      .should("have.value", "What are your hobbies?");

    cy.get("form").submit();
  });
});