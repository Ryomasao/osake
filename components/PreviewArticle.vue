<template lang="pug">
transition(name="fade")
  .article(v-show="isShow" )
    nuxt-link(:to="link")
      .article__header
        p {{ date }}
      .article__body
          img(:src="article.imagePath" @load="isShow = true")
</template>
<script>
  export default {
    props: {
      article: Object,
      mode: String
    },
    data() {
      return {
        isShow: false
      }
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>


