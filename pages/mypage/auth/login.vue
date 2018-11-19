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
  import firebase from '~/plugins/firebase'

  export default {
    data() {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      async login() {

        try {
          // 新規ユーザーの作成
          //const user = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)

          // 既存ユーザーの認証 
          const user = await firebase.auth().signInWithEmailAndPassword(this.email, this.password)

          const token = await firebase.auth().currentUser.getIdToken(true)
          localStorage.setItem('token', token.idToken)
        } catch(error) {
          console.log(error)
        }
      }
    }
  }
</script>

<style lang="sass">
</style>