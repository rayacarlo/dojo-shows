<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8">
        <img alt="Logo" class="img-fluid my-4" src="./assets/netflix.svg">
        <h3>Welcome to Dojoflix</h3>
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
              <td>{{ show.title }}</td>
              <td>{{ show.network }}</td>
              <td>{{ show.numberOfSeasons }}</td>
              <td>{{ show.isCurrent }}</td>
              <td>{{ show.genres.join(' / ') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase';  
export default {
    name: "App",
    data() {
        return {
            shows: []
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
.img-fluid{
  max-width: 20rem;
}
</style>
