
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

// Close any success modal that may cover the navigation area
Cypress.Commands.add("closeSuccessModal", () => {
  cy.get("body").then(($body) => {
    if ($body.find(".modal-overlay, [role='dialog']").length) {
      cy.contains("button", "OK", { matchCase: false }).click({ force: true });
      cy.get(".modal-overlay", { timeout: 10000 }).should("not.exist");
    }
  });
});

// Navigate to Documents
Cypress.Commands.add("navigateToDocuments", () => {
  cy.contains(".sidebar-label", "Documents")
    .should("be.visible")
    .click({ force: true });

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
    .click({ force: true });

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

// Create a form template needed for document creation
Cypress.Commands.add("createDocumentFormTemplate", (formName = "Document Workflow Form") => {
  cy.navigateToFormbuilder();

  cy.get('input[aria-label="Form name"]')
    .should("be.visible")
    .clear()
    .type(formName);

  cy.get("select.forms-toolbar-select")
    .should("be.visible")
    .select("Documents");

  cy.contains(".forms-library-item", "Text")
    .should("be.visible")
    .click();

  cy.contains(".forms-canvas-chrome-meta-actions button", "Save")
    .should("be.visible")
    .and("be.enabled")
    .click();

  cy.contains("Success", { timeout: 20000 }).should("be.visible");
  cy.contains("Form saved successfully", { timeout: 20000 }).should("be.visible");
  cy.closeSuccessModal();
});

// Open the Documents screen
Cypress.Commands.add("openDocumentsPage", () => {
  cy.navigateToDocuments();
  cy.get("h2")
    .should("be.visible")
    .and("contain.text", "Documents");
});

// Create a Document in Draft status
Cypress.Commands.add("createDocumentDraft", (payload: {
  name: string;
  description?: string;
  documentType?: string;
  formType?: string;
} = { name: "Cypress Draft Document" }) => {
  const name = payload.name ?? "Cypress Draft Document";
  const description = payload.description ?? "Draft created by Cypress";
  const documentType = payload.documentType ?? "Form";
  const formType = payload.formType ?? "Documents";

  cy.contains("button", "Create").should("be.visible").click();

  cy.contains("label", "Document Name", { matchCase: false })
    .parents("label")
    .first()
    .then(($label) => {
      const scoped = $label.parent();
      scoped.find("input, textarea").first().clear().type(name);
    });

  cy.contains("label", "Description", { matchCase: false })
    .parents("label")
    .first()
    .then(($label) => {
      const scoped = $label.parent();
      scoped.find("input, textarea").first().clear().type(description);
    });

  cy.contains("label", "Document Type", { matchCase: false })
    .parents("label")
    .first()
    .then(($label) => {
      const scoped = $label.parent();
      scoped.find("select").first().select(documentType);
    });

  cy.contains("label", "Form Type", { matchCase: false })
    .parents("label")
    .first()
    .then(($label) => {
      const scoped = $label.parent();
      scoped.find("select").first().select(formType);
    });

  cy.contains("button", "Save")
    .should("be.visible")
    .and("be.enabled")
    .click();

  cy.contains("Draft", { timeout: 20000 }).should("be.visible");
  cy.contains(name, { timeout: 20000 }).should("be.visible");
  cy.closeSuccessModal();
});

// Submit a document for review from the document list
Cypress.Commands.add("submitDocumentForReview", (documentName: string) => {
  cy.contains("button", documentName, { matchCase: false }).should("be.visible").click();
  cy.contains("button", "Send to review").should("be.visible").and("be.enabled").click();
  cy.contains("Success", { timeout: 20000 }).should("be.visible");
  cy.contains("Submitted", { timeout: 20000 }).should("be.visible");
  cy.closeSuccessModal();
});

// Open the approvals list and approve a pending document
Cypress.Commands.add("approvePendingDocument", (documentName: string) => {
  cy.navigateToApprovals();
  cy.contains(documentName, { timeout: 20000 }).should("be.visible");
  cy.contains("button", "Approve").should("be.visible").and("be.enabled").click();
  cy.contains("Approved", { timeout: 20000 }).should("be.visible");
  cy.closeSuccessModal();
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
      createDocumentFormTemplate(formName?: string): Chainable<void>;
      openDocumentsPage(): Chainable<void>;
      createDocumentDraft(payload?: {
        name?: string;
        description?: string;
        documentType?: string;
        formType?: string;
      }): Chainable<void>;
      submitDocumentForReview(documentName: string): Chainable<void>;
      approvePendingDocument(documentName: string): Chainable<void>;
      closeSuccessModal(): Chainable<void>;
    }
  }
}

export {};



