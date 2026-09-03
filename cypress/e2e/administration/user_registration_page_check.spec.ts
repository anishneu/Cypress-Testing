describe(
  "testsuite-003: User Registration", () => {
    before(() => {
      // Launch the application
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

    context("Step 2: Click the User Registration link", () => {
      it("Step 2a: Click the User Registration link", () => {
        cy.get("#kc-registration a")
          .should("be.visible")
          .and("contain.text", "Register")
          .click();
      });
    });

    context("Step 3: Verify that the User Registration page is displayed", () => {
      it("Step 3a: Verify the User Registration page URL", () => {
        cy.url().should(
          "include",
          "/realms/amsrealm/login-actions/registration",
        );
      });

      it("Step 3b: Verify that the User Registration page title is displayed", () => {
        cy.get("#kc-page-title")
          .should("be.visible")
          .and("contain.text", "Register");
      });

      it("Step 3c: Verify that the Registration form is displayed", () => {
        cy.get("#kc-register-form")
          .should("be.visible");
      });
    });

    context("Step 4: Verify the Required fields message", () => {
      it("Step 4a: Verify that the Required fields message is displayed", () => {
        cy.get(".pf-v5-c-helper-text__item-text")
          .contains("Required fields")
          .should("be.visible");
      });

      it("Step 4b: Verify that the Required fields indicator is displayed", () => {
        cy.get(".pf-v5-c-form__label-required")
          .first()
          .should("be.visible")
          .and("contain.text", "*");
      });
    });

    context("Step 5: Verify the Username field", () => {
      it("Step 5a: Verify that the Username label is displayed", () => {
        cy.get('label[for="username"]')
          .should("be.visible")
          .and("contain.text", "Username");
      });

      it("Step 5b: Verify that the Username field is displayed", () => {
        cy.get("#username")
          .should("be.visible");
      });

      it("Step 5c: Verify that the Username field is enabled", () => {
        cy.get("#username")
          .should("be.enabled");
      });

      it("Step 5d: Verify that the Username field is empty", () => {
        cy.get("#username")
          .should("have.value", "");
      });

      it("Step 5e: Verify that the Username field has the correct type", () => {
        cy.get("#username")
          .should("have.attr", "type", "text");
      });

      it("Step 5f: Verify that the Username field has the correct autocomplete attribute", () => {
        cy.get("#username")
          .should("have.attr", "autocomplete", "username");
      });
    });

    context("Step 6: Verify the Password field", () => {
      it("Step 6a: Verify that the Password label is displayed", () => {
        cy.get('label[for="password"]')
          .should("be.visible")
          .and("contain.text", "Password");
      });

      it("Step 6b: Verify that the Password field is displayed", () => {
        cy.get("#password")
          .should("be.visible");
      });

      it("Step 6c: Verify that the Password field is enabled", () => {
        cy.get("#password")
          .should("be.enabled");
      });

      it("Step 6d: Verify that the Password field is empty", () => {
        cy.get("#password")
          .should("have.value", "");
      });

      it("Step 6e: Verify that the Password field has the correct type", () => {
        cy.get("#password")
          .should("have.attr", "type", "password");
      });

      it("Step 6f: Verify that the Password field has the correct autocomplete attribute", () => {
        cy.get("#password")
          .should("have.attr", "autocomplete", "new-password");
      });

      it("Step 6g: Verify that the Show password button is displayed", () => {
        cy.get(
          'button[aria-controls="password"][aria-label="Show password"]',
        )
          .should("be.visible");
      });
    });

    context("Step 7: Verify the Confirm password field", () => {
      it("Step 7a: Verify that the Confirm password label is displayed", () => {
        cy.get('label[for="password-confirm"]')
          .should("be.visible")
          .and("contain.text", "Confirm password");
      });

      it("Step 7b: Verify that the Confirm password field is displayed", () => {
        cy.get("#password-confirm")
          .should("be.visible");
      });

      it("Step 7c: Verify that the Confirm password field is enabled", () => {
        cy.get("#password-confirm")
          .should("be.enabled");
      });

      it("Step 7d: Verify that the Confirm password field is empty", () => {
        cy.get("#password-confirm")
          .should("have.value", "");
      });

      it("Step 7e: Verify that the Confirm password field has the correct type", () => {
        cy.get("#password-confirm")
          .should("have.attr", "type", "password");
      });

      it("Step 7f: Verify that the Confirm password field has the correct autocomplete attribute", () => {
        cy.get("#password-confirm")
          .should("have.attr", "autocomplete", "new-password");
      });

      it("Step 7g: Verify that the Show password button is displayed", () => {
        cy.get(
          'button[aria-controls="password-confirm"][aria-label="Show password"]',
        )
          .should("be.visible");
      });
    });

    context("Step 8: Verify the Email field", () => {
      it("Step 8a: Verify that the Email label is displayed", () => {
        cy.get('label[for="email"]')
          .should("be.visible")
          .and("contain.text", "Email");
      });

      it("Step 8b: Verify that the Email field is displayed", () => {
        cy.get("#email")
          .should("be.visible");
      });

      it("Step 8c: Verify that the Email field is enabled", () => {
        cy.get("#email")
          .should("be.enabled");
      });

      it("Step 8d: Verify that the Email field is empty", () => {
        cy.get("#email")
          .should("have.value", "");
      });

      it("Step 8e: Verify that the Email field has the correct type", () => {
        cy.get("#email")
          .should("have.attr", "type", "text");
      });

      it("Step 8f: Verify that the Email field has the correct autocomplete attribute", () => {
        cy.get("#email")
          .should("have.attr", "autocomplete", "email");
      });
    });

    context("Step 9: Verify the First Name field", () => {
      it("Step 9a: Verify that the First Name label is displayed", () => {
        cy.get('label[for="firstName"]')
          .should("be.visible")
          .and("contain.text", "First name");
      });

      it("Step 9b: Verify that the First Name field is displayed", () => {
        cy.get("#firstName")
          .should("be.visible");
      });

      it("Step 9c: Verify that the First Name field is enabled", () => {
        cy.get("#firstName")
          .should("be.enabled");
      });

      it("Step 9d: Verify that the First Name field is empty", () => {
        cy.get("#firstName")
          .should("have.value", "");
      });

      it("Step 9e: Verify that the First Name field has the correct type", () => {
        cy.get("#firstName")
          .should("have.attr", "type", "text");
      });
    });

    context("Step 10: Verify the Last Name field", () => {
      it("Step 10a: Verify that the Last Name label is displayed", () => {
        cy.get('label[for="lastName"]')
          .should("be.visible")
          .and("contain.text", "Last name");
      });

      it("Step 10b: Verify that the Last Name field is displayed", () => {
        cy.get("#lastName")
          .should("be.visible");
      });

      it("Step 10c: Verify that the Last Name field is enabled", () => {
        cy.get("#lastName")
          .should("be.enabled");
      });

      it("Step 10d: Verify that the Last Name field is empty", () => {
        cy.get("#lastName")
          .should("have.value", "");
      });

      it("Step 10e: Verify that the Last Name field has the correct type", () => {
        cy.get("#lastName")
          .should("have.attr", "type", "text");
      });
    });

    context("Step 11: Verify the Register button", () => {
      it("Step 11a: Verify that the Register button is displayed", () => {
        cy.get('#kc-form-buttons input[type="submit"]')
          .should("be.visible");
      });

      it("Step 11b: Verify that the Register button has the correct text", () => {
        cy.get('#kc-form-buttons input[type="submit"]')
          .should("have.value", "Register");
      });

      it("Step 11c: Verify that the Register button is enabled", () => {
        cy.get('#kc-form-buttons input[type="submit"]')
          .should("be.enabled");
      });

      it("Step 11d: Verify that the Register button has the correct type", () => {
        cy.get('#kc-form-buttons input[type="submit"]')
          .should("have.attr", "type", "submit");
      });
    });

    context("Step 12: Verify the Back to Login link", () => {
      it("Step 12a: Verify that the Back to Login link is displayed", () => {
        cy.get("#kc-form-options a")
          .should("be.visible")
          .and("contain.text", "Back to Login");
      });
    });

    context("Step 13: Verify the Registration form structure", () => {
      it("Step 13a: Verify that the Registration form contains the Username field", () => {
        cy.get("#kc-register-form")
          .find("#username")
          .should("exist");
      });

      it("Step 13b: Verify that the Registration form contains the Password field", () => {
        cy.get("#kc-register-form")
          .find("#password")
          .should("exist");
      });

      it("Step 13c: Verify that the Registration form contains the Confirm password field", () => {
        cy.get("#kc-register-form")
          .find("#password-confirm")
          .should("exist");
      });

      it("Step 13d: Verify that the Registration form contains the Email field", () => {
        cy.get("#kc-register-form")
          .find("#email")
          .should("exist");
      });

      it("Step 13e: Verify that the Registration form contains the First Name field", () => {
        cy.get("#kc-register-form")
          .find("#firstName")
          .should("exist");
      });

      it("Step 13f: Verify that the Registration form contains the Last Name field", () => {
        cy.get("#kc-register-form")
          .find("#lastName")
          .should("exist");
      });

      it("Step 13g: Verify that the Registration form contains the Register button", () => {
        cy.get("#kc-register-form")
          .find('input[type="submit"]')
          .should("exist");
      });
    });
  },
);