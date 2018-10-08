const api = require('./api');
const bp = require('body-parser');
// const session = require('express-session');
// const flash = require('express-flash');

module.exports = function(app){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(bp.urlencoded({extended:true}));
    // app.use(session({
    //     secret: 'blackcoffee',
    //     resave: false,
    //     saveUninitialized: true,
    //     cookie: { maxAge: 60000 }
    //   }))
    // app.use(flash());

// render routes
    app.get('/', api.index)
    app.get('/obj/new', api.new)
    app.get('/obj/edit/:id', api.edit)
    app.get('/obj/:id', api.show)
    
// operations    
    app.post('/obj', api.createObj)
    app.post('/obj/destroy/:id', api.destroy)
    app.post('/obj/:id', api.editObj)


    return app;
}