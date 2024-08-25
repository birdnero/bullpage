//функція для провірки наявності певної куки в браузері
export const CheckCookie = (name: string): boolean => {
    const cookies: string[] = document.cookie.split(';');
    cookies.forEach(el => {
        let cookie = el.trim()
        if (cookie.startsWith(name + "=")) {
            return true
        }
    })
    return false
}
