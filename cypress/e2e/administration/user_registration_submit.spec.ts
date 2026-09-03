describe(
  "testsuite-004: User Registration Submit", () => {
    let randomUser: {
      username: string;
      password: string;
      email: string;
      firstName: string;
      lastName: string;
    };

    before(() => {
      // Generate random registration data
      const uniqueId = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

      randomUser = {
        username: `testuser${uniqueId}`,
        password: `Test@${uniqueId}`,
        email: `cyberzerox27+${uniqueId}@gmail.com`,
        firstName: `Test${uniqueId}`,
        lastName: `User${uniqueId}`,
      };

      // Step 1: Launch the application
      cy.visit("http://localhost:3000");

      // Wait for the Keycloak Login page
      cy.get("#username", { timeout: 30000 })
        .should("be.visible");
    });

    context("Step 1: Verify that the Login page is displayed", () => {
      it("Step 1a: Verify that the Username field is displayed", () => {
        cy.get("#username")
          .should("be.visible");
      });

      it("Step 1b: Verify that the Password field is displayed", () => {
        cy.get("#password")
          .should("be.visible");
      });

      it("Step 1c: Verify that the Register link is displayed", () => {
        cy.get("#kc-registration a")
          .should("be.visible")
          .and("contain.text", "Register");
      });
    });

    context("Step 2: Launch the User Registration page", () => {
      it("Step 2a: Click the Register link", () => {
        cy.get("#kc-registration a")
          .should("be.visible")
          .and("contain.text", "Register")
          .click();
      });

      it("Step 2b: Verify that the User Registration page is displayed", () => {
        cy.url().should(
          "include",
          "/realms/amsrealm/login-actions/registration",
        );

        cy.get("#kc-page-title")
          .should("be.visible")
          .and("contain.text", "Register");
      });

      it("Step 2c: Verify that the Registration form is displayed", () => {
        cy.get("#kc-register-form")
          .should("be.visible");
      });
    });

    context("Step 3: Enter the Username", () => {
      it("Step 3a: Enter a random username", () => {
        cy.get("#username")
          .should("be.visible")
          .clear()
          .type(randomUser.username);

        cy.get("#username")
          .should("have.value", randomUser.username);
      });
    });

    context("Step 4: Enter the Password", () => {
      it("Step 4a: Enter a random password", () => {
        cy.get("#password")
          .should("be.visible")
          .clear()
          .type(randomUser.password, { log: false });

        cy.get("#password")
          .should("have.value", randomUser.password);
      });
    });

    context("Step 5: Enter the Confirm Password", () => {
      it("Step 5a: Enter the password confirmation", () => {
        cy.get("#password-confirm")
          .should("be.visible")
          .clear()
          .type(randomUser.password, { log: false });

        cy.get("#password-confirm")
          .should("have.value", randomUser.password);
      });
    });

    context("Step 6: Enter the Email", () => {
      it("Step 6a: Enter a random email address", () => {
        cy.get("#email")
          .should("be.visible")
          .clear()
          .type(randomUser.email);

        cy.get("#email")
          .should("have.value", randomUser.email);
      });
    });

    context("Step 7: Enter the First Name", () => {
      it("Step 7a: Enter a random first name", () => {
        cy.get("#firstName")
          .should("be.visible")
          .clear()
          .type(randomUser.firstName);

        cy.get("#firstName")
          .should("have.value", randomUser.firstName);
      });
    });

    context("Step 8: Enter the Last Name", () => {
      it("Step 8a: Enter a random last name", () => {
        cy.get("#lastName")
          .should("be.visible")
          .clear()
          .type(randomUser.lastName);

        cy.get("#lastName")
          .should("have.value", randomUser.lastName);
      });
    });

    context("Step 9: Verify the Registration form values", () => {
      it("Step 9a: Verify the Username value", () => {
        cy.get("#username")
          .should("have.value", randomUser.username);
      });

      it("Step 9b: Verify the Email value", () => {
        cy.get("#email")
          .should("have.value", randomUser.email);
      });

      it("Step 9c: Verify the First Name value", () => {
        cy.get("#firstName")
          .should("have.value", randomUser.firstName);
      });

      it("Step 9d: Verify the Last Name value", () => {
        cy.get("#lastName")
          .should("have.value", randomUser.lastName);
      });

      it("Step 9e: Verify that the Password confirmation matches the Password", () => {
        cy.get("#password-confirm")
          .should("have.value", randomUser.password);
      });
    });

    context("Step 10: Submit the User Registration form", () => {
      it("Step 10a: Click the Register button", () => {
        cy.get('#kc-form-buttons input[type="submit"]')
          .should("be.visible")
          .should("be.enabled")
          .and("have.value", "Register")
          .click();
      });
    });

    context("Step 11: Verify the User Registration result", () => {
      it("Step 11a: Verify that the registration request has been submitted", () => {
        cy.url({ timeout: 30000 })
          .should("not.include", "/login-actions/registration");
      });

      it("Step 11b: Verify that the registration result page is displayed", () => {
        cy.get("body", { timeout: 30000 })
          .should("be.visible");
      });
    });
  },
);