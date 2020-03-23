import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.config.productionTip = false;

new Vue({
  render: function(h) {
    return h(App);
  }
}).$mount("#app");

window.onbeforeunload = function() {
  return "Data will be lost if you leave the page, are you sure?";
};
