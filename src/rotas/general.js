module.exports = (app) => {
    const url = "http://34.95.137.51:3333"

    const axios = require('axios');

    const instance = axios.create({
        withCredentials: true,
        baseURL: url
     })
    
    app.get('/', (req, res) => {
        res.render("general/index")
    });
    app.get('/login', (req, res) => {
        res.render("general/login")
        
    });
    app.post('/login-user', (req, res) => {
        
    });
    app.post('/user', (req, res) =>{
        res.render("general/user")
    });
    app.get('/user-clp', (req, res) =>{
        res.render("lab-clp/user-clp")
    });
    app.get('/clp-crud', (req, res) =>{
        res.render("lab-clp/clp-crud")
    });
    app.get('/cad-user', (req, res) =>{
                res.render('general/cad-user', { users: 
                    "", logged: "" } );
                
    });

    app.post('/cad-new-user', (req, res) => {
        console.log('New user');
        const user = {
            "name": req.body.name,
            "username": req.body.username,
            "email": req.body.email,
            "password": req.body.password,
            "role": req.body.role
        };
        axios.post(`${url}/user/`, user, {
            headers: {
                "Content-Type": "application/json"        
            }
        }).then((response) => {
            axios.get(`${url}/user/session/`).then((logged) => {
                
                console.log("logado", logged.data)

                axios.get(`${url}/user/`).then((response) => {
                    res.render('general/cad-user', { users: response.data, logged: logged.data } );
                    //console.log(response.data, logged.data)
                }).catch((err) => {
                    res.send({ status: err });
                });;

            }).catch((err) => {
                res.send({ status: err });
            });;
            
            
        }).catch((err) => {
            console.log('failed create', err);
            res.send({ status: err });
        });
    });
    app.get('/clp-data', (req, res) =>{
        res.render("lab-clp/clp-data")
    });                                                                                                                          
    app.post('/delete-user', ()=>{
        console.log("hi")
        console.log(req.id)
        axios.delete(`${url}/user/${req.body.id}`).then((response) => {
            
            console.log(response.data)
        }).catch((err) => {
            res.send({ status: err });
        });
    });
    app.get('/user-fpga', (req, res) => {
        res.render("lab-fpga/user-fpga")
    });
    app.get('/Trail-intro-fpga', (req, res) => {
        res.render("lab-fpga/Trail-intro-fpga")
    });
    
}