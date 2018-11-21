<template lang="pug">
.auth
  .section.auth__login
    .container
      a.button.is-large.is-fullwidth(@click="authenticate") 
        span.icon: i.fab.fa-google-plus-g
        span Google+でログインする
  LoadingModal(:showModal="showModal")
</template>

<script>
import LoadingModal from '~/components/LoadingModal'

export default {
  middleware: ['guest'],
  components: {
    LoadingModal
  },
  data() {
    return {
      showModal: false,
    }
  },
  methods: {
    authenticate() {
      this.$store.dispatch('auth')
    },
  },
  // beforeCreatedのタイミングだと、this.showModalの値を変更してもmodalが表示されない
  // lifecycleのhookでthisを使うのはthisが束縛されて正しく参照できない可能性がある？
  // https://jp.vuejs.org/v2/guide/instance.html
  created: function() {
    // createdはSSRの対象になるので、clientのみに限定する
    if(!process.client) return 

    // 既にログインしている場合は不要
    if(this.isLogin) return 

    this.showModal = true 
    this.$store.dispatch('login')
    .then((user) => {
      this.showModal = false

      // ログインできた場合
      if(user) {
        this.$router.push('/')
      }
    })
  }
} 
</script>

<style lang="scss" scoped>
</style>

