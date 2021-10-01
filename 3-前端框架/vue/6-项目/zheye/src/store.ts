import { createStore } from 'vuex'
import { ColumnProps, PostProps, columnsData, postsData } from './TestData'

interface UserProps{
  isLogin: boolean;
  userName?: string;
  id?: number;
  columnId?: number;
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
    user: { isLogin: true, userName: 'Michael', columnId: 1 }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, userName: '张三' }
    },
    createPost (state, post) {
      state.posts.push(post)
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
