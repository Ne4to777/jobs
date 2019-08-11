import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import store from './store'
import Home from './views/Home.vue'
import Company from './views/Company.vue'
import NotFound from './views/NotFound.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
	routes: [
		{
			path: '/',
			component: Home,
			meta: {
				title: 'Search',
			}
		},
		{
			path: '/:id',
			component: Company,
			meta: {
				title: 'Info',
			}
		},
		{
			path: '*',
			component: NotFound
		}
	],
	mode: 'history',
	scrollBehavior() {
		return {
			x: 0,
			y: this.app.$route.path === '/'
				? this.app.$store.state.current.scrollPosition || 0
				: 0
		}
	}
})

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
