import Cookies from "js-cookie"
import { FetchFn } from "../FetchFn.tsx"
import { TypeActionForGetStateMessage, TypeMessage } from "../../store/functions/message"
import { TypeActionForGetStateLoginStatus, TypeStatus } from "../../store/functions/login_status"
import { NavigateFunction } from "react-router-dom"
import { FetchTypes } from "../../STANDARTS.ts"

export type InputType = "login" | "password"

//повертає false якщо все добре або повідомлення якщо є помилка
export const CheckInput = (value: string, type: InputType): boolean | string => {
    switch (type) {
        case "login":
            //перевіряє довжину (від 4 до 20)
            if (value.match(/^.{4,20}$/)) {
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

//робить спробу ввійти в акаунт
export const Authentication = (
    type: FetchTypes,
    login: string,
    password: string,
    setMessage: (payload: TypeMessage) => TypeActionForGetStateMessage,
    setLoading: ((value: React.SetStateAction<boolean>) => void) | null,
    setLoginStatus: (state: TypeStatus) => TypeActionForGetStateLoginStatus,
    navigate: NavigateFunction
) => {
    FetchFn({
        type: type,
        login: login,
        password: password
    },
        (data: { answer: number | string }, navigate?: NavigateFunction) => {
            if (data.answer === "success") {
                setMessage({ content: { content: data.answer } })

                if (navigate) {
                    navigate("/")
                }
            } else {

                setLoginStatus({ login_status: true })
            }
        },
        setLoading, setMessage, true, navigate
    )
}

//додає gest_user до user_token тобто каже що користувач не хоче рейструватися
export const SkipFn = (navigate: NavigateFunction) => {
    Cookies.set("user_token", "skipped_registration", { path: "/", expires: 1 })
    Cookies.set("login", "skipped_registration", { path: "/", expires: 1 })
    navigate("/")
}