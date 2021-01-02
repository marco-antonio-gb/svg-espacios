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
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
