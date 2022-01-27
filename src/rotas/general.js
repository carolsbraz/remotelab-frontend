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

    //**********************ROTAS CLP****************************//
    
    app.get('/user-clp', (req, res) =>{
        res.render("lab-clp/user-clp")
    });

    
    app.get('/clp-crud', (req, res) =>{
        res.render("lab-clp/clp-crud")
    });
    app.get('/cad-user', (req, res) =>{
        res.render("general/cad-user")
    });
    app.get('/clp-data', (req, res) =>{
        res.render("lab-clp/clp-data")
    });

    app.get('/new-clp-version', (req, res) =>{
        res.render("lab-clp/new-clp-version")
    });

    //**********************ROTAS FPGA****************************//

    app.get('/program', (req, res) =>{
        res.render("lab-fpga/program-fpga")
    });
    app.get('/user-fpga', (req, res) =>{
        res.render("lab-fpga/user-fpga")
    });
    app.get('/Trail-intro-fpga', (req, res) =>{
        res.render("lab-fpga/Trail-intro-fpga")
    });
}
