<script setup>
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
</script>

<template>
  <div>

    <!-- Contenu principal de la page -->
    <div>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>

    <!-- Annonceur de route pour l’accessibilité -->
    <NuxtRouteAnnouncer />

  </div>
</template>
