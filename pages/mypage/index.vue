<template lang="pug">
  section.section
    .container
      .header わたしのおもいで
      .articles
        PreviewArticle(v-for="article in articles"  :key="article.id" :article="article" mode="admin")
</template>

<script>
import PreviewArticle from '~/components/PreviewArticle.vue'

export default {
  components:{
    PreviewArticle
  },
  async asyncData(context) {
     let { data } = await context.app.$axios.get('https://osake-d4cfe.firebaseio.com/articles.json')

     let articles = []
     for (const key in data) {
         articles.push({ ...data[key], id: key })
      }
     return { articles : articles }
  },
}
</script>

<style lang="sass">
</style>

