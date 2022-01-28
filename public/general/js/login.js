// login

const form = document.querySelector('form');

function formSubmit(e) {
  e.preventDefault();

  console.log('New login');

  let user = { loginId: form.loginId.value, password: form.password.value };
  console.log(user);

  instance.post(`/auth/login`, user)
    .then((res) => {
      window.location.href = "/user";
    }).catch((err) => {
      var text = err.toString()
      var textList = text.split(" ")
      var error= textList[6]
      if (error == 403) {
        console.log("já existe um usuário logado")
      } else if (error == 401) {
        console.log("crendenciais incorretas")
      }
    });


}

form.addEventListener('submit', formSubmit);
