import Vuex from 'vuex';
import { getPosts } from '../domain/posts'
import firebase from '~/plugins/firebase'

const createStore = () => {
  return new Vuex.Store({
      state: {
        loadedPosts: [],
        postCount: 0,
        hasAllPost: false,
        user: null,
        token: null,
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
        },
        hasAllPost(state) {
          state.hasAllPost = true
        },
        setUser(state, user) {
          state.user = user
        },
        setToken(state, token) {
          state.token = token
        },
        clearUser(state) {
          state.user = null
        },
        clearToken(state) {
          state.token = null
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
          if(Object.keys(loadedPosts).length === 0) {
            vuexContext.commit('hasAllPost')
          }
          vuexContext.commit('addPostCount', Object.keys(loadedPosts).length)
          vuexContext.commit('addPosts', loadedPosts)
        },
        auth(vuexContext) {
          const provider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithRedirect(provider);
        },
        async login(vuexContext) {
          try {
            const result = await firebase.auth().getRedirectResult()

            if (result.credential) {
              // This gives you a Google Access Token. You can use it to access the Google API.
              const gToken = result.credential.accessToken
              console.log('gtoken', gToken)
            }
            // The signed-in user info.
            const user = await firebase.auth().currentUser
            const token = await user.getIdToken(true)

            vuexContext.commit('setToken', token)
            vuexContext.commit('setUser', {
              name: user.displayName
            })
          } catch(error) {
            // Handle Errors here.
            const errorCode = error.code
            const errorMessage = error.message
            // The email of the user's account used.
            const email = error.email
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential
            // ...
            console.log('error', error)
          }
        },
        async logout(vuexContext) {
          await firebase.auth().signOut()
          vuexContext.commit('clearToken')
          vuexContext.commit('clearUser')
        }
      },
      getters: {
        loadedPosts(state) {
          return state.loadedPosts
        },
        postCount(state) {
          return state.postCount
        },
        hasAllPost(state) {
          return state.hasAllPost
        },
        user(state) {
          return state.user
        },
        token(state) {
          return state.token
        },
        isLogin(state) {
          return state.token != null
        }
      }
  })
}

export default createStore