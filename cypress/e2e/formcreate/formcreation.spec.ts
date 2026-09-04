describe("testsuite-005: Login and Form Creation", () => {
  let users: {
    username: string;
    password: string;
  }[];

  const userIndex = 1;

  before(() => {
    cy.fixture("users").then((data) => {
      users = data;
    });

    cy.visit("http://localhost:3000");
    cy.wait(2000);
  });

  // ============================================================
  // STEP 1 - ENTER USERNAME
  // ============================================================

  context("Step 1: Enter the Username", () => {
    it("Step 1a: Enter the username from the users fixture", () => {
      const user = users[userIndex];

      cy.get("#username")
        .should("be.visible")
        .clear()
        .type(user.username);

      cy.get("#username").should(
        "have.value",
        user.username
      );
    });
  });

  // ============================================================
  // STEP 2 - ENTER PASSWORD
  // ============================================================

  context("Step 2: Enter the Password", () => {
    it("Step 2a: Enter the password from the users fixture", () => {
      const user = users[userIndex];

      cy.get("#password")
        .should("be.visible")
        .clear()
        .type(user.password, { log: false });

      cy.get("#password").should(
        "have.value",
        user.password
      );
    });
  });

  // ============================================================
  // STEP 3 - SUBMIT LOGIN
  // ============================================================

  context("Step 3: Submit the Login form", () => {
    it("Step 3a: Click the Login button", () => {
      cy.get("#kc-login")
        .should("be.visible")
        .should("be.enabled")
        .click();
    });
  });

  // ============================================================
  // STEP 4 - VERIFY DASHBOARD
  // ============================================================

  context("Step 4: Verify that the Login dashboard is displayed", () => {

    it("Step 4a: Verify that the application URL is displayed", () => {
      cy.url().should("include", "http://localhost:3000");
    });

    it("Step 4b: Verify that the Login dashboard is displayed", () => {
      cy.contains("Dashboard", { timeout: 30000 })
        .should("be.visible");
    });

  });

  // ============================================================
  // STEP 5 - NAVIGATE TO FORM BUILDER
  // ============================================================

  context("Step 5: Form Creation", () => {

    it("Step 5a: Navigate to the Forms menu", () => {
      cy.contains(".sidebar-label", "Forms")
        .should("be.visible")
        .click();
    });

    it("Step 5b: Verify that the Forms submenu is displayed", () => {
      cy.contains(".sidebar-label", "Formbuilder")
        .should("be.visible");

      cy.contains(".sidebar-label", "Saved Forms")
        .should("be.visible");
    });

    it("Step 5c: Navigate to Formbuilder", () => {
      cy.contains(".sidebar-label", "Formbuilder")
        .should("be.visible")
        .click();
    });

    it("Step 5d: Verify that the Formbuilder page is displayed", () => {

      cy.get(".page-title")
        .should("be.visible")
        .and("have.text", "Formbuilder");

      cy.get(".page-subtitle")
        .should("be.visible")
        .and(
          "have.text",
          "Drag and drop fields to build form templates."
        );
    });

  });

  // ============================================================
  // STEP 6 - VERIFY FORM BUILDER COMPONENTS
  // ============================================================

  context("Step 6: Verify Formbuilder components", () => {

    it("Step 6a: Verify Field Library", () => {
      cy.get(".forms-workspace-library")
        .should("be.visible");

      cy.contains(".forms-panel-title", "Field library")
        .should("be.visible");
    });

    it("Step 6b: Verify Field Library search", () => {
      cy.get('input[aria-label="Search fields"]')
        .should("be.visible")
        .and("have.attr", "placeholder", "Search fields");
    });

    it("Step 6c: Verify available field types", () => {
      const fields = [
        "Text",
        "Text Area",
        "Number",
        "Dropdown",
        "Date",
        "Email",
        "Checkbox",
        "Radio",
        "File Upload",
        "Hyperlink",
      ];

      fields.forEach((field) => {
        cy.contains(".forms-library-item", field)
          .scrollIntoView()
          .should("exist")
          .and("contain.text", field);
      });
    });


    it("Step 6d: Verify Form name field", () => {
      cy.get('input[aria-label="Form name"]')
        .should("be.visible")
        .and("have.attr", "placeholder", "Form name");
    });

    it("Step 6e: Verify form category dropdown", () => {
      cy.get("select.forms-toolbar-select")
        .should("be.visible");

      cy.get("select.forms-toolbar-select option")
        .should("contain.text", "Documents");

      cy.get("select.forms-toolbar-select option")
        .should("contain.text", "Training");
    });

    it("Step 6f: Verify Revision field", () => {
      cy.get('input[aria-label="Revision"]')
        .should("be.visible")
        .and("have.attr", "placeholder", "Revision");
    });

    it("Step 6g: Verify Save button", () => {
      cy.contains(
        ".forms-canvas-chrome-meta-actions button",
        "Save"
      )
        .should("be.visible")
        .and("be.enabled");
    });

    it("Step 6h: Verify Preview button", () => {
      cy.contains(
        ".forms-canvas-chrome-meta-actions button",
        "Preview"
      )
        .should("be.visible")
        .and("be.enabled");
    });

    it("Step 6i: Verify empty canvas", () => {
      cy.get(".forms-field-count")
        .should("be.visible")
        .and("have.text", "0 fields");

      cy.get(".forms-canvas-empty")
        .should("be.visible")
        .and(
          "have.text",
          "Drag fields from the library to start building."
        );
    });

    it("Step 6j: Verify Properties panel", () => {
      cy.get(".forms-workspace-properties")
        .should("be.visible");

      cy.contains(".forms-panel-title", "Properties")
        .should("be.visible");

      cy.contains(
        ".forms-properties-empty",
        "Select a field on the canvas to edit its properties."
      )
        .should("be.visible");
    });

  });

  // ============================================================
  // STEP 7 - ENTER FORM DETAILS
  // ============================================================

  context("Step 7: Enter Form Details", () => {

    it("Step 7a: Enter Form Name", () => {
      cy.get('input[aria-label="Form name"]')
        .should("be.visible")
        .clear()
        .type("Cypress Test Form");

      cy.get('input[aria-label="Form name"]')
        .should("have.value", "Cypress Test Form");
    });

    it("Step 7b: Select Form Category", () => {
      cy.get("select.forms-toolbar-select")
        .should("be.visible")
        .select("Documents");

      cy.get("select.forms-toolbar-select")
        .should("have.value", "Documents");
    });

    it("Step 7c: Enter Revision", () => {
      cy.get('input[aria-label="Revision"]')
        .should("be.visible")
        .clear()
        .type("1");

      cy.get('input[aria-label="Revision"]')
        .should("have.value", "1");
    });

  });

  // ============================================================
  // STEP 8 - ADD TEXT FIELD
  // ============================================================

  context("Step 8: Add Text Field", () => {

    it("Step 8a: Select Text field from Field Library", () => {

      // Need to perform actual drag-drop
      cy.contains(
        ".forms-library-item",
        "Text"
      )
        .should("be.visible")
        .click();
    });

    it("Step 8b: Verify Text field is added to the canvas", () => {

      cy.get(".forms-field-count", { timeout: 20000 })
        .should("contain.text", "fields");

    });

  });

  // ============================================================
  // STEP 9 - ADD TEXT AREA FIELD
  // ============================================================

  context("Step 9: Add Text Area field", () => {

    it("Step 9a: Select Text Area from Field Library", () => {

      cy.contains(
        ".forms-library-item",
        "Text Area"
      )
        .should("be.visible")
        .click();
    });

    it("Step 9b: Verify Text Area field is added", () => {

      cy.get(".forms-field-count")
        .should("contain.text", "fields");

    });

  });

  // ============================================================
  // STEP 10 - ADD NUMBER FIELD
  // ============================================================

  context("Step 10: Add Number field", () => {

    it("Step 10a: Select Number from Field Library", () => {

      cy.contains(
        ".forms-library-item",
        "Number"
      )
        .should("be.visible")
        .click();
    });

    it("Step 10b: Verify Number field is added", () => {

      cy.get(".forms-field-count")
        .should("contain.text", "fields");

    });

  });

  // ============================================================
  // STEP 11 - ADD DROPDOWN FIELD
  // ============================================================

  context("Step 11: Add Dropdown field", () => {

    it("Step 11a: Select Dropdown from Field Library", () => {

      cy.contains(
        ".forms-library-item",
        "Dropdown"
      )
        .should("be.visible")
        .click();
    });

    it("Step 11b: Verify Dropdown field is added", () => {

      cy.get(".forms-field-count")
        .should("contain.text", "fields");

    });

  });

  // ============================================================
  // STEP 12 - ADD DATE FIELD
  // ============================================================

  context("Step 12: Add Date field", () => {

    it("Step 12a: Select Date from Field Library", () => {

      cy.contains(
        ".forms-library-item",
        "Date"
      )
        .should("be.visible")
        .click();
    });

    it("Step 12b: Verify Date field is added", () => {

      cy.get(".forms-field-count")
        .should("contain.text", "fields");

    });

  });

  // ============================================================
  // STEP 13 - ADD EMAIL FIELD
  // ============================================================

  context("Step 13: Add Email field", () => {

    it("Step 13a: Select Email from Field Library", () => {

      cy.contains(
        ".forms-library-item",
        "Email"
      )
        .should("be.visible")
        .click();
    });

    it("Step 13b: Verify Email field is added", () => {

      cy.get(".forms-field-count")
        .should("contain.text", "fields");

    });

  });

  // ============================================================
  // STEP 14 - ADD CHECKBOX FIELD
  // ============================================================

  context("Step 14: Add Checkbox field", () => {

    it("Step 14a: Select Checkbox from Field Library", () => {

      cy.contains(
        ".forms-library-item",
        "Checkbox"
      )
        .should("be.visible")
        .click();
    });

    it("Step 14b: Verify Checkbox field is added", () => {

      cy.get(".forms-field-count")
        .should("contain.text", "fields");

    });

  });

  // ============================================================
  // STEP 15 - SAVE FORM
  // ============================================================

  context("Step 15: Save Form", () => {

    it("Step 15a: Verify Form details before saving", () => {

      cy.get('input[aria-label="Form name"]')
        .should("have.value", "Cypress Test Form");

      cy.get("select.forms-toolbar-select")
        .should("have.value", "Documents");

      cy.get('input[aria-label="Revision"]')
        .should("have.value", "1");
    });

    it("Step 15b: Click Save button", () => {

      cy.contains(
        ".forms-canvas-chrome-meta-actions button",
        "Save"
      )
        .should("be.visible")
        .and("be.enabled")
        .click();
    });

    it("Step 15c: Verify form was saved", () => {

      cy.contains("Form saved successfully", { timeout: 20000 })
        .should("be.visible");

      cy.contains("Success", { timeout: 20000 })
        .should("be.visible");

    });

  });

});