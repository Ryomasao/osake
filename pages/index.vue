<template lang="pug">
  div.main
      //section.section
      //  button(type="button" @click="login") ログインりだいれくと
      //  button(type="button" @click="check") 結果を確認
      section.section
          nuxt-link.button.is-large.is-fullwidth.is-success(to="/mypage/new-post") 投稿する！
          //li: nuxt-link(to="/mypage") マイページへ
      section.section
        .container
          .header わたしのおもいで
          .articles
            PreviewArticle(v-for="post in posts"  
            :key="post.id" 
            :article="post" 
            mode="guest")
      section.section
        button.button(@click="getMorePosts") もっと見る
          
</template>

<script>
import PreviewArticle from '~/components/PreviewArticle.vue'
import firebase from '~/plugins/firebase'
import axios from 'axios'

export default {
  components:{
    PreviewArticle
  },
  computed: {
    posts() {
      return this.$store.getters.loadedPosts
    }
  },
  methods: {
    getMorePosts() {
      this.$store.dispatch('getMorePosts')
    },
    //ログイン処理
    login() {
      console.log('test', firebase)
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },
    //ログイン後のリダイレクト
    check() {
      firebase.auth().getRedirectResult().then(function(result) {
        console.log('success')
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          console.log(token)
        }
        // The signed-in user info.
        var user = result.user;
        console.log(user)
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log('error', error)
      });
    },
  },
  /*
  async asyncData(context) {
    let { data } = await context.app.$axios.get('https://osake-d4cfe.firebaseio.com/articles.json')

    let articles = []
    for (const key in data) {
        articles.push({ ...data[key], id: key })
     }

    articles.sort((a, b) => {
      if(new Date(a.date) > new Date(b.date)) {
        return  -1
      }
      if(new Date(a.date) < new Date(b.date)) {
        return  1
      }
      return 0
    })

    return { articles : articles }
  },
  */
}
</script>

<style lang="scss" scoped>
.articles {
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

</style>
