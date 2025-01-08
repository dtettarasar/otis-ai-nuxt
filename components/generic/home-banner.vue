<template>


    <div class="container-fluid my-5">

        <div id="hero" class="p-5 text-center rounded-3">

            <i class="main-icon text-white bi bi-feather"></i>
            <h1 class="text-white">Otis AI</h1>
            <p class="text-white col-lg-8 mx-auto fs-5">
                Your Digital Scribe for SEO-Ready Brilliance
            </p>

            <div class="d-flex justify-content-center flex-row flex-wrap gap-2">

                <a href="#" class="btn btn-light btn-lg px-4" type="button">
                    <i class="bi bi-lightning-fill"></i> Let’s get writing – Generate an article!
                </a>

                <a to="#" class="btn btn-light btn-lg px-4" type="button">
                    <i class="bi bi-person-lines-fill"></i> Sign up now and start creating amazing content!
                </a>

            </div>

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

    .main-icon {
    font-size: 5rem;
    }

</style>