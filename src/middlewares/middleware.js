exports.middlewareGlobal =(req,res, next)=>{
    res.locals.umaVariaveLocal = 'É uma variavel local'
    next();

};

exports.checkCsrfError = (err, req, res, next) => {
    if(err) {
      return res.render('404');
    }
  
    next();
  };

exports.csrfMiddleware = (req,res,next) =>{
    res.locals.csrfToken = req.csrfToken();
    next();
};