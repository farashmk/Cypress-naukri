import { companyelements } from "../../utilities/companyPage";
import { homeelements } from "../../utilities/homePage";
import { home } from "../pageObject/home";
import { Login } from "../pageObject/login";

const Todo = new Login();
const Toho = new home();

describe("Home Page Test Suit", () => {
  beforeEach(() => {
    cy.session("login", () => {
      Toho.siginhomeCommon();
    });
  });
  let location = [];
  it("searching and saving first listed job", () => {
    cy.visitnaukri(`/${Cypress.env("login_end_point")}`);
    // Toho.siginhomeCommon();
    cy.title().should("equal", "Home | Mynaukri"); //assertion For Checking Redirected To HomePage
    Toho.searchtab("analyst", "bangalore", 2);
    cy.wait(2000);
    cy.get(homeelements.parentofsinglejoblist)
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
    cy.visitnaukri(`/${Cypress.env("login_end_point")}`);
    // Toho.siginhomeCommon();
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
    cy.visitnaukri(`/${Cypress.env("login_end_point")}`);
    //Toho.siginhomeCommon();
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
    cy.visitnaukri(`/${Cypress.env("login_end_point")}`);
    // Toho.siginhomeCommon();
    cy.title().should("equal", "Home | Mynaukri"); //assertion For Checking Redirected To HomePage
    Toho.searchtab("sales", "bangalore", "2");
    cy.wait(2000);
    cy.get(homeelements.workmodehybridchkbox).check({ force: true });
    cy.wait(3000);
    Toho.searchlistAssertion(homeelements.joblistlocation, "hybrid");
  });
  it("test for checking search filter workmode remote", () => {
    cy.visitnaukri(`/${Cypress.env("login_end_point")}`);
    // Toho.siginhomeCommon();
    cy.title().should("equal", "Home | Mynaukri"); //assertion For Checking Redirected To HomePage
    Toho.searchtab("developer", "mumbai", "0");
    cy.wait(2000);
    cy.get(homeelements.workModeRemotechkbox).check({ force: true });
    cy.wait(3000);
    Toho.searchlistAssertion(homeelements.joblistlocation, "remote");
  });
  it("test for checking search filter workmode temp home due to covid", () => {
    cy.visitnaukri(`/${Cypress.env("login_end_point")}`);
    // Toho.siginhomeCommon(Cypress.env("username"), Cypress.env("password"));
    cy.title().should("equal", "Home | Mynaukri"); //assertion For Checking Redirected To HomePage
    Toho.searchtab("developer", "delhi", "0");
    cy.wait(2000);
    cy.get(homeelements.workmodetempwfhchkbox).check({ force: true });
    cy.wait(3000);
    Toho.searchlistAssertion(homeelements.joblistlocation, "temp");
  });
  it("Test for selecting Recommended Jobs", () => {
    cy.visitnaukri(`/${Cypress.env("login_end_point")}`);
    //Toho.siginhomeCommon();
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
        expect(recommendedtext).to.contain("Recommended Jobs for You");
      });
  });
  it("Test For selecting Saved Jobs", () => {
    cy.visitnaukri(`/${Cypress.env("login_end_point")}`);
    //Toho.siginhomeCommon();
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
  it.only("Checking Functionality Additional Filter Location", () => {
    cy.visitnaukri(`/${Cypress.env("login_end_point")}`);
    cy.title().should("equal", "Home | Mynaukri"); //assertion For Checking Redirected To HomePage
    cy.wait(3000);
    Toho.searchtab("android developer", "delhi", "2");
    cy.wait(4000);
    cy.get("[data-filter-id='citiesGid']")
      .within(() => {
        cy.get(".styles_chckBoxCont__t_dRs")
          .eq(0)
          .within(() => {
            cy.get("[class='styles_ellipsis__cvWP1 styles_filterLabel__jRP04']")
              .invoke("text")
              .then((textofplace) => {
                let loc = textofplace;
                cy.log(loc);
                location.push(loc);
                cy.get(
                  "[class='styles_ellipsis__cvWP1 styles_filterLabel__jRP04']"
                ).click();
                cy.wait(2000);
              });
          });
      })
      .then(() => {
        // This block will execute after the cy.get() block is complete.
        cy.log(location[0]);
        const expectedlocation = location[0].toLowerCase().trim();
        cy.get(homeelements.joblistlocation).each((customName) => {
          let lowercaseelement = customName.text().toLowerCase().trim();
          const cleanedLocationText = lowercaseelement.replace(/\u00A0/g, " ");
          cy.log(cleanedLocationText);
          expect(cleanedLocationText).to.include(expectedlocation);
        });
      });
  });
  it("Checking Functionality Additional Filter Location", () => {
    cy.visitnaukri(`/${Cypress.env("login_end_point")}`);
    cy.title().should("equal", "Home | Mynaukri"); // Assertion For Checking Redirected To HomePage
    cy.wait(3000);
    Toho.searchtab("android developer", "delhi", "2");
    cy.wait(4000);

    const location = []; // Array to store the selected location(s)

    cy.get("[data-filter-id='citiesGid']").within(() => {
      cy.get(".styles_chckBoxCont__t_dRs")
        .eq(0)
        .within(() => {
          cy.get("[class='styles_ellipsis__cvWP1 styles_filterLabel__jRP04']")
            .invoke("text")
            .then((textofplace) => {
              let loc = textofplace.trim();
              cy.log(loc);
              location.push(loc);
              cy.get(
                "[class='styles_ellipsis__cvWP1 styles_filterLabel__jRP04']"
              ).click();
              cy.wait(2000);
            });
        });
    });

    cy.get(homeelements.joblistlocation).each((customName) => {
      location.forEach((expectedlocation) => {
        customName.invoke("text").then((locationText) => {
          const lowercaseLocationText = locationText.toLowerCase().trim();
          const cleanedLocationText = lowercaseLocationText.replace(
            /\u00A0/g,
            " "
          );
          cy.log(cleanedLocationText);
          expect(cleanedLocationText).to.include(
            expectedlocation.toLowerCase()
          );
        });
      });
    });
  });
});
