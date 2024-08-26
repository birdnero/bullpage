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

export type InputType = "login" | "password"

//повертає false якщо все добре або повідомлення якщо є помилка
export const CheckInput = (value: string, type: InputType): boolean | string => {
    switch (type) {
        case "login":
            //перевіряє довжину (від 4 до 20)
            if (value.match(/^.{4,20}$q`/)) {
                //перевіряє на руснявість
                if (value.match(/[ЪЫЭЁъыэё]/)) {
                    return "заборонено використовувати йобану російську"
                //перевіряє на англійську + українську + символи "\-_. " 
                } else if (value.match(/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\-_\. ]{4,20}$/)) {
                    return false
                } else {
                    return "sorry but you can use ukrainian + english alphabets and symblos \"\\-_. \""
                }
            } else {
                return "length error (need from 4 to 20)"
            }

        case "password":
            //перевіряє довжину (від 4 до 20)
            if (value.match(/^.{6,20}$/)) {
                //перевіряє на руснявість
                if (value.match(/[ЪЫЭЁъыэё]/)) {
                    return "заборонено використовувати йобану російську"
                } else {
                    return false
                }
            } else {
                return "length error (need from 6 to 20) "
            }

        default:
            break;
    }
    return false
}


export const Login = (login: string, password: string) =>{
    
}