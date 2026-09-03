describe( "testsuite-001: Login Page - Content Validation", () => {
    before(() => {
      cy.visit("http://localhost:3000");
      cy.wait(2000);
    });

    context("Step 1: Verify that the Login page is displayed", () => {
      it("Step 1a: Verify that the Login page is displayed", () => {
        cy.get("body").should("be.visible");
      });

      it("Step 1b: Verify that the Login page URL is displayed", () => {
        cy.url().should(
          "include",
          "/realms/amsrealm/protocol/openid-connect/auth",
        );
      });
    });

    context("Step 2: Verify the Username field", () => {
      it("Step 2a: Verify that the Username field is displayed", () => {
        cy.get("#username").should("be.visible");
      });

      it("Step 2b: Verify that the Username field is enabled", () => {
        cy.get("#username").should("be.enabled");
      });

      it("Step 2c: Verify that the Username field is empty", () => {
        cy.get("#username").should("have.value", "");
      });

      it("Step 2d: Verify that the Username field has the correct type", () => {
        cy.get("#username").should("have.attr", "type", "text");
      });
    });

    context("Step 3: Verify the Password field", () => {
      it("Step 3a: Verify that the Password field is displayed", () => {
        cy.get("#password").should("be.visible");
      });

      it("Step 3b: Verify that the Password field is enabled", () => {
        cy.get("#password").should("be.enabled");
      });

      it("Step 3c: Verify that the Password field is empty", () => {
        cy.get("#password").should("have.value", "");
      });

      it("Step 3d: Verify that the Password field has the correct type", () => {
        cy.get("#password").should("have.attr", "type", "password");
      });
    });

    context("Step 4: Verify the Login button", () => {
      it("Step 4a: Verify that the Login button is displayed", () => {
        cy.get("#kc-login").should("be.visible");
      });

      it("Step 4b: Verify that the Login button is enabled", () => {
        cy.get("#kc-login").should("be.enabled");
      });

      it("Step 4c: Verify that the Login button has the correct type", () => {
        cy.get("#kc-login").should("have.attr", "type", "submit");
      });
    });

    context("Step 5: Verify the Username label", () => {
      it("Step 5a: Verify that the Username label is displayed", () => {
        cy.get('label[for="username"]').should("be.visible");
      });

      it("Step 5b: Verify that the Username label has the correct text", () => {
        cy.get('label[for="username"]')
          .invoke("text")
          .should("contain", "Username");
      });
    });

    context("Step 6: Verify the Password label", () => {
      it("Step 6a: Verify that the Password label is displayed", () => {
        cy.get('label[for="password"]').should("be.visible");
      });

      it("Step 6b: Verify that the Password label has the correct text", () => {
        cy.get('label[for="password"]')
          .invoke("text")
          .should("contain", "Password");
      });
    });

    // context("Step 7: Verify the Remember Me option", () => {
    //   it("Step 7a: Verify that the Remember Me option is displayed", () => {
    //     cy.get('input[name="rememberMe"]').should("be.visible");
    //   });

    //   it("Step 7b: Verify that the Remember Me option is enabled", () => {
    //     cy.get('input[name="rememberMe"]').should("be.enabled");
    //   });
    // });

    context("Step 8: Verify the Forgot Password link", () => {
      it("Step 8a: Verify that the Forgot Password link is displayed", () => {
        cy.contains("a", "Forgot Password").should("be.visible");
      });

      // it("Step 8b: Verify that the Forgot Password link is enabled", () => {
      //   cy.contains("a", "Forgot Password").should("be.enabled");
      // });
    });

    context("Step 9: Verify the Login page content", () => {
      it("Step 9a: Verify that the login form is displayed", () => {
        cy.get("form").should("be.visible");
      });

      it("Step 9b: Verify that the login form contains the Username field", () => {
        cy.get("form").find("#username").should("exist");
      });

      it("Step 9c: Verify that the login form contains the Password field", () => {
        cy.get("form").find("#password").should("exist");
      });

      it("Step 9d: Verify that the login form contains the Login button", () => {
        cy.get("form").find("#kc-login").should("exist");
      });
    });
  });