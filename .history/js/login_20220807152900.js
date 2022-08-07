//id 991294782385-ek42cs54q1h49sd4k0dos2lo96qk57q4.apps.googleusercontent.com
//code : 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

const validate = (options) => {
   const validator = (inputElement, rule) => {
      const errorElement = inputElement.parentElement.querySelector(options.errorSelector);
      let errorMessage = rule.checked(inputElement.value);
      if (errorMessage) {
         errorElement.innerText = errorMessage;
         inputElement.parentElement.classList.add('in-valid');
      } else {
         errorElement.innerText = '';
         inputElement.parentElement.classList.remove('in-valid');
      }
   };
   const formElement = document.querySelector(options.form);
   if (formElement) {
      options.rules.forEach((rule) => {
         const inputElement = formElement.querySelector(rule.selector);
         if (inputElement) {
            inputElement.addEventListener('blur', () => {
               validator(inputElement, rule);
            });
            inputElement.addEventListener('input', () => {
               const errorElement = inputElement.parentElement.querySelector(options.errorSelector);
               errorElement.innerText = '';
               inputElement.parentElement.classList.remove('in-valid');
            });
         }
      });
   }
};

//định nghĩa method
validate.isEmail = (selector, message, getEmail) => {
   return {
      selector: selector,
      checked: (value) => {
         const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
         let mess = '';
         if (value.trim()) {
            mess = message;
            console.log(getEmail);
         } else {
            mess = 'Vui lòng nhập password!';
         }
         return regex.test(value) == getEmail ? undefined : mess;
      },
   };
};

//định nghĩa method
validate.isPassword = (selector, message, getPassword) => {
   return {
      selector: selector,
      checked: (value) => {
         let mess = '';
         if (value.trim()) {
            mess = message;
         } else {
            mess = 'Vui lòng nhập password!';
         }
         return String(value.trim()) === getPassword ? undefined : mess;
      },
   };
};

validate({
   form: '.form-login',
   errorSelector: '.message',
   rules: [
      validate.isEmail('#email', 'Email này không đúng!', 'tuancnttk61@gmail.com'),
      validate.isPassword('#password', 'Mật khẩu không chính xác!', 'password'),
   ],
});
