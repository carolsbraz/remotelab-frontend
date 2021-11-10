module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render("general/index")
    });
    app.get('/login', (req, res) => {
        res.render("general/login")
    });
    app.post('/usuario', (req, res) =>{
        res.render("general/usuario")
    });
}