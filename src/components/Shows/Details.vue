<template>
  <div id="details" class="row">
    <div class="col-2"></div>
    <div class="col-8">
      <img alt="Logo" class="img-fluid my-4" src="@/assets/netflix.svg">
      <h3 class="my-4">{{ title }}</h3>
      <ul class="list-group">
        <li class="list-group-item">Network: {{ network }}</li>
        <li class="list-group-item">Seasons: {{ numberOfSeasons }}</li>
        <li class="list-group-item">Is Current: <span v-if="isCurrent">Yes</span><span v-else>No</span></li>
        <li class="list-group-item">Genres: {{ genres.join(' / ') }}</li>
      </ul>
      <button type="button" class="btn btn-outline-info btn-block"><router-link class="text-info" :to="{path:'/'}">Back</router-link></button>
    </div>
    <div class="col-2"></div>
  </div>
</template>

<script>
import { db } from '@/firebase';

export default {
  name: 'Details',
  data() {
    return {
      title: '',
      network: '',
      genres: '',
      numberOfSeasons: 0, 
      isCurrent: ''
    }
  },
  mounted() {
    db.collection("shows").doc(this.$route.params.id).get()
    .then(datashow => {
      const dojoshow = datashow.data();
      this.title = dojoshow.title
      this.network = dojoshow.network
      this.genres = dojoshow.genres
      this.numberOfSeasons = dojoshow.numberOfSeasons
      this.isCurrent = dojoshow.isCurrent
      console.log(dojoshow)
    });
  }
}
</script>