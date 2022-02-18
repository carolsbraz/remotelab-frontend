var divsNum = 1;
var divsNumOut = 1;

let send = { "qtVars": 0, "devVars" :{ "input" : { "digital":[ ] },"output":{"digital":[{"id": 1,"port": 0}]}},}

var vars = []

function criarSlider(divNum) {
    var mergingTooltipSlider = document.getElementById('merging-tooltips');

    const selects = document.getElementById('valores')
    selects.innerHTML = ''

    var divs = []
    var tooltips = []
    var inicio = 0;
    if(divNum == 1){
        inicio = 250
    }else{
        inicio = 500/(divNum+1)
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
    if(divNum == 1){
        inicio = 250
    }else{
        inicio = 500/(divNum+1)
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

function criarSelect(number){
    const select = document.createElement('select');
    select.setAttribute("name", `var-ana-value-${number}`)
    select.setAttribute("id", `var-ana-value-${number}`)

    const option0 = document.createElement('option');
    option0.setAttribute("value", `0`)
    option0.innerHTML="0"

    const option1 = document.createElement('option');
    option1.setAttribute("value", `1`)
    option1.innerHTML="1"

    select.appendChild(option0)
    select.appendChild(option1)
    
    const selects = document.getElementById('valores')
    selects.appendChild(select)
}

function criarSelectOut(number){
    const select = document.createElement('select');
    select.setAttribute("name", `var-ana-out-value-${number}`)
    select.setAttribute("id", `var-ana-out-value-${number}`)

    const option0 = document.createElement('option');
    option0.setAttribute("value", `0`)
    option0.innerHTML="0"

    const option1 = document.createElement('option');
    option1.setAttribute("value", `1`)
    option1.innerHTML="1"

    select.appendChild(option0)
    select.appendChild(option1)
    
    const selects = document.getElementById('valores-out')
    selects.appendChild(select)
}

function addDiv(){
    var mergingTooltipSlider = document.getElementById('merging-tooltips');
    mergingTooltipSlider.noUiSlider.destroy()
    divsNum++
    criarSlider(divsNum)
}
function removeDiv(){
    if(divsNum > 1 ){
        var mergingTooltipSlider = document.getElementById('merging-tooltips');
    mergingTooltipSlider.noUiSlider.destroy()
    divsNum--
    criarSlider(divsNum)
    }
}

function addDivOut(){
    var mergingTooltipSlider = document.getElementById('merging-tooltips-out');
    mergingTooltipSlider.noUiSlider.destroy()
    divsNumOut++
    criarSliderOut(divsNumOut)
}
function removeDivOut(){
    if(divsNum > 1 ){
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

function preencherDispositivos(){
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

// criar variável

function createVar(){
   this.Atributo1 = "Primeiro Atributo"; //atributo público
   var Atributo2 = "Segundo Atributo"; //atributo privado
   this.ValorConcatenado = this.Atributo1 + " - " + Atributo2; //atributo publico;
  }
var meuObj = new DefinicaoObjeto(); // momento de criação do JSON



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
        },
        onMove: function (evt) {
            if (evt.to.querySelectorAll('.block').length >= 1) {
              return false;
            }
            if (evt.to.classList.contains(`${totalDivs-1}`) && evt.from.classList.contains(`C`) ) {
                return false;
              }

              if (!(evt.to.classList.contains(`${totalDivs-1}`)) && evt.from.classList.contains(`B`) ) {
                return false;
              }
          }
    });
})

const drop = document.getElementById('data')



function newLine(){
    const line = document.createElement('div');
    line.classList.add('line')


    const hr = document.createElement('hr');

    line.appendChild(hr)

    const lines = document.getElementById('lines')

    lines.appendChild(line)

    const width = line.getBoundingClientRect().width

    console.log(width)

    var totDivs = parseInt(`${width/80}`, 10)

    totalDivs = totDivs

    for (let index = 0; index < totDivs; index++) {
        const dropBlock = document.createElement('div');
        dropBlock.classList.add(`${index}`)
        dropBlock.classList.add('dropBlockBox')

        new Sortable(dropBlock, {
            group: 'shared',
            animation: 150
        });

        line.appendChild(dropBlock)

        
    }

}