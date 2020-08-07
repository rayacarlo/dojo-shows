<template>
  <div id="shows" class="row">
    <div class="col-1"></div>
    <div class="col-10">
      <h3 class="my-4">Welcome to Dojoflix</h3>
      <table class="table table-bordered my-4">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Network</th>
            <th scope="col">Seasons</th>
            <th scope="col">Current</th>
            <th scope="col">Genres</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="show in orderedShows" v-bind:key="show.i">
            <td><router-link class="text-primary" :to="{path:'/shows/' + show.id}">{{ show.title }}</router-link></td>
            <td>{{ show.network }}</td>
            <td>{{ show.numberOfSeasons }}</td>
            <td><span v-if="show.isCurrent"><i class="fas fa-check"></i></span><span v-else><i class="fas fa-times"></i></span></td>
            <td>{{ show.genres.join(' / ') }}</td>
            <td>
              <router-link :to="{path: `/shows/${show.id}/edit`}"><i class="far fa-edit"></i></router-link>
            </td>
            <td><a href="#" @click.prevent="removeShow(show.id)"><i class="far fa-trash-alt"></i></a> </td>
          </tr>
        </tbody>
      </table>
      <h3 class="my-4">Add a show</h3>
      <form class="mb-4" @submit.prevent="addShow">
        <div class="form-row">
          <div class="col-6 my-1">
            <input type="text" class="form-control" placeholder="Title" v-model="new_title" required>
          </div>
          <div class="col-6 my-1">
            <input type="text" class="form-control" placeholder="Network" v-model="new_network" required>
          </div><br>
          <div class="col-6 my-1">
            <input type="text" class="form-control" placeholder="Genres" v-model="new_genres" required>
          </div>
          <div class="col-6 my-1">
            <input type="number" class="form-control" placeholder="Numbers of Seasons" v-model="new_seasons" required>
          </div>
          <div class="col-6 my-1">
            <label class="mr-sm-2 sr-only" for="inlineFormCustomSelect">Preference</label>
            <select class="custom-select mr-sm-2" id="inlineFormCustomSelect" v-model="new_iscurrent" required>
              <option value>Is current?</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div class="col-6">
            <button type="submit" class="btn btn-outline-primary btn-block">Add</button>
          </div>
        </div>
      </form>
    </div>
    <div class="col-1"></div>
  </div>
</template>

<script>
import { db } from '@/firebase'

export default {
  name: "Shows",
  data() {
    return {
      shows: [],
      new_title: "",
      new_network: "",
      new_genres: [],
      new_seasons: "",
      new_iscurrent: ""
    }
  },
  methods: {
    addShow() {
      db.collection("shows").add({
        title: this.new_title,
        network: this.new_network,
        genres: this.new_genres.split(" / "),
        numberOfSeasons: parseInt(this.new_seasons),
        isCurrent: this.new_iscurrent == "true" ? true : false
      });
      this.new_title = "";
      this.new_network = "";
      this.new_genres = "";
      this.new_seasons = "";
      this.new_iscurrent = ""
    },
    removeShow(showId) {
      const question = confirm('Do you really want to remove this item?');
      if (question == false) { return; }
      db.collection("shows").doc(showId).delete();
    }
  },
  computed: {
    orderedShows() {
      const shows = this.shows;
      shows.sort((a,b) => a.title.localeCompare(b.title));
      return shows;
    }
  },
  firestore() {
    return {
      shows: db.collection('shows')
    }
  }
}

</script>

<style>
</style>