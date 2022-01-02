const url = "http://34.95.137.51:3333"

const form = document.querySelector('form');

form.addEventListener('submit', (e)=>{
    //to prevent reload
    e.preventDefault();
    //creates a multipart/form-data object
    let data = new FormData(form);
    axios({
      method  : 'post',
      url : `${url}/auth/login`,
      data : data,
    })
    .then((res)=>{
      console.log(res);
    })
    .catch((err) => {throw err});
});


//const login = document.getElementById("btn-login")
//
//login.addEventListener('click', ()=>{
//    const userEmail = document.getElementById('txt-email').value;
//    const userPassword = document.getElementById('txt-senha').value;
//    
//    var bodyFormData = new FormData();
//    bodyFormData.append('loginId', userEmail)
//    bodyFormData.append('password', userPassword)
//
//    console.log("click")
//    axios({
//      method: "post",
//      url: `${url}/user/`,
//      data: bodyFormData,
//      headers: {
//        'Content-Type': `multipart/form-data; boundary=${bodyFormData._boundary}`,
//    },
//    })
//      .then(function (response) {
//        //handle success
//        console.log(response);
//      })
//      .catch(function (response) {
//        //handle error
//        console.log(response);
//      });
//});