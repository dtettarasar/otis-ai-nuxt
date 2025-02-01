<script setup>

import { reactive, ref, onMounted, computed } from 'vue'

// Reactive states

const user = reactive({

    name: '', 
    pwd: '',
    pwdRepeat: '',
    email:'',

});

const showError = ref(false);
const showSuccess = ref(false);
const showPassword = ref(false);
const hideSubmitBtn = ref(false);
const showPasswordRepeat = ref(false);

const formEl = ref();

// Computed
const passwordsMatch = computed(() => {
    return user.pwd === user.pwdRepeat;
})

// Methods 
const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

const togglePasswordRepeat = () => {
    showPasswordRepeat.value = !showPasswordRepeat.value;
};

const submitForm = async () => {

    console.log("init register process");
    console.log('values');
    console.log(user);

    console.log("password match: ");
    console.log(passwordsMatch.value);

};

const createUserReq = async () => {

    try {

        const response = await $fetch('/api/register-user', {
            method: 'POST',
            body: {
                username: user.name,
                password: user.pwd,
                email: user.email,
            },
        });

        console.log("Backend response:", response);

    } catch (error) {

        console.error(err);
        showError.value = true;
        showSuccess.value = false;

    }

}

onMounted(() => {
    console.log("register form is mounted");
    console.log(formEl.value);
})

</script>

<template>
    
    <div>

        <form ref="formEl" @submit.prevent="submitForm" method="post">

            <p>Please use the form below to create your account.</p>

            <div class="mb-3">

                <label class="form-label" for="username"><i class="bi bi-person-fill"></i> <b>Username</b></label>
                <input v-model="user.name" class="form-control" type="text" placeholder="Enter Username" name="username" id="username" required>

            </div>

            <div class="mb-3">

                <label class="form-label" for="email"><i class="bi bi-envelope-at-fill"></i> <b>Email</b></label>
                <input v-model="user.email" class="form-control" type="email" placeholder="Enter Email" name="email" id="email" required>

            </div>

            <div class="mb-3">

                <label class="form-label" for="psw"><i class="bi bi-key-fill"></i> <b>Password</b></label>

                <div class="input-group">

                    <input :type="showPassword ? 'text' : 'password'" v-model="user.pwd" class="form-control" placeholder="Enter Password" name="pwd" id="pwd" required>

                    <button @click="togglePassword" class="btn btn-outline-secondary" type="button">
                        <i v-if="!showPassword" class="bi bi-eye-fill"></i>
                        <i v-else class="bi bi-eye-slash-fill"></i>
                    </button>

                </div>

            </div>

            <div class="mb-3" >

                <label class="form-label" for="psw-repeat"><i class="bi bi-key-fill"></i> <b>Repeat Password</b></label>

                <div class="input-group">

                    <input v-bind:type="showPasswordRepeat ? 'text' : 'password'" v-model="user.pwdRepeat" class="form-control" placeholder="Repeat Password" name="pwd-repeat" id="pwd-repeat" required>

                    <button @click="togglePasswordRepeat" class="btn btn-outline-secondary" type="button">
                        <i v-if="!showPasswordRepeat" class="bi bi-eye-fill"></i>
                        <i v-else class="bi bi-eye-slash-fill"></i>
                    </button>

                </div>

            </div>

            <div class="text-to-login">
                <p style="display:inline-block">Already have an account? </p>
                <p><strong><router-link to="/login">Login here!</router-link></strong></p>
            </div>

            <button v-if="!hideSubmitBtn" type="submit" class="btn btn-primary">Create account</button>

            <div v-if="!passwordsMatch" class="alert mt-3 alert-danger" role="alert">
                <i class="bi bi-exclamation-circle"></i> Please make sure your password match.
            </div>

        </form>

    </div>

</template>
