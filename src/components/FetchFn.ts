import { FetchTypes } from "../STANDARTS"
import { TypeActionForGetStateMessage, TypeMessage } from "../store/functions/message"



export const url = ''



export const FetchFn = (
    requestArray: { [key: string]: any, type? : FetchTypes },
    Function?: (data: any) => any,
    setLoading?: ((value: React.SetStateAction<boolean>) => void) | null,
    setMessage?: (payload: TypeMessage) => TypeActionForGetStateMessage, 
    cookie: boolean= false 
) => {
    const SendsetMessage = (message: React.ReactNode | string, time: number = 1.5): void => {
        if (setMessage) {
            setMessage({content: {
                content: message
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
        method: 'POST',
        body: requestData,
        credentials: "include",
    } : {
        method: 'POST',
        body: requestData,
    })
        .then(response => response.text())
        .then(response => JSON.parse(response))
        .then(response => {
            setLoading ? setLoading(false) : null
            if (response.error == "") {
                const data = response.data
                if (Function) {
                    Function(data)
                }

            } else {
                SendsetMessage("виникла помилка, спробуйте ще раз", 3)
            }
        })
        .catch(error => {
            // setLoading ? setLoading(false) : null
            console.log(error)
            SendsetMessage("its a fucking error on server", 3)
        })
}

