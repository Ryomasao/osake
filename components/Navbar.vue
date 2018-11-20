<template lang="pug">
nav.navbar.is-link(role="navigation" aria-label="main navigation")
  .navbar-brand
    nuxt-link(to="/").navbar-item
      img(src="~/assets/images/logo.jpg" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28")
    a(role="button" class="navbar-burger" @click="isActive = !isActive")
      span(aria-hidden="true")
      span(aria-hidden="true")
      span(aria-hidden="true")
  .navbar-menu(:class="{'is-active': isActive}")
    .navbar-start(v-if="isLogin")
      nuxt-link(to="/mypage/new-post").navbar-item 投稿する
      .navbar-item(@click="logout") ログアウト
    .navbar-start(v-else)
      .navbar-item(@click="authenticate") Googleでログインする
</template>

<script>
  export default {
    computed: {
      isLogin() {
        return this.$store.getters.isLogin
      }
    },
    data() {
      return {
        isActive: false,
      }
    },
    methods: {
      authenticate() {
        this.$store.dispatch('auth')
      },
      logout() {
        this.$store.dispatch('logout')
      }
    },
    async mounted() {
      await this.$store.dispatch('login')
    }
  } 
</script>
<style lang="scss">
</style>

