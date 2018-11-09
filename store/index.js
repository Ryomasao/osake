import Vuex from 'vuex';
import { getArticles } from '../domain/articles'

const createStore = () => {
  return new Vuex.Store({
      state: {
        loadedPosts: [],
      },
      mutations: {
        setPosts(state, posts) {
          state.loadedPosts = posts
        }
      },
      actions: {
        async nuxtServerInit(vuexContext, context) {
          //const result = await this.$hoge.auth().getRedirectResult()
          //console.log(result)
          const loadedArticles  = await getArticles(context.app)
          const tempArray = []

          for (const key in loadedArticles) {
              tempArray.push({ ...loadedArticles[key], id: key })
           }

          tempArray.sort((a, b) => {
            if(new Date(a.date) > new Date(b.date)) {
              return  -1
            }
            if(new Date(a.date) < new Date(b.date)) {
              return  1
            }
            return 0
          })

          vuexContext.commit('setPosts', tempArray)
        }
      },
      getters: {
        loadedPosts(state) {
          return state.loadedPosts
        }
      }
  })
}

export default createStore