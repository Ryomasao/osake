<template lang="pug">
.article
  nuxt-link(:to="link")
    .article__header
      p {{ date }}
    .article__body
      img(:src="article.imagePath")
</template>
<script>
  export default {
    props: {
      article: Object,
      mode: String
    },
    computed: {
      link() {
        return this.mode === 'guest' ?  '/posts/' + this.article.id : '/mypage/posts/'  + this.article.id
      },
      date() {
        //@Memo
        // momentのプラグインをどこかで一括でできないだろうか
        // plugins配下にmoment.jsをつくって適当にimport/exportしてラップしようとしたけどエラーになった
        // 素のmomentをplugin化したほうがはやいかも？
        //this.$moment.updateLocale('ja', {weekdays: ["日","月","火","水","木","金","土"]})
        return this.$moment(this.article.date).format('YYYY/MM/DD')
      }
    }
  }

</script>

<style lang="scss" scoped>
.article {
  width: 30%;
}
</style>


