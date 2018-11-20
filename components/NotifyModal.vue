<template lang="pug">
Modal.loading-modal(:showModal="showModal")
  .box
    .title {{ title }}
    p {{ message }}
    button.button(type="button" @click="buttonMethod" v-if="buttonText") {{ buttonText }}
</template>

<script>
import Modal from '~/components/Modal'

export default {
  components: {
    Modal
  },
  props: {
    showModal: Boolean,
    title: String,
    message: String,
    buttonText: String,
    buttonMethod: Function,
  },
}
</script>

<style lang="scss" scoped>
.box {
  background-color: #fff;
}
</style>