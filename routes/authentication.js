const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;
const adminData = require("../data/adminCollection");

router
  .route('/login')
  .get(async (req, res) => {
    //code here for GET
    if(req.session.user) res.redirect("/");
    res.render('login', {title: 'Login'});
  })
  .post(async (req, res) => {
    //code here for POST
    const userPostData = req.body;
    try {
    //   let usernameInput = await helpers.isValidUsername(userPostData.usernameInput);
    //   let passwordInput = await helpers.isValidPassword(userPostData.passwordInput);
    //   usernameInput = usernameInput.trim().toLowerCase();
    //   passwordInput = passwordInput.trim();
        let email = userPostData.email.trim();
        let password = userPostData.password;
      const newUser = await userData.checkUser(email, password);
      if(newUser.authenticatedUser !== true) throw 'User cannot be authenticated.';
      req.session.user = {email : email};
      res.redirect("/");
    }
    catch (e) {      
        res.status(400).render('login',{title: 'Login', error : e, hasErrors: true});           
    }
  })

router
    .route('/register')
    .get(async (req, res) => {
    //code here for GET
    if(req.session.user) res.redirect('/');
    res.render('register', {title: 'Register'});
})
.post(async (req, res) => {
    //code here for POST
    const userPostData = req.body;
    try {
    //   let usernameInput = await helpers.isValidUsername(userPostData.usernameInput);
    //   let passwordInput = await helpers.isValidPassword(userPostData.passwordInput);
    //   usernameInput = usernameInput.trim().toLowerCase();
    //   passwordInput = passwordInput.trim();
        let firstName = userPostData.firstName.trim().toLowerCase();
        let lastName = userPostData.lastName.trim();
        let email = userPostData.email.trim();
        let password = userPostData.password;
        let confirmPassword = userPostData.confirmPassword;
        if(password != confirmPassword) throw 'Password does not match.'; 
        const newUser = await userData.createUsers(firstName,lastName,email,password,confirmPassword);
        if(!newUser.insertedUser) throw 'User cannot be created.';
        res.redirect('/login');
    }
    catch (e) {
      if(e == 'Could not add user data.')
      {
        res.status(500).render('register', {title: 'Register', error : 'Internal Server Error', hasErrors: true})
      }
      else{
        res.status(400).render('register',{title: 'Register', error : e, hasErrors: true});
      }
      
    }
  });

  router
  .route('/logout')
  .get(async (req, res) => {
    //code here for GET
    if(!req.session.user) 
    {
      res.redirect('/');
    }
    else{
      let user = req.session.user.email;
      req.session.destroy();
      res.redirect('/');
    }
  });

router.route('/adminlogin').get(async (req, res) => {
    //code here for GET
    if(req.session.admin){
      res.redirect('/admin');
    } 
    // console.log("here");
    res.render('adminLogin', {title: 'Admin Login'});
  }).post(async (req, res) => {
    //code here for POST
    const adminPostData = req.body;
    try {
    //   let usernameInput = await helpers.isValidUsername(userPostData.usernameInput);
    //   let passwordInput = await helpers.isValidPassword(userPostData.passwordInput);
    //   usernameInput = usernameInput.trim().toLowerCase();
    //   passwordInput = passwordInput.trim();
        let email = adminPostData.email.trim();
        let password = adminPostData.password;
      const newAdmin = await adminData.checkAdmin(email, password);
      if(newAdmin.authenticatedAdmin !== true) throw 'Admin cannot be authenticated.';
      req.session.admin = {email : email};
      res.redirect('/admin');
    }
    catch (e) {      
        res.status(400).render('adminLogin',{title: 'Admin Login', error : e, hasErrors: true});           
    }
  });

  router.route('/adminlogout').get(async (req, res) => {
    //code here for GET
    if(!req.session.admin) 
    {
      res.redirect('/adminlogin');
    }
    else{
      //let user = req.session.user.email;
      req.session.destroy();
      res.redirect('/adminlogin');
    }
  });

  module.exports = router;