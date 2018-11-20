<template lang="pug">
.modal(:class="showModal ? 'is-active' : ''")
  .modal-background
  .modal-content
      slot
</template>

<script>
  export default {
    props: {
      showModal: Boolean
    },
  }
</script>

<style lang="scss">
</style>