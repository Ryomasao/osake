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
      async submit(article) {
        this.showModal = true
        await this.store.dispatch('editPost', this,id, post)
        .catch(error => {

        })

        let storageRef = firebase.storage().ref()
        let imagesRef = storageRef.child('images')
        let spaceRef = imagesRef.child(article.inputImage.name)

        try {
          if(!article.inputImage.existedImage) {
            const snapshot = await spaceRef.put(article.inputImage.image)
            let bucketName = 'osake-d4cfe.appspot.com'
            let filePath = spaceRef.fullPath
            const imagePath = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(filePath)}?alt=media`
            article.imagePath = imagePath
          }
          await this.$axios.$put('https://osake-d4cfe.firebaseio.com/articles/' + this.id + '.json', article)
        } catch (error) {
          console.log(error)
        }

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