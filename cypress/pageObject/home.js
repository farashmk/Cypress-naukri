import { homeelements } from "../../utilities/homePage";
import { login } from "../../utilities/loginPage";

export class home {
  siginhomeCommon() {
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
    cy.get(login.usernametxt).click().type(Cypress.env("username"));
    cy.get(login.passwordtxt).click().type(Cypress.env("password"));
    cy.get(login.loginsubmitbtn).click();
    cy.wait(1000);
  }
  searchtab(job, location, experience) {
    cy.get(homeelements.searchplaceholder).click();
    cy.get(homeelements.searchkeytxt).type(job);
    cy.get(homeelements.searchexperiencedropdown).click();
    cy.get(homeelements.searchexperiencedropdownlistparent).within(() => {
      cy.get("[index]").eq(experience).click();
    });
    cy.get(homeelements.searchkeylocationtxt).type(location);
    cy.get(homeelements.searchlookup).click();
  }
  searchlistAssertion(locator, expectedkey) {
    cy.get(locator).each((customName) => {
      let lowercaseelement = customName.text().toLowerCase();
      expect(lowercaseelement).to.include(expectedkey);
    });
  }
  searchlistExperienceAssertion(experience) {
    cy.get(homeelements.joblistexperience).each((name) => {
      // Extract the range from the text,
      const rangeMatch = name.text().match(/(\d+)\s*-\s*(\d+)\s*Yrs/i);
      if (rangeMatch) {
        const minExperience = parseInt(rangeMatch[1]);
        const maxExperience = parseInt(rangeMatch[2]);
        //{}
        const exp = parseInt(experience);
        // Check if the user's experience falls within the range
        expect(exp).to.be.gte(minExperience); //gte(greater than or equal)
        expect(exp).to.be.lte(maxExperience); //lte (lesser than or equal)
      } else {
        // Handle the case where the text format doesn't match expectations
        // You can add an appropriate assertion or action here
        cy.log("Experience format does not match: " + name.text());
        // Optionally, you can add a custom assertion message
        cy.wrap(false).should("be.true", "Experience format does not match");
      }
    });
  }
}
