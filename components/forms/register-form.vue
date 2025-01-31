<script setup>

import { ref, onMounted } from 'vue'

</script>

<template>
    
    <div>

        <form>

            <p>Please use the form below to create your account.</p>

            <div class="mb-3">

                <label class="form-label" for="username"><i class="bi bi-person-fill"></i> <b>Username</b></label>
                <input class="form-control" type="text" placeholder="Enter Username" name="username" id="username" required>

            </div>

            <div class="mb-3">

                <label class="form-label" for="email"><i class="bi bi-envelope-at-fill"></i> <b>Email</b></label>
                <input class="form-control" type="email" placeholder="Enter Email" name="email" id="email" required>

            </div>

        </form>

    </div>

</template>
