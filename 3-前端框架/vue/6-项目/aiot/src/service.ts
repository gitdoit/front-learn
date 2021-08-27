import axios from 'axios'
import {AxiosResponse} from 'axios'

let http = axios.create({
    baseURL: 'http://10.5.6.28:10081/v1/mini/manage'
})

interface Response<T> {
    success: Boolean,
    message: string,
    data: T
}

async function listSensor() : Promise<AxiosResponse<Response<Array<any>>>> {
 return await http.get("/data/org");
}

export {
    listSensor
}