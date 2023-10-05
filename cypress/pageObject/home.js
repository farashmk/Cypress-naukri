import { homeelements } from "../../utilities/homePage";

export class home {
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
}
