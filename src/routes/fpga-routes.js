module.exports = (app) => {

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
