<template>
  <div id="edit" class="row">
    <div class="col-3"></div>
    <div class="col-6">
      <h3 class="my-4">Edit this show</h3>
      <form class="mb-4" @submit.prevent="editShow">
        <div class="form-row">
          <div class="col-6 my-1">
            <input type="text" class="form-control" placeholder="Title" v-model="title" required>
          </div>
          <div class="col-6 my-1">
            <input type="text" class="form-control" placeholder="Network" v-model="network" required>
          </div><br>
          <div class="col-6 my-1">
            <input type="text" class="form-control" placeholder="Genres" v-model="genres" required>
          </div>
          <div class="col-6 my-1">
            <input type="number" class="form-control" placeholder="Numbers of Seasons" v-model="numberOfSeasons" required>
          </div>
          <div class="col-6 my-1">
            <label class="mr-sm-2 sr-only" for="inlineFormCustomSelect">Preference</label>
            <select class="custom-select mr-sm-2" id="inlineFormCustomSelect" v-model="isCurrent" required>
              <option value>Is current?</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div class="col-6">
            <button type="submit" class="btn btn-outline-primary btn-block">Save</button>
          </div>
          <div class="col-12">
            <router-link :to="{path:'/'}"><button type="button" class="btn btn-outline-primary btn-block">Back</button></router-link>
          </div>
        </div>
      </form>
    </div>
    <div class="col-3"></div>
  </div>
</template>

<script>
import { db } from '@/firebase';

export default {
  name: 'Edit',
  data() {
    return {
      title: '',
      network: '',
      genres: [],
      numberOfSeasons: 0, 
      isCurrent: ''
    }
  },
  props: {
    id: String
  },
  mounted() {
    db.collection("shows").doc(this.$route.params.id).get()
    .then(dataShow => {
      const myShow = dataShow.data();
      this.title = myShow.title;
      this.network = myShow.network;
      this.genres = myShow.genres.join(' / ');
      this.numberOfSeasons = parseInt(myShow.numberOfSeasons);
      this.isCurrent = myShow.isCurrent
    });
  },
  methods: {
    editShow() {
      const question = confirm('Confirm the changes?')
      if (question == false) { return; }
      db.collection("shows").doc(this.$route.params.id).update({
        title: this.title,
        network: this.network,
        genres: this.genres.split(' / '),
        numberOfSeasons: this.numberOfSeasons,
        isCurrent: this.isCurrent
      })
      .then(() => {
        this.$router.push('/');
      })
    }
  }
}
</script>