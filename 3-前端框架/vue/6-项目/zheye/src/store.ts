import { createStore } from 'vuex'
import { ColumnProps, PostProps, columnsData, postsData } from './TestData'

interface UserProps{
  isLogin: boolean;
  userName?: string;
  id?: number;
}

interface GlobalProp {
  topic: ColumnProps[],
  posts: PostProps[],
  user: UserProps
}

const store = createStore<GlobalProp>({
  state: {
    topic: columnsData,
    posts: postsData,
    user: { isLogin: false, userName: 'Michael' }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, userName: '张三' }
    }
  },
  getters: {
    getTopicById: (state) => (id :number) => {
      return state.topic.find(e => e.id === id)
    }
  }
})
export default store
export { GlobalProp, UserProps }
