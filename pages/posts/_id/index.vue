<template lang="pug">
  .single-post-page    
   .container
      section.section
        .post__image-wrapper
          img(:src="loadedPost.imagePath").post__image
        .post__date-wrapper
          p.post__date {{ loadedPost.date }}
        .post__memo-wrapper
          p.post__memo {{ loadedPost.memo }}
        .post__tags.tags
          .tag(v-for="tag in loadedPost.tags") {{ tag }}
        .post__button
          nuxt-link.button.is-large.is-fullwidth.is-success(:to="'/mypage/posts/' + id") 編集する
</template>

<script>
  export default {
    async asyncData(context) {
      try {
        const id = context.params.id
        const url = `/articles/${id}.json`
        const loadedPost = await context.app.$axios.$get(url)
        return { 
          loadedPost: loadedPost,
          id: id
        }
      } catch(error) {
       console.log('error') 
      }
    },
    computed: {
      date() {
        //@Memo
        // momentのプラグインをどこかで一括でできないだろうか
        // plugins配下にmoment.jsをつくって適当にimport/exportしてラップしようとしたけどエラーになった
        // 素のmomentをplugin化したほうがはやいかも？
        this.$moment.updateLocale('ja', {weekdays: ["日","月","火","水","木","金","土"]})
        return this.$moment(this.article.date).format('YYYY/MM/DD dddd曜日')
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
