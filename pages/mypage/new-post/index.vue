<template lang="pug">
  section.section
    .container
      AdminPostArticle(@onSubmit="submit" ref="adminPostArticle")
    Modal(:showModal="showModal")
</template>

<script>
  import AdminPostArticle from '~/components/AdminPostArticle'
  import Modal from '~/components/Modal'
  import firebase from '~/plugins/firebase'

  export default {
    components: {
      AdminPostArticle,
      Modal
    },
    data() {
      return {
        showModal: false
      }
    },
    methods: {
      async submit(article) {
        this.showModal = true

        let storageRef = firebase.storage().ref()
        let imagesRef = storageRef.child('images')
        let spaceRef = imagesRef.child(article.inputImage.name)

        try {
          const snapshot = await spaceRef.put(article.inputImage.image)
          let bucketName = 'osake-d4cfe.appspot.com'
          let filePath = spaceRef.fullPath
          // 画像のURLはこんな形式に設定されるみたい
          const imagePath = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(filePath)}?alt=media`
          article.imagePath = imagePath
          await this.$axios.$post('https://osake-d4cfe.firebaseio.com/articles.json', article)
        } catch (error) {
          console.log(error)
        }

        this.showModal = false

        this.$notify({
          group: 'success',
          title: 'メッセージ',
          text: '保存しました！'
        });

        //子コンポーネントの値をリセットする
        this.$refs.adminPostArticle.reset()

      }
    }
  }
</script>

<style lang="sass">
.image-wrapper
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
</style>