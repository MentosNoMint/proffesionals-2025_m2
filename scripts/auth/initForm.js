import formValidator from "../helpers/formValidator.js";
import toaster from "../ui/toaster.js";

const initForm = ({formId, apiUrl, path, toasterText}) => {
    const form = document.getElementById(formId);
    if (!form) return

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const result = {}

        formData.forEach((value, key) => {
            result[key] = value;
        })

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result)
        })
            .then(response => {
                if (response.headers.get('content-type')) {
                    return response.json();
                }
            })
            .then(data => {
                if (!data?.error) {
                    localStorage.setItem('AuthToken', data?.token)
                    window.location.hash = path;
                    if (toasterText) {
                        toaster(toasterText, '#69cd69')
                    }
                } else {
                    formValidator(form, data);
                }
            })
    })
}

export default initForm;