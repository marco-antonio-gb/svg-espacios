import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/espacios.css";
import router from "./router";

new Vue({
	router,

	render: function(h) {
		return h(App);
	}
}).$mount("#app");
