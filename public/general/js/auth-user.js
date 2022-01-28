function login(user) {
  instance.post(`/auth/login`, user)
    .then((res) => {
      window.location.href = "/user";
    }).catch((err) => {
      console.log(err)
    });
}

function logout() {
  instance.get(`/auth/logout`).then((res) => {
    window.location.href = "/";
  }).catch((err) => {
    console.log(err)
  });
}
