function Auth(req, res, next) {
    console.log("Auth middleware - Session user:", req.session.user);
    if (req.session.user != undefined) {
      next();
    } else {
      console.log("Auth middleware - No user session found, redirecting to login");
      res.render("login", {
        loggedOut: true,
        messages: req.flash()
      });
    }
  }
  
  export default Auth;
  