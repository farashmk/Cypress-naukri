const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl:'https://www.naukri.com/',
    chromeWebSecurity:false,
    env:{
      registration_end_point:'registration/createAccount?othersrcp=22636',
      login_end_point:'nlogin/login',
      username:'farazabida@gmail.com',
      password:'7996063603'
      // fullname:'',
      // email:'',
      // password:'',
      // mobile:'',
      // currentcity:'',
      // currentcountry:'',
      // resumepath:'',
    }
  },
});
