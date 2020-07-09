<template>
    <section class="post-list">
      <Postpreview
        v-for="post in posts"
        :key="post.id"
        :id="post.id"
        :is-admin="isAdmin"
        :thumbnail="post.thumbnail"
        :title="post.title"
        :previewText="post.previewText"
      />
      
    </section>
</template>

<script>
import Postpreview from '@/components/Posts/Postpreview'
export default {
    components:{
    Postpreview
  },
  props:{
    isAdmin:{
      type:Boolean,
      default:false
    },
    posts:{
        type:Array,
        required:true
    }
  }
}
</script>
<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

</style>