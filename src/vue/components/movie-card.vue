<!-- Vue pour l'affichage et les informations d'un film dans la liste des films -->

<template>
<div class="card bg-info mb-3">
  <img :src="movie.poster || 'no-poster.png'" alt="Movie Image" class="card-img-top">
  <div class="card-body">
    <h5 class="card-title text-black">{{ movie.title }} ({{ movie.year }})</h5>
    <p class="card-text">Réalisé par {{ movie.director.name }}</p>
  </div>
  <div class="card-footer bg-info d-flex align-items-center justify-content-between">
    <small class="float-left text-white">Note : {{ movieRate }} / 5 ({{ movie.ratings.length }} votes)</small>
    <router-link :to="{ name: 'movie', params: { id: movie.id } }" class="float-right text-white card-link">En savoir plus</router-link>
  </div>
</div>
</template>

<!-- JavaScript pour le calcul des notes d'un film -->
<script>
export default {
  props: ["movie"],
  computed: {
    movieRate() {
      if (this.movie.ratings.length == 0) {
        return 'Non noté';
      }
      return Math.round(this.movie.ratings.reduce((a, b) => a + b, 0) / this.movie.ratings.length * 10) / 10;
    }
  }
}
</script>
<style>
  .card-img-top {
    height: 250px;
    object-fit: cover;
  }
</style>