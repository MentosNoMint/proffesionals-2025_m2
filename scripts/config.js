import {loginApiUrl, registerApiUrl} from "./helpers/API.js";

export const config = {
    componentURL: 'components/',
}

export const fetchConfig = {
    '/register': {
        apiUrl: registerApiUrl,
        formId: 'register-form',
        path: '#/login',
        toasterText: 'Вы успешно зарегистрировались'
    },
    '/login': {
        apiUrl: loginApiUrl,
        formId: 'login-form',
        path: '#/gagarin',
    }
}