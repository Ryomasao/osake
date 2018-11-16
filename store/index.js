import Vuex from 'vuex';
import { getPosts } from '../domain/posts'

const createStore = () => {
  return new Vuex.Store({
      state: {
        loadedPosts: [],
        postCount: 0,
      },
      mutations: {
        setPosts(state, posts) {
          for(const key in posts) {
            state.loadedPosts.push({ ...posts[key] , id: key})
          }
        },
        addPosts(state, posts) {
          for(const key in posts) {
            state.loadedPosts.push({ ...posts[key] , id: key})
          }
        },
        addPostCount(state, count) {
          state.postCount += count
        }
      },
      actions: {
        async nuxtServerInit(vuexContext, context) {
          const loadedPosts  = await getPosts(context.app)
          vuexContext.commit('setPosts', loadedPosts)
          vuexContext.commit('addPostCount', Object.keys(loadedPosts).length)
        },
        async getMorePosts(vuexContext) {
          const offset = vuexContext.getters.postCount + 1
          const loadedPosts = await getPosts(this, offset)
          vuexContext.commit('addPostCount', Object.keys(loadedPosts).length)
          vuexContext.commit('addPosts', loadedPosts)
        }
      },
      getters: {
        loadedPosts(state) {
          return state.loadedPosts
        },
        postCount(state) {
          return state.postCount
        }
      }
  })
}

export default createStore