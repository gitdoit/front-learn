import axios from 'axios'
import {reactive} from 'vue'
// 定义统一返回体
interface Response<T> {
  data: T | null;
  loadding: boolean;
  error: Error | null;
  success: boolean;
}

function useURLLoader<T>(url: string) :Response<T>{
  const res: Response<T> = reactive({
    data: null,
    loadding: true,
    error: null,
    success: false
  })
  axios.get(url)
    .then(response => {
      res.data = response.data;
      res.loadding = false;
      res.success = true;
    }).catch(e => {
      res.loadding = false;
      res.error = e;
    })
  return res;
}

export default useURLLoader;