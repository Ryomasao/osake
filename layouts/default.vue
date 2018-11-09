<template lang="pug">
  div
    Navbar
    nuxt
    //pluginでssr:falseにしても、vue-notificationでfalse no-ssr ver をつかってもだめ>
    no-ssr
      notifications(
      group="success"
      position="bottom right"
      animation-type="velocity"
      :speed="500"
      )
    no-ssr
      notifications(
      group="error"
      classes="vue-notification warn"
      position="bottom right"
      animation-type="velocity"
      :speed="500"
      )
</template>
<script>
import Navbar from '@/components/Navbar'
export default {
  components: {
    Navbar
  },
  data() {
    return {
      isActive: false,
    }
  },
  methods: {

  },
}
</script>

<style lang="sass">
</style>

