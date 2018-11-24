import Vuex from 'vuex';
import { getPosts, createPost, editPost } from '../domain/posts'
import firebase from '~/plugins/firebase'
import Cookie from  'js-cookie'

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

          // 未認証でも実行する処理
          const loadedPosts  = await getPosts(context.app)
          vuexContext.commit('setPosts', loadedPosts)
          vuexContext.commit('addPostCount', Object.keys(loadedPosts).length)

          // cookieが存在しない(未認証)
          if(!context.req.headers.cookie) {
            return 
          }
          const cookie = context.req.headers.cookie
          const tokenCookie = cookie.split(';').find(
            c => c.trim().startsWith('token=')
          )

          // cookieはあるがtokenはない
          if(tokenCookie == null) {
            return 
          }

          const token = tokenCookie.split('=')[1]
          vuexContext.commit('setToken', token)
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
        setPosts({ commit }, loadedPosts) {
          commit('addPostCount', Object.keys(loadedPosts).length)
          commit('addPosts', loadedPosts)
        },
        async createPost(vuexContext, post) {
          // tokenの有効期限は1時間。でもProviderからもらう？userはほぼ無期限
          // 有効期限をどう考えていいかよくわからない
          // とりあえず、操作時にtoken有効期限切れは微妙なので、都度tokenを取得する
          // getIdTokenは有効期限が切れてれば、リフレッシュトークンを使ってとってくる
          // 有効期限が切れてなければ、大丈夫
          const token = await vuexContext.getters.user.getIdToken(true)

          //SSR時にtokenを使うことを考慮して、Cookieのtokenも有効にしておく
          Cookie.set('token', token)
          const postedData =  await createPost(this.$axios, post, token)
          .catch(error => {
            throw error
          })
          return postedData
        },
        async editPost(vuexContext, post) {
          const token = await vuexContext.getters.user.getIdToken(true)
          Cookie.set('token', token)
          const postedData =  await editPost(this.$axios, post, token)
          .catch(error => {
            throw error
          })
          return postedData
        },
        async auth(vuexContext) {
          //Poriverに再認証する場合は、古いCookieを消しておく
          Cookie.remove('token')
          const provider = new firebase.auth.GoogleAuthProvider();
          return await firebase.auth().signInWithRedirect(provider);
        },
        async login(vuexContext) {

          const result = await firebase.auth().getRedirectResult()
          .catch(error => {
            // Handle Errors here.
            const errorCode = error.code
            const errorMessage = error.message
            // The email of the user's account used.
            const email = error.email
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential
            console.log('error', error)
          })

          if (result.credential) {
            // GoogleのOAuthのToken GoogleのAPIを叩くのであれば必要
            // 今のところ不要そうなので、使ってない
            const gToken = result.credential.accessToken
          }

          // AuthProvider側が未ログインの場合
          if(!result.user) {
            return false
          }

          const user = result.user
          const token = await user.getIdToken(true)

          vuexContext.commit('setToken', token)
          vuexContext.commit('setUser', user)

          Cookie.set('token', token)
          return user
        },
        async logout(vuexContext) {
          await firebase.auth().signOut()
          Cookie.remove('token')
          location.href = '/'
        },
        setUser(vuexContext, user) {
          vuexContext.commit('setUser', user)
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
        //loginをしているかどうかは、本来userで見るべきな気がする
        //というのもtokenの有効期限は1時間しかなく、このtokenはpost更新時に都度更新しているから
        //ただuserのセットをpluginでやってて、pluginだと若干タイムラグがある
        isLogin(state) {
          return state.token != null
        }
      }
  })
}

export default createStore