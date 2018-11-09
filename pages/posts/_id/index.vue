<template lang="pug">
  .single-post-page    
    section.section
      img(:src="loadedPost.imagePath")
      p {{ loadedPost.date }}
      p {{ loadedPost.memo }}
      .tags
        .tag(v-for="tag in loadedPost.tags") {{ tag }}
    section.section
</template>

<script>
  export default {
    async asyncData(context) {
      const id = context.params.id
      const url = `/articles/${id}.json`
      const loadedPost = await context.app.$axios.$get(url)
      return { loadedPost: loadedPost }
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