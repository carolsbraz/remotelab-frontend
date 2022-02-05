var version = {}

function listClpVersion() {
    instance.get(`/plc/version/many`)
        .then((res) => {
            const versions = res.data
            var line = "";

            const list = document.getElementById("list-clp-version")

            list.innerHTML = ""

            versions.forEach(version => {

                const tr = document.createElement('tr');

                line = `<td>${version.release}</td><td>${version.input.digital}</td><td>${version.input.analog}</td><td>${version.output.digital}</td><td>${version.output.analog}</td><td>${version.createdAt}</td><td><button onClick="edit(this)"> <img src="/general/img/icons/edit-icon.svg"> </button><button onClick="del(this)"><img src="/general/img/icons/delete-icon.svg"></button></td>`

                tr.innerHTML = line

                console.log(tr)

                list.appendChild(tr);

                console.log(list)

            });

        })
        .catch((err) => {
            //handleError(err, "ERRO AO RESGATAR USUARIOS")
        });
}

listClpVersion()

const formCad = document.getElementById('cad-clp-version');

function formSubmit(e) {
    e.preventDefault();

    let version = { release: formCad.release.value, input:{digital: formCad.inDig.value, analog: formCad.inAna.value}, output:{digital: formCad.outDig.value, analog: formCad.outAna.value} };
   
    instance.post(`/plc/version`, version)
        .then((res) => {
            window.location.href = "#fechar";
            listClpVersion()

        }).catch((err) => { handleError(err, "ERRO NO LOGIN") });
}

formCad.addEventListener('submit', formSubmit);

function del(botao) {
    console.log(botao.closest("tr"))
    var tableData = botao.closest("tr").getElementsByTagName("td")[0].innerText

    instance.delete(`/plc/version`, { params: { release: tableData } })
        .then((res) => {
            listClpVersion()
        })
        .catch((err) => {
            console.log("erro ao deletar", err)
        });
}

function edit(botao) {

    var tableData = botao.closest("tr").getElementsByTagName("td")[0].innerText

    instance.get(`/plc/version`, { params: { release: tableData} })
        .then((res) => {

            version = res.data

            console.log(version)


            document.getElementById("releaseUp").value = version.release
            
            document.getElementById("inDigUp").value = version.input.digital
            document.getElementById("inAnaUp").value = version.input.analog
            document.getElementById("outDigUp").value = version.output.digital
            document.getElementById("outAnaUp").value = version.output.analog

            window.location.href = "#abrirModalUpdateClpVersion";

        })
        .catch((err) => {
            console.log(err, "ERRO AO RESGATAR CLP")
        });
}

const formUpdate = document.getElementById('update-clp-version');

function update(e) {
    e.preventDefault();
    let version = { release: formUpdate.release.value, input:{digital: formUpdate.inDig.value, analog: formUpdate.inAna.value}, output:{digital: formUpdate.outDig.value, analog: formUpdate.outAna.value} };
    instance.put(`/plc/version`, version, { params: { release: version.release } })
        .then((res) => {
            window.location.href = "#fechar";
            listClpVersion()
        }).catch((err) => { console.log(err, "ERRO NA ATUALIZAÇÃO") });
}

formUpdate.addEventListener('submit', update);