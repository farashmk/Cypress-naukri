import { companyelements } from "../../utilities/companyPage";
import { homeelements } from "../../utilities/homePage";
import { home } from "../pageObject/home";
import { Login } from "../pageObject/login";

const Todo = new Login();
const Toho = new home();

describe("Home Page Test Suit", () => {
  it.only("searching and saving first listed job", () => {
    Todo.loginNaviagtioncommon();
    Todo.siginCommon(Cypress.env("username"), Cypress.env("password"));
    cy.title().should("equal", "Home | Mynaukri"); //assertion For Checking Redirected To HomePage
    Toho.searchtab("analyst", "bangalore", 2);
    cy.wait(2000);
    cy.get(".srp-jobtuple-wrapper")
      .eq(0)
      .within(() => {
        cy.get("a[href]")
          .eq(0)
          .invoke("attr", "href")
          .then((hrefdata) => {
            let hrefval = hrefdata;
            cy.visitnaukri(hrefval);
          });
      });
    //here get The parent Of Element Of Save Button And Then Searching Save/ Saved element Is Present
    cy.get(companyelements.parentofsaveandapply).then((parentelement) => {
      // Check if the child element with specific text is present within the parent
      if (parentelement.find(companyelements.savebutton).length > 0) {
        cy.get(companyelements.savebutton).click(); //clicking save button
        cy.log("job Saved");
      } else if (parentelement.find(companyelements.savedbutton).length > 0) {
        cy.log("Job Already Saved");
      }
    });

    cy.get(companyelements.parentofsaveandapply).then((parentelement) => {
      // Check if the child element with specific text is present within the parent
      if (parentelement.find(companyelements.applybtn).length > 0) {
        cy.get(companyelements.applybtn).click(); //clicking save button
        cy.wait(2000);
        cy.title().should("equal", "Apply Confirmation");
      } else if (
        parentelement.find(companyelements.alreadyApplied).length > 0
      ) {
        cy.log("you are Applied");
      }
    });
  });
  it("checking search result functionality", () => {
    Todo.loginNaviagtioncommon();
    Todo.siginCommon(Cypress.env("username"), Cypress.env("password"));
    cy.title().should("equal", "Home | Mynaukri"); //assertion For Checking Redirected To HomePage
    Toho.searchtab(" ", "bangalore", "2");
  });

  it("Follow Companies", () => {
    Todo.loginNaviagtioncommon();
    Todo.siginCommon(Cypress.env("username"), Cypress.env("password"));
    cy.title().should("equal", "Home | Mynaukri"); //assertion For Checking Redirected To HomePage
    cy.get(homeelements.companiesnavbar).click();
    cy.get(homeelements.parentofallcomapany).within(() => {
      cy.get("[data-index]")
        .eq(0)
        .invoke("attr", "data-href")
        .then((href) => {
          let hrefValue = href;
          cy.log("The href attribute value is:", hrefValue);
          cy.visitnaukri(hrefValue);
        });
    });
    //cy.get(companyelements.followbtn).scrollIntoView().click({ force: true });
    cy.get(companyelements.followbtn).then((fol) => {
      const foll = fol.text();
      if (foll == "Following") {
        cy.log("Already Following");
      } else {
        cy.get(companyelements.followbtn)
          .scrollIntoView()
          .click({ force: true }); //clicked to Following
      }
    });
  });
});
