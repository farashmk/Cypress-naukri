import { homeelements } from "../../utilities/homePage";
import { home } from "../pageObject/home";
import { Login } from "../pageObject/login"

const Todo=new Login();

describe('Home Page Test Suit',()=>{
    it('updating profile data',()=>{
        var hrefValue;
        Todo.loginNaviagtioncommon();
        Todo.siginCommon(Cypress.env('username'),Cypress.env('password'));
        cy.title().should('equal','Home | Mynaukri');//assertion For Checking Redirected To HomePage
        cy.get(homeelements.companiesnavbar).click();
        cy.get(homeelements.parentofallcomapany).within(()=>{
              cy.get('[data-index]').eq(0).invoke('attr', 'data-href')
              .then((href) => {
                hrefValue = href;
                cy.log('The href attribute value is:', hrefValue);
                cy.visit(`${hrefValue}`);
              });
              cy.log('The href attribute value is:', hrefValue);
              //cy.visit(`${hrefValue}`);
        })
        //cy.log('The href attribute value is:', hrefValue);
        cy.wait(3000);
        
    })
})