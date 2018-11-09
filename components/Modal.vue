<template lang="pug">
.modal(:style="showModal ? 'display: block' : 'display: none'")
  .modal-background
  .modal-content
    .image-wrapper
      img(src="~/assets/images/loading.gif")
</template>

<script>
  export default {
    props: {
      showModal: Boolean
    },
  }
</script>

<style lang="sass">
.image-wrapper
  height: 100vh
  display: flex
  justify-content: center
  align-items: center
</style>