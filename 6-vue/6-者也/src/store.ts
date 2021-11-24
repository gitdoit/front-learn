import { createStore } from 'vuex'
import axios from 'axios'
import { ColumnProps, PostProps, UserProps } from './model'

interface GlobalProp {
  token: string;
  loading: boolean,
  topic: ColumnProps[],
  posts: PostProps[],
  user: UserProps
}

const store = createStore<GlobalProp>({
  state: {
    token: '',
    loading: false,
    topic: [],
    posts: [],
    user: { isLogin: false } as UserProps
  },
  mutations: {
    changeLoading (state, loading) {
      state.loading = loading
    },
    login (state, paload) {
      console.log(paload)
      console.log(paload.data.token)
      state.token = paload.data.token
      if (axios.defaults.headers) {
        axios.defaults.headers.common.Authorization = `Bearer ${state.token}`
      }
    },
    saveUserInfo (state, payload) {
      state.user = payload.data
      state.user.isLogin = true
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
    },
    async login ({ commit }, payload) {
      const { data } = await axios.post('/api/user/login', payload)
      commit('login', data)
    },
    async loginAndFetch ({ commit, dispatch }, payload) {
      dispatch('login', payload).then(async () => {
        const { data } = await axios.get('/api/user/current')
        commit('saveUserInfo', data)
      })
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
