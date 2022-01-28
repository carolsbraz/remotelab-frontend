var user = {}


function del(botao) {
    console.log(botao.closest("tr"))
    var tableData = botao.closest("tr").getElementsByTagName("td")[0].innerText

    instance.delete(`/user/${tableData}`)
        .then((res) => {
            listUser()
        })
        .catch((err) => {
            handleError(err, "ERRO AO RESGATAR USUARIOS")
        });
}

function listUser() {
    instance.get(`/user/`)
        .then((res) => {
            const users = res.data
            var line = "";

            const list = document.getElementById("list-user")

            list.innerHTML = ""

            users.forEach(user => {

                if (user.role != "MASTER") {
                    const tr = document.createElement('tr');

                    line = `<td>${user._id}</td><td>${user.name}</td><td>${user.email}</td><td>${user.role}</td><td><button onClick="edit(this)"> <img src="/general/img/icons/edit-icon.svg"> </button><button onClick="del(this)"><img src="/general/img/icons/delete-icon.svg"></button></td>`

                    tr.innerHTML = line

                    console.log(tr)

                    list.appendChild(tr);

                    console.log(list)
                }

            });

        })
        .catch((err) => {
            //handleError(err, "ERRO AO RESGATAR USUARIOS")
        });
}

listUser()

function edit(botao) {

    var tableData = botao.closest("tr").getElementsByTagName("td")[0].innerText

    instance.get(`/user/${tableData}`)
        .then((res) => {

            user = res.data
            console.log(user)

            document.getElementById("name-up").value = user.name
            document.getElementById("username-up").value = user.username
            document.getElementById("email-up").value = user.email
            document.getElementById("password-up").value = user.password
            document.getElementById("role-up").value = user.role

            window.location.href = "#abrirModalUpdateUser";

        })
        .catch((err) => {
            console.log(err, "ERRO AO RESGATAR USUARIOS")
        });
}

const form = document.getElementById('update-form');

function update(e) {
    e.preventDefault();
    let userData = { name: form.name.value, username: form.username.value, email: form.email.value, password: form.password.value, role: form.role.value };
    instance.put(`/user/${user._id}`, userData)
        .then((res) => {
            window.location.href = "#fechar";
            listUser()

        }).catch((err) => { console.log(err, "ERRO NA ATUALIZAÇÃO") });
}

form.addEventListener('submit', update);

//cadastro

const formCad = document.getElementById('cad-user');

function formSubmit(e) {
    e.preventDefault();

    console.log(formCad.name.value);

    let user = { name: formCad.name.value, username: formCad.username.value, email: formCad.email.value, password: formCad.password.value, role: formCad.role.value };
    console.log(user);

    instance.post(`/user`, user)
        .then((res) => {
            window.location.href = "#fechar";
            listUser()

        }).catch((err) => { handleError(err, "ERRO NO LOGIN") });
}

formCad.addEventListener('submit', formSubmit);