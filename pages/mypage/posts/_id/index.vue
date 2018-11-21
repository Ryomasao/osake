<template lang="pug">
  section.section
    .container
      AdminPostArtcle(
        :loaded-article="loadedPost" 
        :id="id" 
        @onSubmit="submit")
    UploadingModal(:showModal="showModal")
    NotifyModal(:showModal="isError" 
    title="ごめんね" 
    :message="message"
    :buttonText="buttonText"
    :buttonMethod="auth"
    )
</template>

<script>
  import AdminPostArtcle from '~/components/AdminPostArticle'
  import UploadingModal from '~/components/UploadingModal'
  import NotifyModal from '~/components/NotifyModal'

  export default {
    middleware: ['auth'],
    components: {
      AdminPostArtcle,
      UploadingModal,
      NotifyModal
    },
    async asyncData(context) {
      const id = context.params.id
      const url = `/articles/${id}.json`
      const loadedPost = await context.app.$axios.$get(url)
      return { loadedPost: loadedPost , id: context.params.id }
    },
    data() {
      return {
        showModal: false,
        isError: false,
        message: '',
        buttonText: '',
      }
    },
    methods: {
      async submit(post) {
        this.showModal = true
        await this.$store.dispatch('editPost', {
          id: this.id,
          post: post
        })
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

        this.$notify({
          group: 'success',
          title: 'メッセージ',
          text: '更新しました！'
        });
      },
      auth() {
        this.$store.dispatch('auth')
      }
    }
  }
</script>