<template lang="pug">
  div
    no-ssr
     vue-tags-input(v-model="tag" 
                    :tags="tags"
                    placeholder="タグを入力する"
                    @tags-changed="emit")
</template>
<script>
  import VueTagsInput from '@johmun/vue-tags-input'
  export default {
    components: {
      VueTagsInput,
    },
    data() {
      return {
        tag: '',
        tags: [],
      }
    },
    methods: {
      emit(newTags) {
        this.tags = newTags 
        const data = []
        for(const key in this.tags) {
          data.push(this.tags[key].text)
        }
        this.$emit('put', data)
      },
      reset() {
        this.tags = []
        this.$emit('put', [])
      }
    }
  }
</script>

<style lang="sass">
// BulumaのスタイルがVueTagsInputコンポーネントに悪影響があるので、ここでリセット
.content:not(:last-child)
  margin-bottom: 0
.input 
  height: auto
.tags:last-child
  margin-bottom: 0
</style>