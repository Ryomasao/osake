<template lang="pug">
  div.main
      section.section
          nuxt-link.button.is-large.is-fullwidth.is-success(to="/mypage/new-post") 投稿する！
      section.section
        .container
          .header.title わたしのおもいで
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
import firebase from '~/plugins/firebase'
import axios from 'axios'

export default {
  components:{
    PreviewArticle
  },
  computed: {
    posts() {
      return this.$store.getters.loadedPosts
    },
    hasAllPost() {
      return this.$store.getters.hasAllPost
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
