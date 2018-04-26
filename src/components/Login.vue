<template>
	<div class="login">
		<h2>LOGIN COMPONENT</h2>
		<div>
			<form class="login" @submit.prevent="login">
				<h1>Sign in</h1>
				<label>Email</label>
				<input required v-model="email" type="text" placeholder="sraxi@example.com"/>
				<label>Password</label>
				<input required v-model="password" type="password" placeholder="Test123!"/>
				<hr/>
				<button type="submit">Login</button>
			</form>
		</div>
	</div>
</template>

<script>
    /* eslint-disable no-alert, no-console */
    import { AUTH_REQUEST } from '../store/actions/auth'

    export default {
        name: 'LoginComponent',
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            login() {
                const { email, password } = this;

                this.$store.dispatch(AUTH_REQUEST, { email, password }).then(() => {
                    this.$router.push('/')
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h3 {
		margin: 40px 0 0;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #42b983;
	}
</style>
