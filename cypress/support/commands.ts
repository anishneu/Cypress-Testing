
// Navigate to Dashboard
Cypress.Commands.add("navigateToDashboard", () => {
  cy.contains(".sidebar-label", "Dashboard")
    .should("be.visible")
    .click();

  cy.get(".page-title")
    .should("be.visible")
    .and("have.text", "Dashboard");
});

// Navigate to Parts
Cypress.Commands.add("navigateToParts", () => {
  cy.contains(".sidebar-label", "Parts")
    .should("be.visible")
    .click();

  cy.get(".page-title")
    .should("be.visible")
    .and("have.text", "Parts");
});

// Navigate to Documents
Cypress.Commands.add("navigateToDocuments", () => {
  cy.contains(".sidebar-label", "Documents")
    .should("be.visible")
    .click();

  cy.get(".page-title")
    .should("be.visible")
    .and("have.text", "Documents");
});

// Open Forms menu
Cypress.Commands.add("navigateToForms", () => {
  cy.contains(".sidebar-label", "Forms")
    .should("be.visible")
    .click();
});

// Navigate to Formbuilder
Cypress.Commands.add("navigateToFormbuilder", () => {
  cy.contains(".sidebar-label", "Forms")
    .should("be.visible")
    .click();

  cy.contains(".sidebar-label", "Formbuilder")
    .should("be.visible")
    .click();

  cy.get(".page-title")
    .should("be.visible")
    .and("have.text", "Formbuilder");
});

// Navigate to Saved Forms
Cypress.Commands.add("navigateToSavedForms", () => {
  cy.contains(".sidebar-label", "Forms")
    .should("be.visible")
    .click();

  cy.contains(".sidebar-label", "Saved Forms")
    .should("be.visible")
    .click();

  cy.get(".page-title")
    .should("be.visible")
    .and("have.text", "Saved Forms");
});

// Open Training menu and verify it is available/expanded
Cypress.Commands.add("navigateToTraining", () => {
  cy.contains(".sidebar-label", "Training")
    .should("be.visible")
    .click({ force: true });

  cy.contains(".sidebar-label", "Training")
    .should("be.visible");
});

// Navigate to Approvals
Cypress.Commands.add("navigateToApprovals", () => {
  cy.contains(".sidebar-label", "Approvals")
    .should("be.visible")
    .click();

  cy.get(".page-title")
    .should("be.visible")
    .and("have.text", "Approvals");
});

// Navigate to Users
Cypress.Commands.add("navigateToUsers", () => {
  cy.contains(".sidebar-label", "Users")
    .should("be.visible")
    .click();

  cy.get(".page-title")
    .should("be.visible")
    .and("have.text", "Users");
});

declare global {
  namespace Cypress {
    interface Chainable {
      navigateToDashboard(): Chainable<void>;
      navigateToParts(): Chainable<void>;
      navigateToDocuments(): Chainable<void>;
      navigateToForms(): Chainable<void>;
      navigateToFormbuilder(): Chainable<void>;
      navigateToSavedForms(): Chainable<void>;
      navigateToTraining(): Chainable<void>;
      navigateToApprovals(): Chainable<void>;
      navigateToUsers(): Chainable<void>;
    }
  }
}

export {};



