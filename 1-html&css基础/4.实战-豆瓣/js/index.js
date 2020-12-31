let loginBts = document.querySelectorAll(".login-form .tabs div");
loginBts.forEach(e => {
  e.addEventListener('click',(event) => {
    loginBts.forEach(t => t.classList.remove('active'))
    e.classList.add('active');

    let form = document.querySelectorAll(".login-form .phone-login , .login-form .password-login");
    console.log(form);
    form.forEach(f => {
      if(f.classList.contains('active')){
        f.classList.remove('active')
      }else{
        f.classList.add('active');
      }
    })
  });
})

document.querySelectorAll('.phone-code span').forEach(e => {
  e.addEventListener('click',(event) => {
    document.getElementById('choose-code').style.display = 'block';
  })
})
document.querySelectorAll('.phone-code .close .icon-chahao').forEach(e => {
  e.addEventListener('click', event => {
    document.getElementById('choose-code').style.display = 'none';
  })
})

document.querySelectorAll('.choose-code ul>li').forEach(ele => {
  ele.addEventListener('click',(event)=>{
    document.querySelectorAll('.choose-code ul>li').forEach(iele => {
      iele.classList.remove('selected');
    })
    ele.classList.add('selected');
  })
})