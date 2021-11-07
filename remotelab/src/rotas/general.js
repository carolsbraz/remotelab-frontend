module.exports = (app) => {
    app.use('/', (req, res) => {
        res.sendFile("index.html", {root: './src/views/general'} )
    });
}