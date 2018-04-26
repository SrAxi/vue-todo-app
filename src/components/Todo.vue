<template>
	<div class="todos">
		<p v-if="profile.email">
			<strong>User:</strong> {{profile.email}}
		</p>
		<p>
			For guide and recipes on how to configure / customize this project,<br>
			check out the
			<a href="https://github.com/vuejs/vue-cli/tree/dev/docs" target="_blank">vue-cli documentation</a>.
		</p>
		<h3>Installed CLI Plugins</h3>
		<ul>
			<li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank">babel</a>
			</li>
			<li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank">eslint</a>
			</li>
		</ul>
		<h3>Essential Links</h3>
		<ul>
			<li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
			<li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
			<li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
			<li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
		</ul>
		<h3>Ecosystem</h3>
		<ul>
			<li><a href="https://router.vuejs.org/en/essentials/getting-started.html" target="_blank">vue-router</a>
			</li>
			<li><a href="https://vuex.vuejs.org/en/intro.html" target="_blank">vuex</a></li>
			<li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank">vue-devtools</a></li>
			<li><a href="https://vue-loader.vuejs.org/en" target="_blank">vue-loader</a></li>
			<li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
		</ul>

		<button @click="getTodos">getTodos</button>

		<div>
			{{ info }}
		</div>
	</div>
</template>

<script>
    import axios from 'axios';
    import { mapState } from 'vuex';

    export default {
        name: 'TodoComponent',
        data() {
            return {
                info: [],
                token: ''
            }
        },
        methods: {
            getTodos() {
                const HTTP = axios.create({
                    baseURL: `http://localhost:3000/api`,
                    headers: {
                        'x-auth': this.$store.getters.getToken
                    }
                });

                HTTP.get('/todos')
                    .then(response => {
                        this.info.push(response.data);
                        console.log(response);
                    })
                    .catch((e) => {
                        console.error(e);
                    })
            }
        },
        computed: mapState({ profile: state => state.user.profile })
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
