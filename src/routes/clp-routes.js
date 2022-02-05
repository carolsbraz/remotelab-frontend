module.exports = (app) => {
    
    app.get('/user-clp', (req, res) =>{
        res.render("lab-clp/user-clp")
    });

    app.get('/clp-crud', (req, res) =>{
        res.render("lab-clp/clp-crud")
    });
    
    app.get('/clp-data', (req, res) =>{
        res.render("lab-clp/clp-data")
    });

    app.get('/new-clp-version', (req, res) =>{
        res.render("lab-clp/new-clp-version")
    });

    app.get('/clp-diagram', (req, res) =>{
        res.render("lab-clp/diagram")
    });
}
