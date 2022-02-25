var divsNum = 1;
var divsNumOut = 1;

var idDigIn = 0;
var idAnaIn = 0;
var idDigOut = 0;
var idAnaOut = 0;

let send = {
    "qtVars": 0,
    "devVars": {

    }
}

var vars = []

function criarSlider(divNum) {
    var mergingTooltipSlider = document.getElementById('merging-tooltips');

    const selects = document.getElementById('valores')
    selects.innerHTML = ''

    var divs = []
    var tooltips = []
    var inicio = 0;
    if (divNum == 1) {
        inicio = 250
    } else {
        inicio = 500 / (divNum + 1)
    }

    var marcador = inicio

    for (let index = 0; index < divNum; index++) {
        divs.push(inicio)
        tooltips.push(true)
        inicio += marcador

        criarSelect(index)
    }
    criarSelect(divNum)
    noUiSlider.create(mergingTooltipSlider, {
        start: divs,
        tooltips: tooltips,
        step: 1,
        range: {
            'min': 0,
            'max': 500
        }
    });



    mergeTooltips(mergingTooltipSlider, 15, ' - ');
}

function criarSliderOut(divNum) {
    var mergingTooltipSlider = document.getElementById('merging-tooltips-out');

    const selects = document.getElementById('valores-out')
    selects.innerHTML = ''

    var divs = []
    var tooltips = []
    var inicio = 0;
    if (divNum == 1) {
        inicio = 250
    } else {
        inicio = 500 / (divNum + 1)
    }

    var marcador = inicio

    for (let index = 0; index < divNum; index++) {
        divs.push(inicio)
        tooltips.push(true)
        inicio += marcador

        criarSelectOut(index)
    }
    criarSelectOut(divNum)
    noUiSlider.create(mergingTooltipSlider, {
        start: divs,
        tooltips: tooltips,
        step: 1,
        range: {
            'min': 0,
            'max': 500
        }
    });



    mergeTooltips(mergingTooltipSlider, 15, ' - ');
}

criarSlider(divsNum)

criarSliderOut(divsNumOut)

function criarSelect(number) {
    const select = document.createElement('select');
    select.setAttribute("name", `var-ana-value-${number}`)
    select.setAttribute("id", `var-ana-value-${number}`)

    const option0 = document.createElement('option');
    option0.setAttribute("value", `0`)
    option0.innerHTML = "0"

    const option1 = document.createElement('option');
    option1.setAttribute("value", `1`)
    option1.innerHTML = "1"

    select.appendChild(option0)
    select.appendChild(option1)

    const selects = document.getElementById('valores')
    selects.appendChild(select)
}

function criarSelectOut(number) {
    const select = document.createElement('select');
    select.setAttribute("name", `var-ana-out-value-${number}`)
    select.setAttribute("id", `var-ana-out-value-${number}`)

    const option0 = document.createElement('option');
    option0.setAttribute("value", `0`)
    option0.innerHTML = "0"

    const option1 = document.createElement('option');
    option1.setAttribute("value", `1`)
    option1.innerHTML = "1"

    select.appendChild(option0)
    select.appendChild(option1)

    const selects = document.getElementById('valores-out')
    selects.appendChild(select)
}

function addDiv() {
    var mergingTooltipSlider = document.getElementById('merging-tooltips');
    mergingTooltipSlider.noUiSlider.destroy()
    divsNum++
    criarSlider(divsNum)
    recarregaClickHandle()
}
function removeDiv() {
    if (divsNum > 1) {
        var mergingTooltipSlider = document.getElementById('merging-tooltips');
        mergingTooltipSlider.noUiSlider.destroy()
        divsNum--
        criarSlider(divsNum)
    }
}

function addDivOut() {
    var mergingTooltipSlider = document.getElementById('merging-tooltips-out');
    mergingTooltipSlider.noUiSlider.destroy()
    divsNumOut++
    criarSliderOut(divsNumOut)
    recarregaClickHandle()
}
function removeDivOut() {
    if (divsNum > 1) {
        var mergingTooltipSlider = document.getElementById('merging-tooltips-out');
        mergingTooltipSlider.noUiSlider.destroy()
        divsNumOut--
        criarSliderOut(divsNumOut)
    }
}

/**
 * @param slider HtmlElement with an initialized slider
 * @param threshold Minimum proximity (in percentages) to merge tooltips
 * @param separator String joining tooltips
 */
function mergeTooltips(slider, threshold, separator) {

    var textIsRtl = getComputedStyle(slider).direction === 'rtl';
    var isRtl = slider.noUiSlider.options.direction === 'rtl';
    var isVertical = slider.noUiSlider.options.orientation === 'vertical';
    var tooltips = slider.noUiSlider.getTooltips();
    var origins = slider.noUiSlider.getOrigins();

    // Move tooltips into the origin element. The default stylesheet handles this.
    tooltips.forEach(function (tooltip, index) {
        if (tooltip) {
            origins[index].appendChild(tooltip);
        }
    });

    slider.noUiSlider.on('update', function (values, handle, unencoded, tap, positions) {

        var pools = [[]];
        var poolPositions = [[]];
        var poolValues = [[]];
        var atPool = 0;

        // Assign the first tooltip to the first pool, if the tooltip is configured
        if (tooltips[0]) {
            pools[0][0] = 0;
            poolPositions[0][0] = positions[0];
            poolValues[0][0] = values[0];
        }

        for (var i = 1; i < positions.length; i++) {
            if (!tooltips[i] || (positions[i] - positions[i - 1]) > threshold) {
                atPool++;
                pools[atPool] = [];
                poolValues[atPool] = [];
                poolPositions[atPool] = [];
            }

            if (tooltips[i]) {
                pools[atPool].push(i);
                poolValues[atPool].push(values[i]);
                poolPositions[atPool].push(positions[i]);
            }
        }

        pools.forEach(function (pool, poolIndex) {
            var handlesInPool = pool.length;

            for (var j = 0; j < handlesInPool; j++) {
                var handleNumber = pool[j];

                if (j === handlesInPool - 1) {
                    var offset = 0;

                    poolPositions[poolIndex].forEach(function (value) {
                        offset += 1000 - value;
                    });

                    var direction = isVertical ? 'bottom' : 'right';
                    var last = isRtl ? 0 : handlesInPool - 1;
                    var lastOffset = 1000 - poolPositions[poolIndex][last];
                    offset = (textIsRtl && !isVertical ? 100 : 0) + (offset / handlesInPool) - lastOffset;

                    // Center this tooltip over the affected handles
                    tooltips[handleNumber].innerHTML = poolValues[poolIndex].join(separator);
                    tooltips[handleNumber].style.display = 'block';
                    tooltips[handleNumber].style[direction] = offset + '%';
                } else {
                    // Hide this tooltip
                    tooltips[handleNumber].style.display = 'none';
                }
            }
        });
    });
}


function listClp() {
    instance.get(`/plc/many`)
        .then((res) => {
            const clps = res.data
            var line = "";

            const list = document.getElementById("list-clps")

            list.innerHTML = ""

            var selected = localStorage.getItem("reference");

            clps.forEach(clp => {

                const radio = document.createElement('input');
                radio.setAttribute("type", "radio")
                radio.setAttribute("name", "choosen-clp")
                radio.setAttribute("id", "choosen-clp")
                radio.setAttribute("value", clp.reference)

                if (clp.reference == selected) {
                    radio.checked = true;
                }

                const span = document.createElement('span');

                line = `Referência: ${clp.reference} | Nome: ${clp.name}`

                const br = document.createElement('br');

                span.innerHTML = line

                list.appendChild(radio)
                list.appendChild(span)
                list.appendChild(br)
            });
        })
        .catch((err) => {
            console.log("ERRO AO BUSCAR CLPS", err)
        });

}

const btnListCLP = document.getElementById('btn-list-clp')

btnListCLP.addEventListener('click', () => {
    listClp()
})

function chooseCLP() {
    var clp = document.querySelector('input[name=choosen-clp]:checked').value
    localStorage.setItem("reference", clp);
    window.location.href = "#fechar";
}

const selectType = document.getElementById('var-type')

selectType.addEventListener('change', () => {
    const typeVar = selectType.value

    const divIntern = document.getElementById("intern-var")
    const divInDig = document.getElementById("in-dig-var")
    const divInAna = document.getElementById("in-ana-var")
    const divOutDig = document.getElementById("out-dig-var")
    const divOutAna = document.getElementById("out-ana-var")

    if (typeVar == "INTERN") {
        divIntern.style.display = "inline"
        divInDig.style.display = "none"
        divInAna.style.display = "none"
        divOutDig.style.display = "none"
        divOutAna.style.display = "none"
    }
    if (typeVar == "IN-DIG") {
        divIntern.style.display = "none"
        divInDig.style.display = "inline"
        divInAna.style.display = "none"
        divOutDig.style.display = "none"
        divOutAna.style.display = "none"
    }
    if (typeVar == "IN-ANA") {
        divIntern.style.display = "none"
        divInDig.style.display = "none"
        divInAna.style.display = "inline"
        divOutDig.style.display = "none"
        divOutAna.style.display = "none"
    }
    if (typeVar == "OUT-DIG") {
        divIntern.style.display = "none"
        divInDig.style.display = "none"
        divInAna.style.display = "none"
        divOutDig.style.display = "inline"
        divOutAna.style.display = "none"
    }
    if (typeVar == "OUT-ANA") {
        divIntern.style.display = "none"
        divInDig.style.display = "none"
        divInAna.style.display = "none"
        divOutDig.style.display = "none"
        divOutAna.style.display = "inline"
    }
})

function preencherDispositivos() {
    instance.get(`/plc`, { params: { reference: localStorage.getItem('reference') } })
        .then((res) => {

            const digIN = res.data.devices.input.digital
            const anaIN = res.data.devices.input.analog
            const digOUT = res.data.devices.output.digital
            const anaOUT = res.data.devices.output.analog


            const selectInDig = document.getElementById('disp-model-in-dig');
            const selectInAna = document.getElementById('disp-model-in-ana');
            const selectOutDig = document.getElementById('disp-model-out-dig');
            const selectOutAna = document.getElementById('disp-model-out-ana');

            digIN.forEach(el => {
                const option = document.createElement('option');
                option.setAttribute('value', `${el.port}`)
                option.innerHTML = `PORTA: ${el.port} | MODELO: ${el.model}`

                selectInDig.appendChild(option)
            });

            anaIN.forEach(el => {
                const option = document.createElement('option');
                option.setAttribute('value', `${el.port}`)
                option.innerHTML = `PORTA: ${el.port} | MODELO: ${el.model}`
                selectInAna.appendChild(option)
            });

            digOUT.forEach(el => {
                const option = document.createElement('option');
                option.setAttribute('value', `${el.port}`)
                option.innerHTML = `PORTA: ${el.port} | MODELO: ${el.model}`
                selectOutDig.appendChild(option)
            });

            anaOUT.forEach(el => {
                const option = document.createElement('option');
                option.setAttribute('value', `${el.port}`)
                option.innerHTML = `PORTA: ${el.port} | MODELO: ${el.model}`
                selectOutAna.appendChild(option)
            });


        })
        .catch((err) => {
            //handleError(err, "ERRO AO RESGATAR USUARIOS")
        });
}

preencherDispositivos()

// criar ramos no objeto

function createIn(vari) {
    vari.devVars["input"] = {}
}

function createOut(vari) {
    vari.devVars.output = {}
}

function createDigIn(vari) {
    vari.devVars.input.digital = []
}

function createAnaIn(vari) {
    vari.devVars.input.analog = []
}

function createDigOut(vari) {
    vari.devVars.output.digital = []
}

function createAnaOut(vari) {
    vari.devVars.output.analog = []
}

// inserir variáveis

function addDigIn(vari) {
    const port = document.getElementById('disp-model-in-dig').value
    const dataVar = { 'id': send.qtVars, "port": port }
    vari.devVars.input["digital"].push(dataVar)

    var nome = document.getElementById('var-name').value

    vars.push([send.qtVars, nome, "IN DIG"])

    listarVars()

    send.qtVars += 1;


}

function addAnaIn(vari) {

    const port = document.getElementById('disp-model-in-ana').value
    const dataVar = { 'id': send.qtVars, "port": port }

    dataVar.extras = {}

    dataVar.extras.divs = []

    const divs = document.querySelectorAll('.noUi-tooltip')

    console.log(divs)

    var contador = 0


    divs.forEach(div => {

        if (contador < divsNum) {

            dataVar.extras.divs.push(parseInt(div.innerText))

            contador++
        }

    })



    const selects = document.querySelectorAll('#valores select')

    var zonesSelec = ""

    selects.forEach(select => {

        zonesSelec += `${select.value}`

    })

    dataVar.extras.zones = zonesSelec

    // dominancias

    var domi = ""

    const handles = document.querySelectorAll('.noUi-handle')

    var cont = 0


    handles.forEach(handle => {

        if (cont < divsNum) {

            if (handle.classList.contains('noUi-handle-invert')) {
                domi += "0"
            } else {
                domi += "1"
            }
            cont++
        }
    });

    dataVar.extras.dominances = domi

    console.log(vari)



    vari.devVars.input.analog.push(dataVar)



    var nome = document.getElementById('var-name').value

    vars.push([send.qtVars, nome, "IN ANA"])

    listarVars()

    send.qtVars += 1;
}

function addDigOut(vari) {

    const port = document.getElementById('disp-model-out-dig').value
    const dataVar = { 'id': send.qtVars, "port": port }
    vari.devVars.output.digital.push(dataVar)

    var nome = document.getElementById('var-name').value

    vars.push([send.qtVars, nome, "OUT DIG"])

    listarVars()

    send.qtVars += 1;
}

function addAnaOut(vari) {

    const port = document.getElementById('disp-model-out-ana').value
    const dataVar = { 'id': send.qtVars, "port": port }
    vari.devVars.output.digital.push(dataVar)

    var nome = document.getElementById('var-name').value

    vars.push([send.qtVars, nome, "OUT ANA"])

    listarVars()

    send.qtVars += 1;
}

// funcao adicionar variavel

function addVar() {
    const typeVar = document.getElementById('var-type').value

    if (typeVar == "IN-DIG") {
        try {
            addDigIn(send)
        } catch (error) {
            try {
                createDigIn(send)
                addDigIn(send)
            } catch (error) {
                createIn(send)
                createDigIn(send)
                addDigIn(send)
            }
        }
        console.log(send)
    } else if (typeVar == "IN-ANA") {
        try {
            addAnaIn(send)
        } catch (error) {
            try {
                createAnaIn(send)
                addAnaIn(send)
            } catch (error) {
                try {
                    addAnaIn(send)
                } catch (error) {
                    createIn(send)
                    createAnaIn(send)
                    addAnaIn(send)
                }
            }


        }
        console.log(send)
    } else if (typeVar == "OUT-DIG") {
        try {
            addDigOut(send)
        } catch (error) {
            try {
                createDigOut(send)
                addDigOut(send)
            } catch (error) {
                try {
                    addDigOut(send)
                } catch (error) {
                    createOut(send)
                    createDigOut(send)
                    addDigOut(send)
                }
            }


        }
        console.log(send)
    } else if (typeVar == "OUT-ANA") {
        try {
            addAnaOut(send)
        } catch (error) {
            try {
                createDigOut(send)
                addAnaOut(send)
            } catch (error) {
                try {
                    addAnaOut(send)
                } catch (error) {
                    createOut(send)
                    createAnaOut(send)
                    addAnaOut(send)
                }
            }


        }
        console.log(send)
    }
    updateSelects()
}

const drag = document.querySelectorAll('div.blocks')
console.log(drag)

drag.forEach(block => {
    new Sortable(block, {
        group: {
            name: 'shared',
            pull: 'clone',
            put: false // Do not allow items to be put into this list
        },
        animation: 150,
        sort: false, // To disable sorting: set sort to false
        onStart: function (/**Event*/evt) {
            const boxs = document.querySelectorAll('div.dropBlockBox')
            boxs.forEach(box => {
                box.classList.add("dotted")
            })


        },
        onEnd: function (/**Event*/evt) {
            const boxs = document.querySelectorAll('div.dropBlockBox')
            boxs.forEach(box => {
                box.classList.remove("dotted")
            })

            console.log(evt)
            if (evt.item.classList.contains('PA') && !(evt.to.classList.contains('blocks')) ) {
                evt.item.style.display = "none"

                const paralelo1 = document.createElement('div');
                const paralelo2 = document.createElement('div');

                const linha = document.createElement('hr');

                console.log(linha)

                paralelo1.classList.add('dropBlockBoxParallel')
                paralelo2.classList.add('dropBlockBoxParallel')

                paralelo1.appendChild(linha)
                paralelo2.appendChild(linha)

                evt.to.appendChild(paralelo1)
                evt.to.appendChild(paralelo2)

                new Sortable(paralelo1, {
                    group: 'shared',
                    animation: 150
                });

                new Sortable(paralelo2, {
                    group: 'shared',
                    animation: 150
                });

                evt.to.parentNode.querySelector('hr').style.bottom = "65.5%"
            }

            updateSelects()
        },
        onMove: function (evt) {
            if (evt.to.querySelectorAll('.block').length >= 1) {
                return false;
            }
            if (evt.to.classList.contains(`${totalDivs - 1}`) && evt.from.classList.contains(`C`)) {
                return false;
            }

            if (!(evt.to.classList.contains(`${totalDivs - 1}`)) && evt.from.classList.contains(`B`)) {
                return false;
            }
        }
    });
})

const drop = document.getElementById('data')



function newLine() {
    const line = document.createElement('div');
    line.classList.add('line')

    const hr = document.createElement('hr');

    line.appendChild(hr)

    const lines = document.getElementById('lines')

    lines.appendChild(line)

    const width = line.getBoundingClientRect().width

    console.log(width)

    var totDivs = parseInt(`${width / 80}`, 10)

    totalDivs = totDivs

    for (let index = 0; index < totDivs; index++) {
        const dropBlock = document.createElement('div');
        dropBlock.classList.add(`${index}`)
        dropBlock.classList.add('dropBlockBox')

        new Sortable(dropBlock, {
            group: 'shared',
            animation: 150,
            onStart: function (/**Event*/evt) {
                document.getElementById('delete-block-area').style.display = 'unset'
            },
        
            // Element dragging ended
            onEnd: function (/**Event*/evt) {
                document.getElementById('delete-block-area').style.display = 'none'
            }
        });

        line.appendChild(dropBlock)

    }

}

const areaDeleteBlock = document.getElementById('delete-block-area')

new Sortable(areaDeleteBlock, {
    group: 'shared', 
    animation: 150,
    onAdd: function (evt) {
        evt.item.parentNode.removeChild(evt.item);
	}
});

function recarregaClickHandle() {
    const handles = document.querySelectorAll('.noUi-handle')

    handles.forEach(handle => {

        console.log(handle)

        handle.addEventListener('click', () => {

            console.log(handle)

            if (handle.classList.contains('noUi-handle-invert')) {
                handle.classList.remove('noUi-handle-invert')
            } else {
                handle.classList.add('noUi-handle-invert')
            }

        })

    });
}

recarregaClickHandle()

// listar vars

function listarVars() {
    const list = document.getElementById('list-vars')

    list.innerHTML = ""

    vars.forEach(vari => {
        const tr = document.createElement('tr');
        line = `<td>${vari[0]}</td><td>${vari[1]}</td><td>${vari[2]}</td>`
        tr.innerHTML = line
        list.appendChild(tr);
    });

}

// vars nos selects

function updateSelects() {
    console.log('============ listando =================')
    const selects = document.querySelectorAll('.lines .line .dropBlockBox .block .select-var')
    selects.forEach(sel => {

        if (sel.classList.contains('var-CA') || sel.classList.contains('var-CF')) {

            sel.innerHTML = ""
            vars.forEach(vari => {
                if (vari[2] == "IN DIG" || vari[2] == "IN ANA") {

                    const option = document.createElement('option');
                    option.setAttribute('value', `${vari[0]}`)
                    option.innerHTML = `ID: ${vari[0]}`

                    sel.appendChild(option)

                }
            })

        } else if (sel.classList.contains('var-BA') || sel.classList.contains('var-BF')) {
            sel.innerHTML = ""
            vars.forEach(vari => {
                if (vari[2] == "OUT DIG" || vari[2] == "OUT ANA") {

                    const option = document.createElement('option');
                    option.setAttribute('value', `${vari[0]}`)
                    option.innerHTML = `ID: ${vari[0]}`

                    sel.appendChild(option)

                }
            })

        }
    })
}

// add int he middle of the string

String.prototype.insert = function(index, string) {
    if (index > 0) {
      return this.substring(0, index) + string + this.substr(index);
    }
  
    return string + this;
  };
  
  //Example of use:
  var something = "How you?";
  something = something.insert(3, " are");
  console.log(something)

// read diagram 

function readDiagram() {
    console.log('============ listando =================')

    var diagram = ""

    var ultimoParalelo = 0;
    
    var posicaoUltimoParalalelo = []

    var contandoPosicao = 0;


    const lines = document.querySelectorAll('.lines .line ')
    lines.forEach(line => {

        diagram += "{"
        contandoPosicao++

        const blocks = line.querySelectorAll('.dropBlockBox .block')

        blocks.forEach(block => {

            if (block.classList.contains("CA") && !(block.parentNode.classList.contains("dropBlockBoxParallel"))) {
                diagram += "CA"
                const idVar = block.querySelector(".select-var").value
                ultimoParalelo = 0
                diagram += idVar
                contandoPosicao+=3
                
            } else if (block.classList.contains("CF") && !(block.parentNode.classList.contains("dropBlockBoxParallel"))) {
                diagram += "CF"
                const idVar = block.querySelector(".select-var").value
                ultimoParalelo = 0
                diagram += idVar
                contandoPosicao+=3
            } else if (block.classList.contains("BA") && !(block.parentNode.classList.contains("dropBlockBoxParallel"))) {
                diagram += "BA"
                const idVar = block.querySelector(".select-var").value
                ultimoParalelo = 0
                diagram += idVar
                contandoPosicao+=3
            } else if (block.classList.contains("BF") && !(block.parentNode.classList.contains("dropBlockBoxParallel"))) {
                diagram += "BF"
                const idVar = block.querySelector(".select-var").value
                ultimoParalelo = 0
                diagram += idVar
                contandoPosicao+=3
            } else if (block.classList.contains("PA")) {
                
                const ant =(parseInt(block.parentNode.classList[0], 10)-1)

                if(document.getElementsByClassName(`${ant}`)[0].childNodes.length == 0){
                    ultimoParalelo = 0;
                }


                if(ultimoParalelo == 0){
                    const parals = block.parentNode.querySelectorAll('.dropBlockBoxParallel .block')
                    diagram += "["
                    contandoPosicao++
                    var i = 0

                    parals.forEach(paral => {
                        diagram += "("
                        contandoPosicao++
    
                        if (paral.classList.contains("CA")) {
                            diagram += "CA"
                        } else if (paral.classList.contains("CF")) {
                            diagram += "CF"
                        } else if (paral.classList.contains("BA")) {
                            diagram += "BA"
                        } else if (paral.classList.contains("BF")) {
                            diagram += "BF"
                        }
                        
                        const idVar = paral.querySelector(".select-var").value
                        contandoPosicao+=3
                        posicaoUltimoParalalelo[i] = contandoPosicao
                        i++

                        diagram += idVar
    
                        diagram += ")"
                        contandoPosicao++
                    })
                    diagram += "]"
                    contandoPosicao++
                    ultimoParalelo = 1;
                }else{

                    var j = 0

                    console.log('achou o outro')
                    const parals = block.parentNode.querySelectorAll('.dropBlockBoxParallel .block')
                    parals.forEach(paral => {

                        if (paral.classList.contains("CA")) {
                            diagram = diagram.insert(posicaoUltimoParalalelo[j],"CA")
                        } else if (paral.classList.contains("CF")) {
                            diagram = diagram.insert(posicaoUltimoParalalelo[j],"CF")
                        } else if (paral.classList.contains("BA")) {
                            diagram = diagram.insert(posicaoUltimoParalalelo[j],"BA")
                        } else if (paral.classList.contains("BF")) {
                            diagram = diagram.insert(posicaoUltimoParalalelo[j],"BF")
                        }
                        
                        const idVar = paral.querySelector(".select-var").value

                        diagram = diagram.insert(posicaoUltimoParalalelo[j]+2,idVar)

                        contandoPosicao+=3
                        
                        j++

                        posicaoUltimoParalalelo[j] = posicaoUltimoParalalelo[j]+3
                        
                        
                        ultimoParalelo = 1;
                    })
                }
                
                
            }


        })

        diagram += "}"
contandoPosicao++
    })

    return diagram
}

// enviar dados

function sendData() {
    send.diagram = readDiagram()
    const json = JSON.stringify(send);
    console.log(json)
    console.log(localStorage.getItem("reference"))
    instance.post(`/plc/program/`, send, { params: { reference: localStorage.getItem("reference") } })
        .then((res) => {
            console.log("DIAGRAMA ENVIADO!", res)
            window.location.href = "#abrirModalControles";
        }).catch((err) => {
            console.log("ERRO AO ENVIAR DIAGRAMA!", err.response)
        });
}

function pausar(){
    instance.post(`/plc/program/control`, {control: "pause"}, { params: { reference: localStorage.getItem("reference") } })
    .then((res) => {
        console.log("PAUSADO")
    }).catch((err) => {
        console.log("ERRO AO PAUSAR EXECUÇÃO!", err.response)
    });
}

function resumir(){
    instance.post(`/plc/program/control`, {control: "resume"}, { params: { reference: localStorage.getItem("reference") } })
    .then((res) => {
        console.log("RESUMIDO")
    }).catch((err) => {
        console.log("ERRO AO RESUMIR EXECUÇÃO!", err.response)
    });
}

function reset(){
    instance.post(`/plc/program/control`, {control: "reset"}, { params: { reference: localStorage.getItem("reference") } })
    .then((res) => {
        console.log("RESETADO")
        window.location.href = "#fechar";
    }).catch((err) => {
        console.log("ERRO AO PARAR EXECUÇÃO!", err.response)
    });
}