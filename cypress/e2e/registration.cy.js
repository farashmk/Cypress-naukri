import { signUp } from "../pageObject/signUp";

const Todo = new signUp();

describe("template spec", () => {
  it("visibilty of all element in experience Register Page", () => {
    Todo.signUpNavigation();
    Todo.signupelementvisibility();
  });
  it("visibility of all elements in fresher page", () => {
    Todo.signUpNavigation();
    Todo.signupelementvisibiltyfresher();
  });
  it("visibility of all element in fresher outside india", () => {
    Todo.signUpNavigation();
    Todo.signupelementvisibilityfresheroutside();
  });
  it("ValidDataTestForExperience", () => {
    Todo.signUpNavigation();
    Todo.signupforexperience();
  });
  it("ValidDataTestForFresherIndia", () => {
    Todo.signUpNavigation();
    Todo.signupfresherindia();
  });
  it("validTestForOutsideIndia", () => {
    Todo.signUpNavigation();
    Todo.signupfresheroutsideindia();
  });
  it("InvalidTestBlankFill", () => {
    Todo.signUpNavigation();
    Todo.signupFillingBlank();
  });
  it("validsignupWithoutResume", () => {
    Todo.signUpNavigation();
  });
  it("InvalidDataTestForExperience", () => {
    Todo.signUpNavigation();
    Todo.signUpexperienceInvalidData();
  });
  it("invalidsignupfresher", () => {
    Todo.signUpNavigation();
    Todo.signupfresherindiainvaliddata();
  });
  it("invalidsignupfresheroutside", () => {
    Todo.signUpNavigation();
    Todo.signupfresheroutsideindiaInvalidData();
  });
  it("invalidTestEmailExisted", () => {
    Todo.signUpNavigation();
    Todo.signupemailexisted();
  });

  it("signupwithoutemailexperience", () => {
    Todo.signUpNavigation();
    Todo.signupwithoutemailexperience();
  });
  it("signupwithoutemailfresher", () => {
    Todo.signUpNavigation();
    Todo.signupwithoutemailfresher();
  });
  it("signupwithoutemailfresheroutsideindia", () => {
    Todo.signUpNavigation();
    Todo.signupwithoutemailfresheroutside();
  });
});
