import { createStore } from 'vuex'
import axios from 'axios'
import { ColumnProps, PostProps, UserProps } from './model'

interface GlobalProp {
  loading: boolean,
  topic: ColumnProps[],
  posts: PostProps[],
  user: UserProps
}

const store = createStore<GlobalProp>({
  state: {
    loading: false,
    topic: [],
    posts: [],
    user: { isLogin: true, userName: 'Michael', columnId: 1 }
  },
  mutations: {
    changeLoading (state, loading) {
      state.loading = loading
    },
    login (state) {
      state.user = { ...state.user, isLogin: true, userName: '张三' }
    },
    createPost (state, post) {
      state.posts.push(post)
    },
    fetchColums (state, rawData) {
      state.topic = rawData.data.list
    },
    fetchColum (state, rawData) {
      state.topic = [rawData.data]
    },
    fetchPosts (state, rawData) {
      state.posts = rawData.data.list
    }
  },
  actions: {
    async fetchColums (context) {
      const { data } = await axios.get('/api/columns')
      context.commit('fetchColums', data)
    },
    fetchColum ({ commit }, cid: string) {
      axios.get('/api/columns/' + cid).then(resp => {
        commit('fetchColum', resp.data)
      })
    },
    async fetchPosts ({ commit }, cid: string) {
      const { data } = await axios.get('/api/columns/' + cid + '/posts')
      commit('fetchPosts', data)
    }
  },
  getters: {
    getTopicById: (state) => (_id :string) => {
      return state.topic.find(e => e._id === _id)
    }
  }
})

export default store
export { GlobalProp, UserProps }
