const apiUrl = "https://norma.nomoreparties.space/api/ingredients";

export const getData = async() => {
    const res = await fetch(apiUrl);
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}