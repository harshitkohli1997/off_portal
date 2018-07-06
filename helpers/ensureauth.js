module.exports = {
    ensureAuthenticated: function(req, res, next){
      if(req.isAuthenticated()){ // isAutenticated is inbuilt function
        return next();
      }
      req.flash('error_msg', 'Not Authorized');
      res.redirect('/user/login');
    }
  }