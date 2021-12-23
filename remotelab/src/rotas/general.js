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
    app.get('/user-fpga', (req, res) => {
        res.render("lab-fpga/user-fpga")
    });
    app.get('/Trail-intro-fpga', (req, res) => {
        res.render("lab-fpga/Trail-intro-fpga")
    });
}