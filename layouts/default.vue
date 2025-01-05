<template>

    <div>

        <layout-nav-bar></layout-nav-bar>

        <!-- Exemple d’en-tête global -->
        <header>
            <h1>Mon Application Nuxt</h1>
        </header>

        <main>
            <slot></slot>
        </main>

        <!-- Exemple de pied de page global -->
        <footer>
            <p>&copy; 2024 Mon Application</p>
        </footer>

    </div>

</template>
  