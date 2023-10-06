import { companyelements } from "../../utilities/companyPage";
import { homeelements } from "../../utilities/homePage";
import { home } from "../pageObject/home";
import { Login } from "../pageObject/login";

const Todo = new Login();
const Toho = new home();

describe("Home Page Test Suit", () => {
  it("searching and saving first listed job", () => {
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
    Todo.siginCommon(Cypress.env("username"), Cypress.env("password"));
    cy.title().should("equal", "Home | Mynaukri"); //assertion For Checking Redirected To HomePage
    Toho.searchtab("sales", "bangalore", "2");
    cy.wait(2000);
    //Assertion That Checks Search Result Matches The Job Titles
    Toho.searchlistAssertion(homeelements.joblisttitle, "sales");
    //Assertion For Checks Search Result Matches The Job Location
    Toho.searchlistAssertion(
      homeelements.joblistlocation,
      "bangalore" || "bengaluru"
    );
    Toho.searchlistExperienceAssertion("2");
  });

  it("Follow Companies", () => {
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

  it("test for checking search filter workmode hybrid", () => {
    Toho.siginhomeCommon();
    cy.title().should("equal", "Home | Mynaukri"); //assertion For Checking Redirected To HomePage
    Toho.searchtab("sales", "bangalore", "2");
    cy.wait(2000);
    cy.get(homeelements.workmodehybridchkbox).check({ force: true });
    cy.wait(3000);
    Toho.searchlistAssertion(homeelements.joblistlocation, "hybrid");
  });
  it("test for checking search filter workmode remote", () => {
    Toho.siginhomeCommon();
    cy.title().should("equal", "Home | Mynaukri"); //assertion For Checking Redirected To HomePage
    Toho.searchtab("developer", "mumbai", "0");
    cy.wait(2000);
    cy.get(homeelements.workModeRemotechkbox).check({ force: true });
    cy.wait(3000);
    Toho.searchlistAssertion(homeelements.joblistlocation, "remote");
  });
  it("test for checking search filter workmode temp home due to covid", () => {
    Toho.siginhomeCommon(Cypress.env("username"), Cypress.env("password"));
    cy.title().should("equal", "Home | Mynaukri"); //assertion For Checking Redirected To HomePage
    Toho.searchtab("developer", "delhi", "0");
    cy.wait(2000);
    cy.get(homeelements.workmodetempwfhchkbox).check({ force: true });
    cy.wait(3000);
    Toho.searchlistAssertion(homeelements.joblistlocation, "temp");
  });
  it("Test for selecting Recommended Jobs", () => {
    Toho.siginhomeCommon();
    Toho.searchtab("mechanic", "mumbai", "4");
    cy.wait(2500);
    cy.get(homeelements.jobsnavbar).trigger("mouseover");
    cy.wait(1500);
    cy.get(homeelements.jobnavrecommendedjob).click();
    cy.wait(2000);
    cy.get(homeelements.recommendedjobtitle)
      .should("be.visible")
      .then((txt) => {
        const recommendedtext = txt.text();
        expect(recommendedtext).to.contain("Recomended Jobs");
      });
  });
  it.only("Test For selecting Saved Jobs", () => {
    Toho.siginhomeCommon();
    cy.wait(2000);
    cy.get(homeelements.jobsnavbar).trigger("mouseover");
    cy.wait(1500);
    cy.get(homeelements.jobnavsavedjobs).click();
    cy.wait(2000);
    cy.get(homeelements.savedjobpagelabel)
      .should("be.visible")
      .then((txt) => {
        const recommendedtext = txt.text();
        expect(recommendedtext).to.contain("Jobs saved");
      });
  });
});
