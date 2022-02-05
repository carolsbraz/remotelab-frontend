module.exports = (app) => {

    app.get('/', (req, res) => {
        res.render("general/index")
    });

    app.get('/login', (req, res) => {
        res.render("general/login")
    });
    
    app.get('/user', (req, res) =>{
        res.render("general/user")
    });

    app.get('/crud-user', (req, res) =>{
        res.render("general/crud-user")
    });
}
