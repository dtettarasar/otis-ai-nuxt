<script setup>

    const props = defineProps({

        title: {
            type: String,
            default: 'page title here', // Classe par défaut
        },

        iconClass: {
            type: String,
            default: 'bi-1-circle-fill', // Classe par défaut
        },

    })


</script>

<template>

    <div class="container-fluid my-5">

        <div id="hero" class="p-5 text-center rounded-3">

            <i :class="[iconClass]"></i>

            <div class="separator mt-3 mb-3 rounded-3"></div>

            <h1 class="text-white">{{title}}</h1>

        </div>

    </div>

</template>

<style scoped>

#hero {
  position: relative;
  overflow: hidden;
  background: linear-gradient(45deg, #6a11cb, #2575fc, #ff0080);
  background-size: 300% 300%; /* Augmente la complexité du mouvement */
  animation: gradient 10s ease infinite alternate; /* Animation plus fluide */
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 50% 50%; }
  100% { background-position: 100% 50%; }
}

.content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding-top: 20%;
}

.separator {
    background-color: #fff;
    height: 4px;
    width: 30%;
    margin: 0 auto;
}

#hero i {
  font-size: 4rem;
  color: #fff;
}

</style>