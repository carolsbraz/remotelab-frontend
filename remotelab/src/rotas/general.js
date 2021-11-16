module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render("general/index")
    });
    app.get('/login', (req, res) => {
        res.render("general/login")
    });
    app.post('/user', (req, res) =>{
        res.render("general/user")
    });
    app.get('/user-clp', (req, res) =>{
        res.render("lab-clp/user-clp")
    });
}