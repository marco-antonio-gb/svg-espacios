import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Inicio",
		component: function() {
			return import(/* webpackChunkName: "about" */ "../components/svgdraw.vue");
		}
	},
	{
		path: "/load",
		name: "loaddraw",
		component: function() {
			return import(/* webpackChunkName: "about" */ "../components/LoadDraw.vue");
		}
	},
	{
		path: "/config",
		component: function() {
			return import(/* webpackChunkName: "config" */ "../components/config.vue");
		}
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
