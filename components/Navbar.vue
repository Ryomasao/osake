<template lang="pug">
    <nav class="navbar is-link" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        nuxt-link(to="/").navbar-item
          img(src="~/assets/images/logo.jpg" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28")
        a(role="button" class="navbar-burger" @click="isActive = !isActive")
          span(aria-hidden="true")
          span(aria-hidden="true")
          span(aria-hidden="true")
      </div>
      .navbar-menu(:class="{'is-active': isActive}")
        .navbar-start
          nuxt-link(to="/").navbar-item Home
          nuxt-link(to="/mypage/new-post").navbar-item 投稿する
        //.navbar-end
        //  nuxt-link(to="/").navbar-item ログイン
    </nav>
</template>

<script>
  export default {
    data() {
      return {
        isActive: false,
      }
    }
  } 
</script>
<style lang="sass">
$navbar-background-color: red
</style>

