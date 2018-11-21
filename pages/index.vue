<template lang="pug">
  div.main
      section.section
          .main__header(v-if="!isLogin")
            nuxt-link.button.is-large.is-fullwidth.is-success(to="/auth" ) ログインする！
            p お酒の記事を投稿するにはログインが必要です
          .main__header(v-else)
            nuxt-link.button.is-large.is-fullwidth.is-success(to="/mypage/new-post") 投稿する！
      section.section
        .container
          .header.title みんなのおもいで
          .articles
            PreviewArticle(v-for="post in posts"  
            :key="post.id" 
            :article="post" 
            mode="guest")
      section.section
        button.button.is-large.is-fullwidth.is-success(v-if="!hasAllPost" @click="getMorePosts") もっと見る
          
</template>

<script>
import PreviewArticle from '~/components/PreviewArticle.vue'
import axios from 'axios'

export default {
  components:{
    PreviewArticle
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    },
    posts() {
      return this.$store.getters.loadedPosts
    },
    hasAllPost() {
      return this.$store.getters.hasAllPost
    },
    postButtonText() {
      return this.$store.getters.isLogin ? 
      '投稿する！' :
      'Googleでログインして投稿する！' 
    }
  },
  methods: {
    getMorePosts() {
      this.$store.dispatch('getMorePosts')
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
