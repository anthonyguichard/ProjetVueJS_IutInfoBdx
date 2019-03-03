<!-- Vue pour le formulaire qui permet d'ajouter un nouveau film -->

<template>
<form enctype="multipart/form-data">
  <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    <strong>Erreur :</strong> {{ error }}
  </div>

  <div class="form-group text-info">
    <label for="title">Titre</label>
    <input type="text" placeholder="ex: The Revenant" class="form-control" id="title" v-model="movie.title">
  </div>

  <div class="form-group text-info">
    <label for="year">Année</label>
    <input type="number" placeholder="ex: 2015" class="form-control" id="year" v-model="movie.year">
  </div>

  <div class="form-group text-info">
    <label for="language">Langue</label>
    <input type="text" placeholder="ex: Anglais" class="form-control" id="language" v-model="movie.language">
  </div>

  <div class="form-group text-info">
    <label for="genre">Genre</label>
    <input type="text" placeholder="ex: Drame/Thriller" class="form-control" id="genre" v-model="movie.genre">
  </div>

  <h6 class="text-info">Réalisateur :</h6>
  <div class="form-row">
    <div class="form-group text-info col-lg-4">
      <label for="director_name">Nom</label>
      <input type="text" placeholder="ex: Alejandro González Iñárritu" class="form-control" id="director_name" v-model="movie.director.name">
    </div>

    <div class="form-group text-info col-lg-4">
      <label for="director_nationality">Nationalité</label>
      <input type="text" placeholder="ex: Mexicain" class="form-control" id="director_nationality" v-model="movie.director.nationality">
    </div>

    <div class="form-group text-info col-lg-4">
      <label for="director_birthdate">Date de naissance</label>
      <input type="date" placeholder="ex: 1963-08-15" class="form-control" id="director_birthdate" v-model="movie.director.birthdate">
    </div>
  </div>

  <div class="form-row">
    <div class="form-group text-info col-lg-6">
      <label for="poster">Poster</label>
      <input type="file" ref="posterInput" class="form-control-file" id="poster" accept=".png, .jpg, .jpeg" v-on:change="processFile($event)">
      <button type="button" class="btn btn-outline-light d-block mt-3" v-if="movie.poster" v-on:click="movie.poster = null">Supprimer</button>
    </div>

    <div class="form-group text-info col-lg-6" v-if="movie.poster || preview">
      <p>Poster actuel :</p>
      <img :src="movie.poster ||  preview" alt="Poster actuel" class="img-fluid">
    </div>
  </div>
</form>
</template>

<!-- Javascript qui gère l'affiche du nouveau film que l'on ajoute -->
<script>
export default {
  props: ['movie', 'poster'],
  data() {
    return {
      error: null,
      preview: null,
      reader: new FileReader(),
      searching: false
    };
  },
  methods: {
    processFile($event) {
      this.movie.poster = null;

      this.poster.file = $event.target.files[0];
      var self = this;
      this.reader.onload = function (e) {
        self.preview = e.target.result;
      };

      if (this.poster.file) {
        this.reader.readAsDataURL(this.poster.file);
      }
    },

    searchPoster() {
      this.searching = true;
      this.$store.dispatch('searchPosterInAPI', this.movie.title).then((response) => {
        this.searching = false;
        if (response.error !== undefined) {
          this.error = response.error;
        } else {
          this.movie.poster = response.poster_url;

          this.$refs.posterInput.value = "";
          this.poster.file = null;
          this.preview = null;
        }
      });
    }
  }
}
</script>
