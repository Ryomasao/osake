<template lang="pug">
.login
  .section
    .field
      label.label email
      .control
        input.input(type="text" v-model="email")
    .field
      label.label password
      .control
        input.input(type="text" v-model="password")
    button.button(@click="login") login
</template>

<script>

  export default {
    data() {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      login() {
        this.$store.dispatch('login')
      },
    },
    mounted() {
      this.$store.dispatch('login')
    }
  }
</script>

<style lang="sass">
</style>