<script setup>

import { ref, onMounted } from 'vue'

// Reactive state
const user = ref({ name: '', pwd: '' });
const showError = ref(false);
const showSuccess = ref(false);
const showPassword = ref(false);
const hideSubmitBtn = ref(false);

const formEl = ref();

// Methods 
const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

const submitForm = async () => {

    console.log('init login process');
    console.log('values');
    console.log(user);

    try {

        const response = await $fetch('/api/login-user', {
            method: 'POST',
            body: {
                username: user.value.name,
                password: user.value.pwd,
            },
        });

        console.log("Backend response:", response);

        if (response.userAuthObj.authSuccess) {

            showSuccess.value = true;
            hideSubmitBtn.value = true;
            showError.value = false;

        } else {

            showError.value = true;
            showSuccess.value = false;

        }

    } catch(err) {

        console.error(err);
        showError.value = true;
        showSuccess.value = false;

    }


}

onMounted(() => {
    console.log("login form is mounted");
    console.log(formEl.value);
})


</script>

<template>

    <div>
        <form ref="formEl" @submit.prevent="submitForm" method="post">
            <p>Please use the form below to login to your account.</p>

            <div class="mb-3">
                <label class="form-label" for="username"><i class="bi bi-person-fill"></i> <b>Username</b></label>
                <input v-model="user.name" class="form-control" type="text" placeholder="Enter Username" name="username" id="username" required>
            </div>

            <div class="mb-3">
                <label class="form-label" for="psw"><i class="bi bi-key-fill"></i> <b>Password</b></label>
                <div class="input-group">
                    <input :type="showPassword ? 'text' : 'password'" v-model="user.pwd" class="form-control" placeholder="Enter Password" name="pwd" id="pwd" required>
                    <button id="toggle-pwd-visible" @click="togglePassword" class="btn btn-outline-secondary" type="button">
                        <i v-if="!showPassword" class="bi bi-eye-fill"></i>
                        <i v-else class="bi bi-eye-slash-fill"></i>
                    </button>
                </div>
            </div>

            <button v-if="!hideSubmitBtn" type="submit" class="btn btn-primary">Login</button>

            <div v-if="showError" class="alert mt-3 alert-danger" role="alert">
                <i class="bi bi-exclamation-circle"></i> Authentication failed. Please check your credentials and try again.
            </div>

            <div v-if="showSuccess" class="alert mt-3 alert-success" role="alert">
                <i class="bi bi-check-circle"></i> You are now logged in. You will be redirected to your account page shortly.
            </div>
        </form>
    </div>

</template>