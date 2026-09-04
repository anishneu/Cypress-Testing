describe("testsuite-007: Menu and submenu navigation using custom commands", () => {
  before(() => {
    cy.visit("http://localhost:3000");
    cy.get("#username", { timeout: 30000 }).should("be.visible");

    cy.fixture("users").then((users: Array<{ username: string; password: string }>) => {
      const user = users[1];

      cy.get("#username").clear().type(user.username);
      cy.get("#password").clear().type(user.password, { log: false });
      cy.get("#kc-login").should("be.visible").and("be.enabled").click();
    });

    cy.contains("Dashboard", { timeout: 30000 }).should("be.visible");
  });

  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.contains("Dashboard", { timeout: 30000 }).should("be.visible");
  });

  it("Step 1: navigate to Dashboard from the main menu", () => {
    cy.navigateToDashboard();
  });

  it("Step 2: enter the Forms menu and open Formbuilder", () => {
    cy.navigateToFormbuilder();
  });

  it("Step 3: open the Forms menu and navigate to Saved Forms", () => {
    cy.navigateToSavedForms();
  });

  it("Step 4: open the Training menu and confirm it is available", () => {
    cy.navigateToTraining();
    cy.contains(".sidebar-label", "Training").should("be.visible");
  });

  it("Step 5: open the Forms menu and confirm submenu items are visible", () => {
    cy.navigateToForms();

    cy.contains(".sidebar-label", "Formbuilder").should("be.visible");
    cy.contains(".sidebar-label", "Saved Forms").should("be.visible");
  });
});
