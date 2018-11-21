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
    .navbar-start()
      nuxt-link(to="/mypage/new-post" v-if="isLogin").navbar-item 投稿する
      .navbar-item(@click="logout" v-if="isLogin") ログアウト
      .navbar-item() 当サイトについて(まだつくってない)
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
      showModal: true,
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
} 
</script>
<style lang="scss" scoped>
.navbar-item {
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
}
</style>

