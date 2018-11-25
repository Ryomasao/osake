<template lang="pug">
form(@submit.prevent="onSave")
  .field
    label.label しゃしん
    image-input(@put="setImage" ref="image")
  .field
    label.label 飲んだ日
    .control
      datepicker(input-class="input" v-model="article.date" format="yyyy/MM/dd")
  .field
    label.label カテゴリ
    .control
     tags-input(@put="tags => article.tags = tags" ref="tags")
  .field
    label.label 評価
    .buttons.are-medium
      a.button(@click="article.favos++") good
      a.button(@click="article.favos > 0 && article.favos--") bad
    .favos-flex
      figure.image.stamp(v-for="n in article.favos")
        img(src="~/assets/images/favo.svg")
  .field
    label.label めも
    .control
      textarea.textarea.is-info(type="text" placeholder="メモとかに使ってね" v-model="article.memo")
  .form-footer
    nuxt-link(to="/")
      button(type="button").button 戻る
    button.button 投稿する
</template>
<script>
  import TagsInput from '~/components/TagsInput'
  import ImageInput from '~/components/ImageInput'
  import Datepicker from 'vuejs-datepicker'
  export default {
    components: {
      Datepicker,
      ImageInput,
      TagsInput,
    },
    props: {
      loadedArticle: Object,
      isUpdate: Boolean
    },
    data() {
      return {
        article: this.loadedArticle ? {... this.loadedArticle} 
        : {
          inputImage: {},
          imagePath: '',
          tags: [],
          date: new Date(),
          memo: '',
          favos: 0
        },
        errors: [],
      }
    },
    mounted() {
      if(this.loadedArticle) {
        this.$refs.image.previewSrc = this.loadedArticle.imagePath

        // 過去データにない場合がある
        if(!this.article.inputImage) {
          this.article.inputImage = {}
        }
        this.article.inputImage.existedImage = true
        this.$refs.tags.tags = this.loadedArticle.tags
      }
    },
    methods: {
      setImage(image) {
        this.article.inputImage = image
      },
      checkForm() {
        this.errors = [];
        if(Object.keys(this.article.inputImage).length === 0) {
          this.errors.push('しゃしんは必須だよ')
        }

        if(this.errors.length > 0) {
          return false
        }
        return true
      },
      onSave() {
        if(!this.checkForm()) {
          this.$notify({
            group: 'error',
            title: 'メッセージ',
            text: this.errors[0]
          })
          return 
        }
        this.$emit('onSubmit', this.article)
      },
      reset() {
        for(const key in this.article) {
          this.article[key] = ''
        }

        //子コンポーネントの値をリセットする
        this.$refs.image.reset()
        this.$refs.tags.reset()

        this.article.date = new Date()
      },
    }
  }
</script>

<style lang="scss">
.form-footer {
  display: flex;
  justify-content: space-between;
}

.stamp {
  width: 10%;
}

.favos-flex {
  display: flex;
  flex-wrap: wrap;
}

</style>

