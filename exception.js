export function checkStatus500(error) {
    if (response.status === 500) {
        throw new Error('Ошибка сервера');
    }
}

export function checkStatus400(error) {
    if (response.status === 400) {
        throw new Error('Неверный запрос')
    }
}

export function checkStatus201(error) {
    if (response.status === 201) {
        return response.json();
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

export function todoExceptionNotInternet() {
    alert('Проблема с интернетом, проверьте подключение')
}