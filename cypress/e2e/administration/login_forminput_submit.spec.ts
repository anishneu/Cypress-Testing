describe( "testsuite-002: Login form inputs and submit successfully", () => {
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

    context("Step 1: Enter the Username", () => {
      it("Step 10a: Enter the username from the users fixture", () => {
        const user = users[userIndex];

        cy.get("#username")
          .should("be.visible")
          .clear()
          .type(user.username);

        cy.get("#username").should(
          "have.value",
          user.username,
        );
      });
    });

    context("Step 2: Enter the Password", () => {
      it("Step 11a: Enter the password from the users fixture", () => {
        const user = users[userIndex];

        cy.get("#password")
          .should("be.visible")
          .clear()
          .type(user.password, { log: false });

        cy.get("#password").should(
          "have.value",
          user.password,
        );
      });
    });

    context("Step 12: Submit the Login form", () => {
      it("Step 12a: Click the Login button", () => {
        cy.get("#kc-login")
          .should("be.visible")
          .should("be.enabled")
          .click();
      });
    });

    context("Step 13: Verify that the Login dashboard is displayed", () => {
      it("Step 13a: Verify that the application URL is displayed", () => {
        cy.url().should("include", "http://localhost:3000");
      });

      it("Step 13b: Verify that the Login dashboard is displayed", () => {
        cy.contains("Dashboard", { timeout: 30000 })
          .should("be.visible");
      });
    });
  });