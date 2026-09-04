describe("testsuite-006: Form validation checks", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get("#username", { timeout: 30000 }).should("be.visible");

    cy.get("#kc-registration a")
      .should("be.visible")
      .and("contain.text", "Register")
      .click();

    cy.url().should("include", "/login-actions/registration");
    cy.get("#kc-register-form").should("be.visible");
  });

  it("Step 1: verifies that all required registration fields are visible", () => {
    const requiredFields = [
      { selector: "#username", label: "Username" },
      { selector: "#password", label: "Password" },
      { selector: "#password-confirm", label: "Confirm password" },
      { selector: "#email", label: "Email" },
      { selector: "#firstName", label: "First name" },
      { selector: "#lastName", label: "Last name" },
    ];

    requiredFields.forEach(({ selector, label }) => {
      cy.get(selector).should("be.visible").and("have.attr", "type");
      cy.contains("label", label).should("be.visible");
    });

    cy.contains("* Required fields").should("be.visible");
    cy.get('#kc-form-buttons input[type="submit"]')
      .should("be.visible")
      .and("have.value", "Register");
  });

  it("Step 2: accepts typed user input and keeps the values in the form", () => {
    const uniqueId = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const username = `testuser${uniqueId}`;
    const password = `Test@${uniqueId}`;
    const email = `cypress.${uniqueId}@example.com`;

    cy.get("#username").clear().type(username);
    cy.get("#password").clear().type(password, { log: false });
    cy.get("#password-confirm").clear().type(password, { log: false });
    cy.get("#email").clear().type(email);
    cy.get("#firstName").clear().type("Cypress");
    cy.get("#lastName").clear().type("Tester");

    cy.get("#username").should("have.value", username);
    cy.get("#password").should("have.value", password);
    cy.get("#password-confirm").should("have.value", password);
    cy.get("#email").should("have.value", email);
    cy.get("#firstName").should("have.value", "Cypress");
    cy.get("#lastName").should("have.value", "Tester");
  });

  it("Step 3: enables the Register button when the form has valid values", () => {
    const uniqueId = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

    cy.get("#username").clear().type(`testuser${uniqueId}`);
    cy.get("#password").clear().type(`Test@${uniqueId}`, { log: false });
    cy.get("#password-confirm").clear().type(`Test@${uniqueId}`, { log: false });
    cy.get("#email").clear().type(`valid.${uniqueId}@example.com`);
    cy.get("#firstName").clear().type("Cypress");
    cy.get("#lastName").clear().type("Tester");

    cy.get('#kc-form-buttons input[type="submit"]')
      .should("be.visible")
      .and("be.enabled")
      .and("have.value", "Register");
  });
});
