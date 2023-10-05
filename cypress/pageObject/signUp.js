import { register } from "../../utilities/register";
import { homeelements } from "../../utilities/homePage";
export class signUp{
    signUpNavigation(){
        cy.visit(`/${Cypress.env('registration_end_point')}`, {
            headers: {
                'accept': 'application/json, text/plain, */*',
                'user-agent': 'axios/0.27.2'
            }
        });
          cy.title().should('eq','Register on Naukri.com: Apply to Millions of Jobs Online');
    }
    signupcommonValid(name,email,password,mobile){
         cy.get(register.fullnametxt).click();
         cy.get(register.fullnametxt).type(name);
         cy.get(register.fullnameerrorlabel).should('not.exist');
         cy.get(register.emailtxt).click().type(email);
         cy.get(register.passwordtxt).click();
         cy.wait(2000);
         cy.get(register.emailerrorlabel).should('contain.text',"We'll send you relevant jobs in your mail");
         cy.get(register.passwordtxt).type(password);
         cy.get(register.passworderrorlabel).should('contain.text',"Minimum 6 characters required");
         cy.get(register.mobilenumbertxt).click();
         cy.get(register.mobileerrorlabel).should('contain.text',"Recruiters will call you on this number");
         cy.get(register.mobilenumbertxt).type(mobile);
    }
    signupcommonInvalid(name,email,password,mobile){
                cy.get(register.fullnametxt).click();
                cy.get(register.fullnametxt).type(name);
                cy.get(register.emailtxt).click();
                cy.wait(1000);
                cy.get(register.fullnameerrorlabel).should('exist');
                cy.get(register.emailtxt).type(email);
                cy.get(register.passwordtxt).click();
                cy.wait(1000);
                cy.get(register.emailerrorlabel).should('contain.text',"Please enter a valid email ID");
                cy.get(register.passwordtxt).type(password);
                cy.get(register.passworderrorlabel).should('not.contain.text',"Minimum 6 characters Required");
                cy.wait(2000);
                cy.get(register.mobilenumbertxt).click().type(mobile);
    }
    uploadresumecommon(resumepath){
        cy.get("div.resume-upload-container").within(()=>{
            cy.get(register.uploadresumebtn).click();
            cy.get("input[type='file']").attachFile(resumepath);
         })
    }
    signupforexperience(){
         cy.fixture("validtestdata").then((data)=>{
         this.signupcommonValid(data.name,data.email,data.password,data.mobile);
         cy.get(register.experiencestatusbtn).click();
         cy.get(register.currentcitytxt).should('not.exist');
         this.uploadresumecommon(data.resumepath);
         
         cy.get(register.uploadresumeerrorlabel).should('not.exist');
         //cy.get(register.registerbtn).click();
         //cy.get(homeelements.welcomename).should('have.text','Welcome');
        }) 
        
    }
    signupfresherindia(){
         cy.fixture("freshervalidtestdata").then((data)=>{
         this.signupcommonValid(data.name,data.email,data.password,data.mobile);
         cy.get(register.fresherstatusbtn).click();
         cy.get(register.currentcitytxt).type(data.city);
         cy.get(register.currentcityerrorlabel).should('not.exist');
         this.uploadresumecommon(data.resumepath);
         cy.get(register.uploadresumeerrorlabel).should('not.exist');
        //  cy.get(register.registerbtn).click();
        //  cy.get(homeelements.welcomename).should('contain','welcome');
        })
    }
    signupfresheroutsideindia(){
       cy.fixture("fresheroutsideIndiaTestdata").then((data)=>{
        this.signupcommonValid(data.name,data.email,data.password,data.mobile);
         cy.get(register.fresherstatusbtn).click();
         cy.get(register.outsideindiacheckbox).click();
         cy.get(register.outsidecityindiatxt).type(data.city);
         cy.get(register.currentcityerrorlabel).should('not.exist');
         cy.get(register.currentcountrytxt).type(data.country+'{enter}');
         this.uploadresumecommon(data.resumepath);
         cy.get(register.uploadresumeerrorlabel).should('not.exist');
        //  cy.get(register.registerbtn).click();
        //  cy.get(homeelements.welcomename).should('contain','welcome');
    
        })
        }
        signupFillingBlank(){
            // document.getElementsByClassName('submitbtn resman-btn-primary resman-btn-regular resman-btn-disabled').disabled=false;
            // cy.wait(3000);
            cy.get(register.registerbtn).invoke('click');
        }
        signUpexperienceInvalidData(){
            cy.fixture("invaliddata").then((data)=>{
               this.signupcommonInvalid(data.name,data.email,data.password,data.mobile);
                cy.get(register.experiencestatusbtn).click();
                cy.wait(2000);
                cy.get(register.mobileerrorlabel).should('contain.text',"Please enter your 10 digit Mobile Number");
                cy.get(register.currentcitytxt).should('not.exist');
                this.uploadresumecommon(data.resumepath);
                cy.get(register.uploadresumeerrorlabel).should('exist');
                //cy.get(register.registerbtn).should('be.disabled');
                cy.wait(2000);
            })
        }
        signupfresherindiainvaliddata(){
            cy.fixture("invaliddata").then((data)=>{
                this.signupcommonInvalid(data.name,data.email,data.password,data.mobile);
                cy.get(register.fresherstatusbtn).click();
                cy.wait(2000);
                cy.get(register.mobileerrorlabel).should('contain.text',"Please enter your 10 digit Mobile Number");
                cy.get(register.currentcitytxt).click().type(data.city);
                cy.get(register.currentcityerrorlabel).should('exist');
                this.uploadresumecommon(data.resumepath);
                cy.get(register.uploadresumeerrorlabel).should('exist');
                cy.get(register.registerbtn).should('be.disabled');
           })
        }
        signupfresheroutsideindiaInvalidData(){
            cy.fixture("invaliddata").then((data)=>{
              this.signupcommonInvalid(data.name,data.email,data.password,data.mobile);
              cy.get(register.fresherstatusbtn).click();
              cy.wait(2000);
              cy.get(register.mobileerrorlabel).should('contain.text',"Please enter your 10 digit Mobile Number");
              cy.get(register.outsideindiacheckbox).click();
              cy.get(register.outsidecityindiatxt).type(data.city);
              cy.get(register.currentcityerrorlabel).should('not.exist');
              cy.get(register.currentcountrytxt).type(data.country+'{enter}');
              this.uploadresumecommon(data.resumepath);
              cy.get(register.uploadresumeerrorlabel).should('exist');
              cy.get(register.registerbtn).should('be.disabled');
             })
             }
             signupemailexisted(){
                cy.fixture("emailexistedtestdata").then((data)=>{
                    cy.get(register.fullnametxt).click();
                    cy.get(register.fullnametxt).type(data.name);
                    cy.get(register.fullnameerrorlabel).should('not.exist');
                    cy.get(register.emailtxt).click().type(data.email);
                    cy.get(register.passwordtxt).click();
                    cy.wait(2000);
                    cy.get(register.emailerrorlabel).should('contain.text',"An account with this email address already exists. ");
                })
             }
             signupelementvisibility(){
                Object.keys(register).forEach((key) => {
                    if(key!='fullnameerrorlabel'&key!='emailerrorlabel'&&key!='passworderrorlabel'&&key!='mobileerrorlabel'&&key!='currentcityerrorlabel'&&key!='currentcountryerrorlabel'&&key!='outsideindiacheckbox'&&key!='outsideindialabel'&&key!='currentcitylabel'&&key!='currentcitytxt'&&key!='outsidecityindiatxt'&&key!='currentcountrytxt'&&key!='currentcountrylabel'&&key!='uploadresumefile'){
                        cy.get(register[key]).should('be.visible');
                    }
                  });
             }
             signupelementvisibiltyfresher(){
                cy.get(register.fresherstatusbtn).click();
                cy.wait(1000);
                Object.keys(register).forEach((key) => {
                    if(key!='fullnameerrorlabel'&key!='emailerrorlabel'&&key!='passworderrorlabel'&&key!='mobileerrorlabel'&&key!='currentcityerrorlabel'&&key!='currentcountryerrorlabel'&&key!='currentcountrytxt'&&key!='currentcountrylabel'&&key!='uploadresumefile'){
                        cy.get(register[key]).should('be.visible');
                    }
                  });
             }
             signupelementvisibilityfresheroutside(){
                cy.get(register.fresherstatusbtn).click();
                cy.get(register.outsideindiacheckbox).click();
                cy.wait(1000);
                Object.keys(register).forEach((key) => {
                    if(key!='fullnameerrorlabel'&key!='emailerrorlabel'&&key!='passworderrorlabel'&&key!='mobileerrorlabel'&&key!='uploadresumefile'){
                        cy.get(register[key]).should('be.visible');
                    }
                  });
             }
             siginupwithoutemailcommon(name,password,mobile){
                cy.get(register.fullnametxt).click();
                cy.get(register.fullnametxt).type(name);
                cy.get(register.emailtxt).click();
                cy.wait(1000);
                cy.get(register.fullnameerrorlabel).should('exist');
                cy.get(register.emailerrorlabel).should('exist');
                cy.get(register.passwordtxt).click();
                cy.wait(1000);
                cy.get(register.emailerrorlabel).should('contain.text',"Please enter a valid email ID");
                cy.get(register.passwordtxt).type(password);
                cy.get(register.passworderrorlabel).should('not.contain.text',"Minimum 6 characters Required");
                cy.wait(2000);
                cy.get(register.mobilenumbertxt).click().type(mobile);
             }
             signupwithoutemailexperience(){
                cy.fixture("validtestdata").then((data)=>{
                    this.siginupwithoutemailcommon(data.name,data.password,data.mobile);
                    cy.get(register.experiencestatusbtn).click();
                    cy.get(register.currentcitytxt).should('not.exist');
                    this.uploadresumecommon(data.resumepath);
                    cy.get(register.uploadresumeerrorlabel).should('not.exist');
                   })
                
             }
             signupwithoutemailfresher(){
                cy.fixture("validtestdata").then((data)=>{
                    this.siginupwithoutemailcommon(data.name,data.password,data.mobile);
                    cy.get(register.currentcitytxt).type(data.city);
                    cy.get(register.currentcityerrorlabel).should('not.exist');
                    this.uploadresumecommon(data.resumepath);
                    cy.get(register.uploadresumeerrorlabel).should('not.exist');
                   })
                 }
                 signupwithoutemailfresheroutside(){
                    cy.fixture("validtestdata").then((data)=>{
                        this.siginupwithoutemailcommon(data.name,data.password,data.mobile);
                        cy.get(register.fresherstatusbtn).click();
                        cy.get(register.outsideindiacheckbox).click();
                        cy.get(register.outsidecityindiatxt).type(data.city);
                        cy.get(register.currentcityerrorlabel).should('not.exist');
                        cy.get(register.currentcountrytxt).type(data.country+'{enter}');
                        this.uploadresumecommon(data.resumepath);
                        cy.get(register.uploadresumeerrorlabel).should('not.exist');
                       })
                     }

            signupWithoutResume(){
                cy.fixture("validtestdata").then((data)=>{
                    this.signupcommonValid(data.name,data.email,data.password,data.mobile);
                    cy.get(register.experiencestatusbtn).click();
                    cy.get(register.currentcitytxt).should('not.exist');
                    cy.get(register.registerbtn).click();
                    cy.get(homeelements.welcomename).should('have.text','Welcome');
                })
            }






            //  googlesignup(){
            //     cy.get(register.googlesigninbtn).click();
            //     cy.window().then((win) => {
            //         const childWindow = win. // Assuming the child window is the first opened window
            //         cy.wrap(childWindow).then((childWin) => {
            //           // Perform actions in the child window
            //         //   cy.wrap(childWin.document).find('#identifierId').type('farash.fmk@gmail.com');
            //         //   cy.wrap(childWin.document).find('#password').type('8606004779');
            //         //   cy.wrap(childWin.document).find('#signin-button').click(); // Click the sign-in button
            //         });
            //       });
            //  }


}