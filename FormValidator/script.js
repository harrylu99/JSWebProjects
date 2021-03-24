const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')


//input error
function showError(input,text){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = text;
}

//input success
function showSuccess(input,text){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//check email
function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        showSuccess(input);
    }else {
        showError(input, 'Email is not valid');
    }
}

//check length
function checkLength(input, min, max) { 
    if(input.value.length < min){
        showError(input, `${getFiledName(input)}must be at least ${min} characters`);
    } else if (input.value.length > max){
        showError(input, `${getFiledName(input)}can't more than ${max} characters`);
    }else {
        showSuccess(input);
    }
 }

//check required
function checkRequired(inputArr){
    inputArr.forEach(function(input){
        if(input.value.trim() ===''){
            showError(input, `${getFiledName(input)} is required`);
        } else {
            showSuccess(input);
        }
    })
}

//check password match
function checkPasswordMatch(input1, input2) {
    if(input1.value !== input2.value){
        showError(input2, 'Password is not same');
    }
  }

//GEt fieldname
function getFiledName(input) { 
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
 }


//event listener
form.addEventListener('submit', function(e){
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 30);
    checkEmail(email);
    checkPasswordMatch(password, password2);


    // if(username.value === ''){
    //     showError(username, 'Username cannot be empty');
    // }else{
    //     showSuccess(username);
    // }

    // if(email.value === ''){
    //     showError(email, 'Email cannot be empty');
    // }else if(!validateEmail(email.value)){
    //     showError(email, 'Email is not valid')
    // }
    // else{
    //     showSuccess(email);
    // }

    // if(username.value === ''){
    //     showError(password, 'Password cannot be empty');
    // }else{
    //     showSuccess(password);
    // }

    // if(username.value === ''){
    //     showError(password2, 'Password cannot be empty');
    // }else{
    //     showSuccess(password2);
    // }
});