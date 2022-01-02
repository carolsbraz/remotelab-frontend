var i = setInterval(function () {
    
    clearInterval(i);
  
    // O código desejado é apenas isto:
    document.getElementById("loading").style.display = "none";

}, 4000);

const target = document.querySelectorAll('[data-anime]')
const animationClass = 'animate'

animeScroll();

function animeScroll() {
    const pageTop = window.pageYOffset;
    target.forEach(function(element) {
        if ((pageTop) > element.offsetTop - ((window.innerHeight * 3.5) / 4)) {
            element.classList.add(animationClass)
        }
    })
}

window.addEventListener('scroll', function() {
    animeScroll();
})