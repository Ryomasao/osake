<template lang="pug">
Modal.loading-modal(:showModal="showModal")
  .image-wrapper
    img(src="~/assets/images/loading.gif")
</template>

<script>
import Modal from '~/components/Modal'

export default {
  components: {
    Modal
  },
  props: {
    showModal: Boolean,
    imagePath: {
      type: String,
      default: '~/assets/images/loading.gif'
    }
  },
}
</script>

<style lang="scss" scoped>
.image-wrapper {
  text-align: center;
}
</style>