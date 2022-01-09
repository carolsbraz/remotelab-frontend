module.exports = (app) => {

    //**********************ROTAS CLP****************************//
    
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

    app.get('/program', (req, res) =>{
        res.render("lab-fpga/program-fpga")
    });
    app.get('/clp-crud', (req, res) =>{
        res.render("lab-clp/clp-crud")
    });
    app.get('/cad-user', (req, res) =>{
        res.render("general/cad-user")
    });
    app.post('/clp-data', (req, res) =>{
        res.render("lab-clp/clp-data")
    });



    //**********************ROTAS FPGA****************************//

    app.get('/user-fpga', (req, res) =>{
        res.render("lab-fpga/user-fpga")
    });
    app.get('/Trail-intro-fpga', (req, res) =>{
        res.render("lab-fpga/Trail-intro-fpga")
    });
}
