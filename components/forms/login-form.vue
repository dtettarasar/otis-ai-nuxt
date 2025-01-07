<template>

    <div>
        
        <form method="post">

            <p>Please use the form below to login to your account.</p>

            <div class="mb-3">

                <label class="form-label" for="username"><i class="bi bi-person-fill"></i> <b>Username</b></label>
                <input class="form-control" type="text" placeholder="Enter Username" name="username" id="username" required>

            </div>

            <div class="mb-3">

                <label class="form-label" for="psw"><i class="bi bi-key-fill"></i> <b>Password</b></label>

                <div class="input-group">

                    <input class="form-control" type="password" placeholder="Enter Password" name="pwd" id="pwd" required>

                    <button class="btn btn-outline-secondary" type="button">
                        <i class="bi bi-eye-fill"></i>
                        <!--<i class="bi bi-eye-slash-fill"></i>-->
                    </button>

                </div>
                
            </div>

            <button type="submit" class="btn btn-primary">Login</button>

            <!--

            <div v-if="showError" class="alert mt-3 alert-danger" role="alert">
                <i class="bi bi-exclamation-circle"></i> Authentication failed. Please check your credentials and try again.
            </div>

            <div v-if="showSuccess" class="alert mt-3 alert-success" role="alert">
                <i class="bi bi-check-circle"></i> You are now logged in. You will be redirected to your account page shortly.
            </div>

            -->

        </form>

    </div>

</template>