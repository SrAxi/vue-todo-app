<template>
	<div id="app">
		<div class="page-header" id="banner">
			<div class="row justify-content-center">
				<div class="col-lg-4 col-md-5 col-sm-6">
					<img src="./assets/logo.png">
				</div>
			</div>
			<div class="row justify-content-center">
				<div class="col-lg-8 col-md-7 col-sm-6">
					<h1>Your TODO's manager</h1>
					<p class="lead">Manage your Todo's with Vue!</p>
				</div>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
    import { USER_REQUEST } from './store/actions/user'
    import { AUTH_LOGOUT } from './store/actions/auth'
    import axios from 'axios';

    export default {
        name: 'app',
        created: function () {
            axios.interceptors.response.use(undefined, function (err) {
                return new Promise(function (resolve, reject) {
                    if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
                        // if you ever get an unauthorized, logout the user
                        this.$store.dispatch(AUTH_LOGOUT)
                        // you can also redirect to /login if needed !
                    }
                    throw err;
                });
            });

            if (this.$store.getters.isAuthenticated) {
                this.$store.dispatch(USER_REQUEST)
            }
        }
    }
</script>

<style lang="scss">
	@import "~bootswatch/dist/superhero/variables";
	@import "~bootstrap/scss/bootstrap";
	@import "~bootswatch/dist/superhero/bootswatch";

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		/*color: #2c3e50;*/
		margin-top: 60px;
	}
</style>
