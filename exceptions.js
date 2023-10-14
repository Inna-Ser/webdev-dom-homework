import {
    password
} from "./api.js"

export function checkStatus500(response) {
    if (response.status === 500) {
        throw new Error('Ошибка сервера');
    }
}

export function checkStatus400(response) {
    if (response.status === 400) {
        throw new Error('Неверный запрос')
    }
}

export function checkStatus201(response) {
    if (response.status === 201) {
        return response.json();
    }
}

export function checkStatus401(response) {
    if (response.status === 401) {
        password = prompt('Введите верный пароль')
    }
}

export function checkIsInternet(response) {
    if (!response.status === 201 || !response.status === 400 || !response.status === 500) {
        throw new Error('Отсутствует соединение')
    }
}

export function todoException500(error) {
    if (error.message === 'Ошибка сервера') {
        alert('Сервер не отвечает, попробуйте позже')
    }
}

export function todoException400(error) {
    if (error.message === 'Неверный запрос') {
        alert('Короткое имя или текст комментария, минимум 3 символа')
    }
}

export function todoExceptionNotInternet(error) {
    if (error.message === 'Отсутствует соединение') {
        alert('Проблема с интернетом, проверьте подключение')
    }
}