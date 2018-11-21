<template lang="pug">
  section.section
    .container
      AdminPostArticle(@onSubmit="submit" ref="adminPostArticle" :propUserId="userId")
    UploadingModal(:showModal="showModal")
    NotifyModal(:showModal="isError" 
    title="ごめんね" 
    :message="message"
    :buttonText="buttonText"
    :buttonMethod="auth"
    )
</template>

<script>
  import AdminPostArticle from '~/components/AdminPostArticle'
  import UploadingModal from '~/components/UploadingModal'
  import NotifyModal from '~/components/NotifyModal'

  export default {
    middleware: ['auth'],
    components: {
      AdminPostArticle,
      UploadingModal,
      NotifyModal
    },
    data() {
      return {
        showModal: false,
        isError: false,
        message: '',
        buttonText: '',
      }
    },
    computed: {
      userId() {
        // SSR時にuserはいないのでエラーになるのを回避する 
        // AdminPostArticleにno-ssrつけたけど意味がなかった
        if(this.$store.getters.user) {
          return this.$store.getters.user.uid
        }
      }
    },
    methods: {
      async submit(post) {
        this.showModal = true
        const result = await this.$store.dispatch('createPost', post)
        .catch(error => {
          this.showModal = false
          this.isError = true
          if(error.statusCode === 401) {
            this.message = '投稿した際にエラーになってしまったよ。ログインしなおすとおなおるかも'
            this.buttonText = '再度、ログインする'
          } else {
            this.message = 'なんかだめかも'
            console.log(error)
          }
        })

        if(this.isError) return
        this.showModal = false

        this.success()
      },
      success() {
        this.$notify({
          group: 'success',
          title: 'メッセージ',
          text: '保存しました！'
        });

        //子コンポーネントの値をリセットする
        this.$refs.adminPostArticle.reset()
      },
      auth() {
        this.$store.dispatch('auth')
      }
    }
  }
</script>

<style lang="scss">
</style>