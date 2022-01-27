function createNav() {
    instance.get(`/user/session`)
        .then((user) => {
           
            const data = document.createElement('div');

            data.classList.add = "icons"

            if(user.data.role == "MASTER"){
                line = `<a href="#"> <img src="/general/img/icons/diagram-icon.svg"></a> <a href="#"> <img src="/general/img/icons/settings-icon.svg"> </a><a href="/new-clp-version"> <img src="/general/img/icons/person-add.svg"> </a><a href="/new-clp-version"> <img src="/general/img/icons/new-clp-version-icon.svg"> </a>`
            }else{
                line = `<a href="#"> <img src="/general/img/icons/diagram-icon.svg"> <a href="#"> <img src="/general/img/icons/settings-icon.svg"> </a>`
            }

            data.innerHTML = line

            const icons = document.getElementById("icons")
            icons.appendChild(data);


        }).catch((err) => { console.log(err, "PROBLEMA NA SESSAO"); });
}

createNav()
