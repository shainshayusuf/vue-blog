<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">{{loadedPost.title}}</h1>
      <div class="post-details">
        <div class="post-detail">Last updated on {{loadedPost.updatedDate}}</div>
        <div class="post-detail">Written by {{loadedPost.author}}</div>
      </div>
      <p>{{loadedPost.content}}</p>
    </section>
    <section class="post-feedback">
      <p>
        Let me know What you think about this post,send a mail to
        <a href="mailto:shainshayusuf@gmail.com">shainshayusuf@gmail.com</a>.
      </p>
    </section>
  </div>
</template>
<script>
export default {
  asyncData(context) {
   return new Promise((resolve,reject)=>{
      setTimeout(() => {
      resolve( {
        loadedPost: {
          id: "1",
          title: "First post (ID:" + context.params.id + ")",
          previewText: "Herman Ostrovskiy",
          author: "Herman",
          updatedDate: new Date(),
          content: "Some dummy text other preview text",
          thumbnail:
            "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
        }
      });
    }, 1000);
   }).then(data =>{
     return data
   }).catch(e =>{
     context.error(new Error())
   })
  }
};
</script>
<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>