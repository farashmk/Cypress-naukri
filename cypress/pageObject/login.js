import { login } from "../../utilities/loginPage";

export class Login {
  loginNaviagtioncommon() {
    cy.visitnaukri(`/${Cypress.env("login_end_point")}`);
    cy.title().should(
      "eql",
      "Jobseeker's Login: Search the Best Jobs available in India & Abroad - Naukri.com"
    );
    Object.keys(login).forEach((key) => {
      if (
        key != "invalidusererrorlabel" &&
        key != "usernameblnkerrorlabel" &&
        key != "passwordblankerrorlabel"
      ) {
        cy.get(login[key]).scrollIntoView().should("be.visible");
      }
    });
  }
  siginCommon(username, password) {
    cy.get(login.usernametxt).click().type(username);
    cy.get(login.passwordtxt).click().type(password);
    cy.get(login.loginsubmitbtn).click();
    cy.wait(1000);
  }

  sigincleardata() {
    cy.get(login.usernametxt).clear();
    cy.get(login.passwordtxt).clear();
  }
}
