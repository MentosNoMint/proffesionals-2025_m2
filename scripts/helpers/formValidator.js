import toaster from "../ui/toaster.js";


const formValidator = (form, error) => {

    console.log(error)
    if (error.error && error.error.message === 'Unauthorized') {
        toaster('Неверная почта или пароль', '#e35555')
        return;
    }

    const key = Object.keys(error.error?.errors)[0]

    const input = document.querySelector(`input[name="${key.replace(/\./g, '_')}"]`)
    const feedbackDiv = input.nextElementSibling;


    const allInput = document.querySelectorAll('input');
    allInput.forEach((input) => {
        input.classList.remove('is-invalid');
    })

    input.classList.add('is-invalid');

    feedbackDiv.textContent = error.error?.errors[key].join('')

}

export default formValidator;