<template lang="pug">
  section.section
    .container
      AdminPostArtcle(
        :loaded-article="loadedPost" 
        :id="id" 
        @onSubmit="submit")
    LoadingModal(:showModal="showModal")
</template>

<script>
  import AdminPostArtcle from '~/components/AdminPostArticle'
  import LoadingModal from '~/components/LoadingModal'
  import firebase from '~/plugins/firebase'

  export default {
    middleware: ['auth'],
    components: {
      AdminPostArtcle,
      LoadingModal
    },
    async asyncData(context) {
      const id = context.params.id
      const url = `/articles/${id}.json`
      const loadedPost = await context.app.$axios.$get(url)
      return { loadedPost: loadedPost , id: context.params.id }
    },
    data() {
      return {
        showModal: false
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
          console.log('erorr', error)
        })

        this.showModal = false

        this.$notify({
          group: 'success',
          title: 'メッセージ',
          text: '更新しました！'
        });
      }
    }
  }
</script>