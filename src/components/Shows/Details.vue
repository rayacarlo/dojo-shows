<template>
  <div id="details" class="row">
    <div class="col-3"></div>
    <div class="col-6">
      <h3 class="my-4">{{ title }}</h3>
      <ul class="list-group">
        <li class="list-group-item">Network: {{ network }}</li>
        <li class="list-group-item">Seasons: {{ numberOfSeasons }}</li>
        <li class="list-group-item">Current: <span v-if="isCurrent"><i class="fas fa-check"></i></span><span v-else><i class="fas fa-times"></i></span></li>
        <li class="list-group-item">Genres: {{ genres.join(' / ') }}</li>
      </ul>
      <router-link :to="{path:'/'}"><button type="button" class="btn btn-outline-primary btn-block">Back</button></router-link>
    </div>
    <div class="col-3"></div>
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