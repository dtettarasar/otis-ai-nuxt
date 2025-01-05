<script setup>

    // Icon and text component (horizontal layout)

    // Use Dompurify if we need to use text content from an external source (users data, api, etc... as the text is hardcoded here no need to use dompurify)
    // import DOMPurify from 'dompurify';

    // Déclaration des props
    const props = defineProps({
        iconClass: {
            type: String,
            default: 'bi-1-circle-fill', // Classe par défaut
        },
        textContent: {
            type: String,
            default: 'In eleifend sollicitudin arcu mattis vulputate. In aliquet nisl ac libero sagittis, vitae convallis neque hendrerit. Morbi aliquam ex euismod lorem ornare sodales. Pellentesque nec molestie erat, quis sodales erat.', // Texte par défaut
        },
        iconColor: {
            type: String,
            default: '#000', // Couleur par défaut (la même que dans le CSS)
        },
        textColor: {
            type: String,
            default: '#000', // Couleur par défaut (la même que dans le CSS)
        },
    })


</script>

<template>
    <div class="mt-2 mb-2 icon-text-component d-flex align-items-center">

        <div class="flex-shrink-0 p-2">
            <!-- Classe dynamique pour l'icône -->
            <i :class="[iconClass]" :style="{ color: iconColor }"></i>
        </div>

        <div class="flex-grow-1 ms-3">
            <div :style="{ color: textColor }" v-html="textContent"></div>
        </div>

    </div>
</template>

<style>

    .icon-text-component i {
        font-size: 4.2rem;
        margin: 0;
        display: contents;
    }

    .icon-text-component p {
        margin: 0;
    }

</style>