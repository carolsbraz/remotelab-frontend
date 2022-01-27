function session() {
    instance.get(`/user/session`)
      .then((user) => {
        const data = document.createElement('div');

        console.log(user)
        line = `<div class="up-user-card"><div class="user-card"><img src="/general/img/user-image-example.png" alt="Imagem de perfil do usuário"><div class="user-data"><h3>${user.data.name}</h3><p>${user.data.email}</p></div></div></div>`

        data.innerHTML = line

        const card = document.getElementById("data-user")
        card.appendChild(data);


      }).catch((err) => { console.log(err, "PROBLEMA NA SESSAO"); });
  }

session()