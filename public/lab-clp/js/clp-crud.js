function listClp() {
    instance.get(`/plc/many`)
        .then((res) => {
            const clps = res.data
            var line = "";

            const list = document.getElementById("list-clp")

            list.innerHTML = ""

            clps.forEach(clp => { 
                
                const tr = document.createElement('tr');

                line = `<td>${clp.reference}</td><td>${clp.name}</td><td>${clp.version.release}</td><td><button onClick="edit(this)"> <img src="/general/img/icons/edit-icon.svg"> </button><button onClick="del(this)"><img src="/general/img/icons/delete-icon.svg"></button></td>`

                tr.innerHTML = line
                list.appendChild(tr);
            });

        })
        .catch((err) => {
            //handleError(err, "ERRO AO RESGATAR USUARIOS")
        });
}

listClp()

function del(botao) {
    console.log(botao.closest("tr"))
    var tableData = botao.closest("tr").getElementsByTagName("td")[0].innerText

    instance.delete(`/plc`, { params: { reference: tableData } })
        .then((res) => {
            listClp()
        })
        .catch((err) => {
            console.log("erro ao deletar", err)
        });
}

function edit(botao) {

    var reference = botao.closest("tr").getElementsByTagName("td")[0].innerText

    localStorage.setItem('reference',reference)

    window.location.href = "/clp-data";

}