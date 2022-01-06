var select   = document.getElementById("txt-type");
var inDig   = document.getElementById("type-in-dig");
var inAna   = document.getElementById("type-in-ana");
var out   = document.getElementById("type-out");
var variavel = '';
select.onchange = function(){
    variavel = this.value;
    if(variavel == 'in-dig'){
        inDig.style.visibility = "visible"
        inAna.style.visibility = "hidden"
        out.style.visibility = "hidden"
    }else if(variavel == 'in-ana'){
        inDig.style.visibility = "hidden"
        inAna.style.visibility = "visible"
        out.style.visibility = "hidden"
    }else{
        inDig.style.visibility = "hidden"
        inAna.style.visibility = "hidden"
        out.style.visibility = "visible"
    }
}