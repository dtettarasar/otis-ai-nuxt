<template>

    <div>

        <!-- Menu universel -->
        <nav>
            <ul>
                <li><a href="/">Accueil</a></li>
                <li><a href="/about">À propos</a></li>
            </ul>
        </nav>

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
  