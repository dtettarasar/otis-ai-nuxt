<script setup>

    import { ref, onMounted, onUnmounted } from 'vue';
    import videojs from 'video.js';
    import 'video.js/dist/video-js.css';

    const props = defineProps({

        src: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            default: 'video/mp4',
        },

        autoplay: {
            type: Boolean,
            default: false,
        },
        loop: {
            type: Boolean,
            default: false,
        },
        muted: {
            type: Boolean,
            default: true, // Désactivé par défaut
        },
        poster: {
            type: String,
            default: '',
        },

    });

    // Référence pour la vidéo
    const videoRef = ref(null);
    let videoPlayer = null;

    // Initialisation et destruction de Video.js
    onMounted(() => {

        if (videoRef.value) {
            videoPlayer = videojs(videoRef.value, {
                controls: true,
                autoplay: props.autoplay,
                loop: props.loop,
                muted: props.muted,
                preload: 'auto',
                poster: props.poster,
            });
        }

    });
    
    onUnmounted(() => {
        if (videoPlayer) {
            videoPlayer.dispose(); // Détruit proprement l'instance de Video.js
            videoPlayer = null;
        }
    });

</script>

<template>

    <video
      ref="videoRef"
      class="video-js vjs-16-9"
      preload="auto"
    >
      <source :src="src" :type="type" />
    </video>

</template>

<style>

    .video-js {
        width: 100%;
    }

</style>