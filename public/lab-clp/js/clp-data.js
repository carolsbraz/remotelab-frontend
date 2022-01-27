function carregaNome() {
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

function listClpDevices() {
    instance.get(`/plc`, { params: { reference: localStorage.getItem('reference') } })
        .then((res) => {

            const digIN = res.data.devices.input.digital
            const anaIN = res.data.devices.input.analog
            const digOUT = res.data.devices.output.digital
            const anaOUT = res.data.devices.output.analog

            var line = "";

            const list = document.getElementById("list-clp-devices")

            list.innerHTML = ""

            digIN.forEach(el => {
                const tr = document.createElement('tr');
                line = `<td>${el.port}</td><td>Entrada digital</td><td>${ el.model }</td><td><button onClick="del(this)"><img src="/general/img/icons/delete-icon.svg"></button></td>`
                tr.innerHTML = line
                list.appendChild(tr);
            });

            anaIN.forEach(el => {
                const tr = document.createElement('tr');
                line = `<td>${el.port}</td><td>Entrada analógica</td><td>${ el.model }</td><td><button onClick="del(this)"><img src="/general/img/icons/delete-icon.svg"></button></td>`
                tr.innerHTML = line
                list.appendChild(tr);
            });

            digOUT.forEach(el => {
                const tr = document.createElement('tr');
                line = `<td>${el.port}</td><td>Saída digital</td><td>${ el.model }</td><td><button onClick="del(this)"><img src="/general/img/icons/delete-icon.svg"></button></td>`
                tr.innerHTML = line
                list.appendChild(tr);
            });

            anaOUT.forEach(el => {
                const tr = document.createElement('tr');
                line = `<td>${el.port}</td><td>Saída analógica</td><td>${ el.model }</td><td><button onClick="del(this)"><img src="/general/img/icons/delete-icon.svg"></button></td>`
                tr.innerHTML = line
                list.appendChild(tr);
            });


        })
        .catch((err) => {
            //handleError(err, "ERRO AO RESGATAR USUARIOS")
        });
}

listClpDevices()

function getPorts(){
    instance.get(`/plc`, { params: { reference: localStorage.getItem('reference') } })
        .then((res) => {
            var digIN = res.data.version.input.digital
            var anaIN = res.data.version.input.analog

            var digOUT = res.data.version.output.digital
            var anaOUT = res.data.version.output.analog

            const listDigIN = document.getElementById("ports-device-dig-in")

            for (let index = 0; index < digIN; index++) {
                const option = document.createElement('option');
                option.setAttribute("value", index)
                line = index
                option.innerHTML = line
                listDigIN.appendChild(option);
            }

            const listAnaIN = document.getElementById("ports-device-ana-in")

            for (let index = 0; index < anaIN; index++) {
                const option = document.createElement('option');
                option.setAttribute("value", index)
                line = index
                option.innerHTML = line
                listAnaIN.appendChild(option);
            }

            const listDigOut = document.getElementById("ports-device-dig-out")

            for (let index = 0; index < digOUT; index++) {
                const option = document.createElement('option');
                option.setAttribute("value", index)
                line = index
                option.innerHTML = line
                listDigOut.appendChild(option);
            }

            const listAnaOut = document.getElementById("ports-device-ana-out")

            for (let index = 0; index < anaOUT; index++) {
                const option = document.createElement('option');
                option.setAttribute("value", index)
                line = index
                option.innerHTML = line
                listAnaOut.appendChild(option);
            }

        }).catch((err) => { err });
}

getPorts()

const formCadDevice = document.getElementById('cad-clp-device');

function formSubmit(e) {
    e.preventDefault();

    if(formCadDevice.type.value == "in-digital"){
        let device = { model: formCadDevice.model.value, port: formCadDevice.indig.value };
   
        instance.post(`/plc/devices/input/digital`, device, { params: { reference: localStorage.getItem('reference') } })
            .then((res) => {
                window.location.href = "#fechar";
                listClpDevices()
    
            }).catch((err) => { console.log(err, "ERRO NO LOGIN") });
    }
    if(formCadDevice.type.value == "in-analog"){
        let device = { model: formCadDevice.model.value, port: formCadDevice.inana.value };
   
        instance.post(`/plc/devices/input/analog`, device, { params: { reference: localStorage.getItem('reference') } })
            .then((res) => {
                window.location.href = "#fechar";
                listClpDevices()
    
            }).catch((err) => { console.log(err, "ERRO NO LOGIN") });
    }
    if(formCadDevice.type.value == "out-digital"){
        let device = { model: formCadDevice.model.value, port: formCadDevice.outdig.value };
   
        instance.post(`/plc/devices/output/digital`, device, { params: { reference: localStorage.getItem('reference') } })
            .then((res) => {
                window.location.href = "#fechar";
                listClpDevices()
    
            }).catch((err) => { console.log(err, "ERRO NO LOGIN") });
    }
    if(formCadDevice.type.value == "out-analog"){
        let device = { model: formCadDevice.model.value, port: formCadDevice.outana.value };
   
        instance.post(`/plc/devices/output/analog`, device, { params: { reference: localStorage.getItem('reference') } })
            .then((res) => {
                window.location.href = "#fechar";
                listClpDevices()
    
            }).catch((err) => { console.log(err, "ERRO NO LOGIN") });
    }

}

formCadDevice.addEventListener('submit', formSubmit);

function del(botao) {
    
    var port = botao.closest("tr").getElementsByTagName("td")[0].innerText
    var type = botao.closest("tr").getElementsByTagName("td")[1].innerText

    if(type == "Entrada digital"){
        instance.delete(`/plc/devices/input/digital`, { params: { reference: localStorage.getItem('reference'), ports: port } })
        .then((res) => {
            listClpDevices()
        })
        .catch((err) => {
            console.log("erro ao deletar", err)
        });
    }
    if(type == "Entrada analógica"){
        instance.delete(`/plc/devices/input/analog`, { params: { reference: localStorage.getItem('reference'), ports: port } })
        .then((res) => {
            listClpDevices()
        })
        .catch((err) => {
            console.log("erro ao deletar", err)
        });
    }
    if(type == "Saída digital"){
        instance.delete(`/plc/devices/output/digital`, { params: { reference: localStorage.getItem('reference'), ports: port } })
        .then((res) => {
            listClpDevices()
        })
        .catch((err) => {
            console.log("erro ao deletar", err)
        });
    }
    if(type == "Saída analógica"){
        instance.delete(`/plc/devices/output/analog`, { params: { reference: localStorage.getItem('reference'), ports: port } })
        .then((res) => {
            listClpDevices()
        })
        .catch((err) => {
            console.log("erro ao deletar", err)
        });
    }
    
}