function read() {
    instance.get(`/user/`)
        .then((res) => {
            //handleSuccess(res, "RESGATE DE USUARIOS BEM SUCEDIDO");
        })
        .catch((err) => { 
            //handleError(err, "ERRO AO RESGATAR USUARIOS")
        });
}

function del() {
    console.log("oi")
}