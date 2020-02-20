<template>
  <div>
    <div class="header-container">
      <div class="container">
        <div class="">
          <h1>
            <b class="logo">KenSpace</b>
            <span class="badge badge-secondary">Beta</span>
          </h1>
          <p>
            Hello! {{ apiKey }}
            <a v-on:click="logout" href="#" v-if="apiKey">Logout</a>
          </p>
        </div>
      </div>
    </div>
    <div class="container" v-if="!apiKey">
      <div class="jumbotron info-message">
        <h1 class="display-4">Sorry! {{ apiKey }}</h1>
        <p class="lead">
          This page is currently only accessible for registered beta users.
        </p>
        <hr class="my-4" />
        <a v-on:click="login" href="#"
          >Click here if you have received a beta key</a
        >
      </div>
    </div>

    <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#0099ff"
        fill-opacity="1"
        d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,112C672,96,768,96,864,117.3C960,139,1056,181,1152,181.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
    </svg>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "./Footer";

export default {
  name: "Home",
  components: { Footer },
  props: {
    msg: String
  },
  data: function() {
    return {
      apiKey: ""
    };
  },
  methods: {
    login: async function() {
      const Swal = require("sweetalert2");
      const { value: password } = await Swal.fire({
        title: "Enter your Beta Key",
        input: "text",
        inputPlaceholder: "Enter your Beta Key",
        inputAttributes: {
          autocapitalize: "off",
          autocorrect: "off"
        },
        showClass: {
          popup: "animated zoomIn faster"
        },
        hideClass: {
          popup: "animated zoomOut faster"
        }
      });

      //todo safe password to localstorage :D
      if (password === "Pascal") {
        this.apiKey = password;
        Swal.fire({
          icon: "success",
          title: "Signed in successfully",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: toast => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Your key is empty",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          footer: "Please contact an administrator",
          hideClass: {
            popup: "animated zoomOut faster"
          }
        });
      }
    },
    logout: function() {
      this.apiKey = "";
      // todo maybe global :D
      const Swal = require("sweetalert2");
      Swal.fire({
        icon: "success",
        title: "Log out successfully",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: toast => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        }
      });
    }
  },
  watch: {
    apiKey(newApiKey) {
      localStorage.apiKey = newApiKey;
    }
  },
  mounted() {
    if (localStorage.apiKey) this.apiKey = localStorage.apiKey;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.logo {
  color: $main-blue;
  font-size: 50px;
}

.header-container {
  padding-top: 20px;
  padding-bottom: 140px;
  background-color: #f6f8fc;
}

.info-message {
  position: relative;
  top: -80px;
}

.wave {
  position: relative;
  top: 10px;
}
</style>
