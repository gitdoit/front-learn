import axios, { AxiosResponse } from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000/v1/mini/manage'
})

interface Response<T> {
  success: boolean,
  message: string,
  data: T
}

async function listSensor () : Promise<AxiosResponse<Response<Array<any>>>> {
  return http.get('/data/org')
}

async function joinOrg (phone:string, orgId :string) : Promise<AxiosResponse<Response<any>>> {
  return http.post(`/set-auth?phone=${phone}&orgId=${orgId}`)
}
export {
  listSensor,
  joinOrg
}
