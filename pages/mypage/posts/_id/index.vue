<template lang="pug">
  section.section
    .container
      AdminPostArtcle(:loaded-article="loadedPost" :id="id")
</template>

<script>
  import AdminPostArtcle from '~/components/AdminPostArticle'

  export default {
    components: {
      AdminPostArtcle
    },
    async asyncData(context) {
      const id = context.params.id
      const url = `https://osake-d4cfe.firebaseio.com/articles/${id}.json`
      const loadedPost = await context.app.$axios.$get(url)
      return { loadedPost: loadedPost , id: context.params.id }
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