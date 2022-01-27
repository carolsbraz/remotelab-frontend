function carregaNome(){
    instance.get(`/plc`, { params: { reference: localStorage.getItem('reference') } })
    .then((res) => {
        
        document.getElementById("txt-nome-clp").value = res.data.name
        console.log(document.getElementById("txt-nome-clp").value)

    })
    .catch((err) => {
        console.log("erro ao deletar", err)
    });
}

carregaNome()

const formName = document.getElementById('update-clp-name');

function update(e) {
    e.preventDefault();
    let name = { name: formName.name.value };
    console.log(name)
    instance.put(`/plc`, name, { params: { reference: localStorage.getItem('reference') } })
        .then((res) => {
            console.log("ATUALIZADO");
        }).catch((err) => { err });
}

formName.addEventListener('submit', update);