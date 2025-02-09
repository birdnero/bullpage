import { CloseCircleOutlined } from "@ant-design/icons"
import { Colors, FetchTypes, url } from "../STANDARTS"
import { TypeActionForGetStateMessage, TypeMessage } from "../store/functions/message"


export const FetchFn = (
    requestArray: { [key: string]: any, type? : FetchTypes },
    Function?: (data: any, setter?: (value: React.SetStateAction<any>) => void | null) => any,
    setLoading?: ((value: React.SetStateAction<boolean>) => void) | null,
    setMessage?: (payload: TypeMessage) => TypeActionForGetStateMessage, 
    cookie: boolean= false ,
    something?: any
) => {
    const SendsetMessage = (message: React.ReactNode | string, time: number = 1.5): void => {
        if (setMessage) {
            setMessage({content: {
                content: message,
                icon: <CloseCircleOutlined style={{ stroke: Colors.magenta }} />
            }, duration: time})
        }
    }

    const entries = Object.entries(requestArray);
    const requestData = new FormData()
    entries.forEach(el => {
        requestData.append(el[0], el[1])
    })
    setLoading ? setLoading(true) : null
    return fetch(url, cookie? {
        method: 'POST', // Метод запиту
        headers: {
            'Content-Type': 'application/json' // Вказуємо формат даних
        },
        body: JSON.stringify(requestArray), // Перетворюємо об'єкт в JSON
        credentials: "include",//server with allow cross origin: * can't provide credentials
    } : {
        method: 'POST', // Метод запиту
        headers: {
            'Content-Type': 'application/json' // Вказуємо формат даних
        },
        body: JSON.stringify(requestArray) // Перетворюємо об'єкт в JSON
    })
        .then(response => response.text())
        .then(response => JSON.parse(response))
        .then(response => {
            setLoading ? setLoading(false) : null
                if (Function) {
                    something? Function(response, something) : Function(response)
                }

        })
        .catch(error => {
            setLoading ? setLoading(false) : null
            console.log(error)
            SendsetMessage("its a fucking error on server", 3)
        })
}

