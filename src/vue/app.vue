<!-- Vue pour la barre de navigation -->

<template>
<div style="background-color: #130E0A;">
  <nav class="navbar navbar-expand-lg navbar-dark bg-info mb-4">
    <router-link :to="{ name: 'home' }" class="navbar-brand" style="margin: auto">{{ title }}</router-link>
  </nav>
  <main>
    <router-view></router-view>
  </main>
</div>
</template>

<script>
export default {
  data() {
    return {
      title: 'AntHollywood Films'
    }
  }
}
</script>
