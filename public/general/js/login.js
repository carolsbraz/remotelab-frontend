const form = document.querySelector('form');

function handleError(err, msg) {
  console.log(`==========${msg}==========`);
  console.log(err.response);
}

function handleSuccess(res, msg) {
  console.log(`==========${msg}==========`);
  console.log(res.data);
}

function formSubmit(e) {
  e.preventDefault();

  console.log('New login');

  let user = { loginId: form.loginId.value, password: form.password.value };
  console.log(user);

  const result = login(user)
  if(result == 200){
    window.location.href = "/user";
  }else if(result==403){
    console.log("já existe um usuário logado")
  }
}

form.addEventListener('submit', formSubmit);

const exit = document.getElementById("btn-exit")

exit.addEventListener('click', () => {
  logout("/")
})