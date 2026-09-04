describe("testsuite-008: Document creation and approval workflow", () => {
  const docName = `Doc_${Date.now()}`;
  const docDescription = "Cypress automated draft created for approval workflow";

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

  it("Step 1: create the supporting form template needed for document creation", () => {
    cy.createDocumentFormTemplate("Cypress Doc Workflow Form");
  });

  it("Step 2: open the Documents page and create a draft document", () => {
    cy.openDocumentsPage();
    cy.createDocumentDraft({
      name: docName,
      description: docDescription,
      documentType: "Form",
      formType: "Documents",
    });
  });

  it("Step 3: send the draft document for review", () => {
    cy.openDocumentsPage();
    cy.submitDocumentForReview(docName);
  });

  it("Step 4: approve the pending document from the approval queue", () => {
    cy.approvePendingDocument(docName);
  });
});
