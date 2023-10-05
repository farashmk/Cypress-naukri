import { login } from "../../utilities/loginPage";
import { Login } from "../pageObject/login";

const Todo = new Login();
describe("Login Test Suit", () => {
  it("Valid Input Test", () => {
    Todo.loginNaviagtioncommon();
    Todo.siginCommon(Cypress.env("username"), Cypress.env("password")); //valid data Testing
    cy.title().should("equal", "Home | Mynaukri");
  });
  it("Invalid Login Credential", () => {
    Todo.loginNaviagtioncommon(); //Navigating To Login Page Of Naukri
    Todo.siginCommon("Thripth@$", "7996063603"); //invalid user valid password
    cy.get(login.invalidusererrorlabel).should("exist"); //Checking the signin with invalid password
    Todo.sigincleardata();
    Todo.siginCommon("farazabida@gmail.com", "H6ksbksg"); //valid username Invalid Password

    cy.get(login.invalidusererrorlabel).should("exist");
    Todo.sigincleardata();

    Todo.siginCommon("Thripth@$", "jagnis"); //Checking the sign in with Invalid username and invalid password
    cy.get(login.invalidusererrorlabel).should("exist");
    Todo.sigincleardata();

    Todo.siginCommon(" ", "7996063603"); //blank username valid password
    cy.get(login.usernameblnkerrorlabel).should(
      "have.text",
      "Email ID/Username cannot be left blank"
    );
    Todo.sigincleardata();

    Todo.siginCommon("farazabida@gmail.com", " "); //username with blank password
    cy.get(login.passwordblankerrorlabel).should(
      "have.text",
      "Password cannot be left blank"
    );
    Todo.sigincleardata();

    Todo.siginCommon(" ", " "); //blank Username Blank Password
    cy.get(login.usernameblnkerrorlabel).should(
      "have.text",
      "Email ID/Username cannot be left blank"
    );
    cy.get(login.passwordblankerrorlabel).should(
      "have.text",
      "Password cannot be left blank"
    );
  });
});
