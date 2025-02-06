<script setup>

import { reactive, ref, onMounted, computed } from 'vue'

// Reactive states

const user = reactive({

    name: '', 
    pwd: '',
    pwdRepeat: '',
    email:'',

});

const state = reactive({
    showError: false,
    showSuccess: false,
    showPassword: false,
    hideSubmitBtn: false,
    showPasswordRepeat: false,
});

const formEl = ref();

//regex to test the param validity:
const validUsernameRegex = /^[a-zA-Z0-9]+$/;
const securePwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const validEmailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

// Computed
const passwordsMatch = computed(() => {
    return user.pwd === user.pwdRepeat;
});

const passwordSecure = computed(() => {

    return securePwdRegex.test(user.pwd);

});

const userNameValid = computed(() => {

    return validUsernameRegex.test(user.name);

});

const emailValid = computed(() => {

    return validEmailRegex.test(user.email);

});

const allParamsValid = computed(() => {

    return passwordsMatch.value && passwordSecure.value && userNameValid.value && emailValid.value;

});

// Methods 
const togglePassword = () => {
    state.showPassword = !state.showPassword;
};

const togglePasswordRepeat = () => {
    state.showPasswordRepeat = !state.showPasswordRepeat;
};

const submitForm = async () => {

    console.log("init register process");
    console.log('values');
    console.log(user);

    if(!allParamsValid.value) {

        console.log("Errors: at least 1 param is not valid");

        if (!passwordsMatch.value) {

            console.log('Error: password mismatch, form cannot create account');

        } 

        if (!passwordSecure.value) {

            console.log('Error: password isnt secure, form cannot create account');

        }

        if (!userNameValid.value) {

            console.log("Error: username isn't valid");

        }

        if (!emailValid.value) {

            console.log("Error: email not valid");

        }

    } else {

        console.log("params ok: init createUserReq method");
        createUserReq();

    }

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

                    <input :type="state.showPassword ? 'text' : 'password'" v-model="user.pwd" class="form-control" placeholder="Enter Password" name="pwd" id="pwd" required>

                    <button @click="togglePassword" class="btn btn-outline-secondary" type="button">
                        <i v-if="!state.showPassword" class="bi bi-eye-fill"></i>
                        <i v-else class="bi bi-eye-slash-fill"></i>
                    </button>

                </div>

            </div>

            <div class="mb-3" >

                <label class="form-label" for="psw-repeat"><i class="bi bi-key-fill"></i> <b>Repeat Password</b></label>

                <div class="input-group">

                    <input v-bind:type="state.showPasswordRepeat ? 'text' : 'password'" v-model="user.pwdRepeat" class="form-control" placeholder="Repeat Password" name="pwd-repeat" id="pwd-repeat" required>

                    <button @click="togglePasswordRepeat" class="btn btn-outline-secondary" type="button">
                        <i v-if="!state.showPasswordRepeat" class="bi bi-eye-fill"></i>
                        <i v-else class="bi bi-eye-slash-fill"></i>
                    </button>

                </div>

            </div>

            <div class="text-to-login">
                <p style="display:inline-block">Already have an account? </p>
                <p><strong><router-link to="/login">Login here!</router-link></strong></p>
            </div>

            <button v-if="!state.hideSubmitBtn" type="submit" class="btn btn-primary">Create account</button>

            <div v-if="!passwordsMatch" class="alert mt-3 alert-danger" role="alert">
                <i class="bi bi-exclamation-circle"></i> Please make sure your password match.
            </div>

            <div v-if="!passwordSecure && user.pwd != ''" class="alert mt-3 alert-danger" >
                <i class="bi bi-exclamation-circle"></i> Your password isn't secure enough: please make sure it contains at least 8 characters, including at least one lowercase letter, one uppercase letter, one number and one special character. Its should not include spaces as well
            </div>

            <div v-if="!userNameValid && user.name != ''" class="alert mt-3 alert-danger">
                <i class="bi bi-exclamation-circle"></i> The username can only contain letters (upper and lower case) and numbers.
            </div>

            <div v-if="!emailValid && user.email != ''" class="alert mt-3 alert-danger">
                <i class="bi bi-exclamation-circle"></i> Please enter an email address with a valid format
            </div>

        </form>

    </div>

</template>
