const IsAuth = (req, res, next)=>{
    if(req.isAuthenticated()){
        next()
    }else{
        res.render("login", {
            message: "Welcome!.Login to continue."
        })
    }
}

const isAdmin = (req, res, next)=>{
    if(req.isAuthenticated()){
        const user = req.user
        if(user.role == "admin"){
            next()
        }
        else{
            return res.redirect("/home")
    }
    }else{
        res.render("login", {
            message: "Login to continue"
        })
    } 
}

const redirectLoggedInUser = (req, res, next)=>{
    if (req.session.user) {
        return res.redirect('/home');
      }

      next();
}

const checkUserRole = (req, res, next)=>{
    if (req.isAuthenticated()) {
      if (req.user.role === 'admin') {
        return res.redirect('/users');
      }
    }
    next();
  }

module.exports = {
    IsAuth,
    isAdmin,
    redirectLoggedInUser,
    checkUserRole
}