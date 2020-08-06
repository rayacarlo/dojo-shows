<template>
  <div id="shows" class="row">
    <div class="col-2"></div>
    <div class="col-8">
      <img alt="Logo" class="img-fluid my-4" src="@/assets/netflix.svg">
      <h3 class="my-4">Welcome to Dojoflix</h3>
      <table class="table table-bordered my-4">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Network</th>
            <th scope="col">Seasons</th>
            <th scope="col">Is Current</th>
            <th scope="col">Genres</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(show, i) in shows" v-bind:key="i">
            <td><router-link class="text-info" :to="{path:'/shows/' + show.id}">{{ show.title }}</router-link></td>
            <td>{{ show.network }}</td>
            <td>{{ show.numberOfSeasons }}</td>
            <td><span v-if="show.isCurrent"><i class="fas fa-check"></i></span><span v-else><i class="fas fa-times"></i></span></td>
            <td>{{ show.genres.join(' / ') }}</td>
          </tr>
        </tbody>
      </table>
      <h3 class="my-4">Add a show</h3>
      <form class="mb-4" @submit="addShow">
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
            <button type="submit" class="btn btn-outline-info btn-block">Add</button>
          </div>
        </div>
      </form>
    </div>
    <div class="col-2"></div>
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
    addShow(ev) {
      ev.preventDefault();
      db.collection("shows").add({
        title: this.new_title,
        network: this.new_network,
        genres: this.new_genres.split(" / "),
        numberOfSeasons: this.new_seasons,
        isCurrent: this.new_iscurrent == "true" ? true : false
      });
      this.new_title = "";
      this.new_network = "";
      this.new_genres = "";
      this.new_seasons = "";
      this.new_iscurrent = ""
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
.img-fluid{
  max-width: 20rem;
}
</style>