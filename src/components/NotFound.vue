<template>
  <div id="notfound" class="row">
    <div class="col-2"></div>
    <div class="col-8">
      <h3 class="my-4">Not Found</h3>
      <p class="lead mt-4">Oh no! It looks like this page doesn't exist. <br> Try something different</p>
      <router-link class="text-info" :to="{path:'/'}"><button type="button" class="btn btn-outline-primary btn-block">Back</button></router-link>
    </div>
    <div class="col-2"></div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.display-4{
  font-size: 2rem;
}
.img-fluid{
  max-width: 50%;
}
</style>