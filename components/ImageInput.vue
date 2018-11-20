<template lang="pug">
  div
   .file-wrapper(v-if="!previewSrc")
     label(for="file").file あっぷろーど
     input(type="file" id="file" @change="onChange" value="button" style="display:none")
   .file-wrapper(v-else)
     img(:src="previewSrc").preview
     button(type="button" @click="reset").delete X
   canvas(ref="canvas" width="225" height="300" style="display:none").canvas
</template>

<script>
  export default {
    data() {
      return {
        image: '',
        fileName: '',
        previewSrc: '',
        ctx: null,
      }
    },
    methods: {
      onChange(e) {
        this.existedImage = false
        if(!e.target.files[0]) return 
        this.image = e.target.files[0]
        this.fileName= e.target.files[0].name
        this.previewSrc = window.URL.createObjectURL(this.image)
        this.resize(this.previewSrc)
      },
      resize(objectUrl) {
        const image = new Image() 
        image.onload =() => {
          //exifの情報を取得し、orientationを取得

          //orientationに合わせて、画像を回転とかさせる
          //canvasでリサイズすると、exifの情報が消え、ブラウザがいい感じに表示できなくなるから
          //this.ctx.translate(100, 100)
          let width = this.$refs.canvas.width
          let height = this.$refs.canvas.height

          //this.ctx.translate(parseInt(width / 2), parseInt(height / 2));
          this.ctx.rotate(90 * Math.PI / 180)
          this.ctx.translate(0 , -225);
          this.ctx.drawImage(image, 0, 0, 300, 225)

          this.$refs.canvas.toBlob((blob) => {
            this.$emit('put', { image: blob, name: this.fileName })
          })
        }
        image.src= objectUrl
      },
      reset() {
        this.image = null
        this.previewSrc = null
        this.$emit('put', {})
      }
    },
    mounted() {
      this.ctx = this.$refs.canvas.getContext('2d')
    }
  }
</script>
<style lang="sass">
.file-wrapper
  position: relative
.delete 
  position: absolute
  top: 0
  right: 0.1rem

.canvas
  border: 1px solid black
</style>