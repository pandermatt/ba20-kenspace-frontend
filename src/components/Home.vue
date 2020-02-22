<template>
  <div>
    <div class="header-container">
      <div class="container">
        <h1>
          <b class="logo">KenSpace</b>
          <span class="badge badge-secondary">Beta</span>
        </h1>
        <div v-if="apiKey">
          <p><b>Hello!</b> Your Token: {{ apiKey }}</p>
          <a v-on:click="logout" href="#">Logout</a>
        </div>
      </div>
    </div>
    <div class="container login-page" v-if="!apiKey">
      <div class="jumbotron home-box">
        <h1 class="display-4">Sorry!</h1>
        <p class="lead">
          This page is currently only accessible for registered beta users.
        </p>
        <hr class="my-4" />
        <a v-on:click="login" href="#"
          >Click here if you have received a beta key</a
        >
      </div>
    </div>
    <div v-if="apiKey" class="home-box">
      <div
        class="hamburger"
        id="hamburger-circle"
        v-bind:class="{ active: showMobileMenu }"
        v-on:click="showMobileMenu = !showMobileMenu"
      >
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
      </div>
      <div class="wrapper">
        <!-- Sidebar -->
        <nav id="sidebar" v-bind:class="{ active: showMobileMenu }">
          <div class="jumbotron">
            <h1 class="display-4">Facette 🥳</h1>
          </div>
        </nav>

        <!-- Page Content -->
        <div id="content" v-bind:class="{ active: showMobileMenu }">
          <div
            class="card content-card"
            v-for="item in queriesData['results']"
            v-bind:key="item"
          >
            <div class="card-body">
              <h5 class="card-title">{{ item }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      apiKey: "",
      showMobileMenu: false,
      queriesData: []
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

      const Error = Swal.mixin({
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        footer: "Please contact an administrator",
        hideClass: {
          popup: "animated zoomOut faster"
        }
      });

      if (password) {
        const axios = require("axios");
        const vueApp = this;
        axios({
          method: "GET",
          url: `${process.env.VUE_APP_BACKEND_URL}/auth/`,
          headers: {
            Authorization: `Bearer ${password}`
          }
        })
          .then(function(response) {
            if (response.data === "successful") {
              vueApp.apiKey = password;
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
              vueApp.loadContent();
            }
          })
          .catch(function() {
            Error.fire({
              title: "Your key is not valid"
            });
          });
      } else {
        Error.fire({
          title: "Your key is empty"
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
    },
    loadContent: async function() {
      const axios = require("axios");
      const vueApp = this;
      axios({
        method: "GET",
        url: `${process.env.VUE_APP_BACKEND_URL}/queries/`,
        headers: {
          Authorization: `Bearer ${localStorage.apiKey}`
        }
      }).then(function(response) {
        vueApp.queriesData = response.data;
      });
    }
  },
  watch: {
    apiKey(newApiKey) {
      localStorage.apiKey = newApiKey;
    }
  },
  mounted() {
    if (localStorage.apiKey) {
      this.apiKey = localStorage.apiKey;
      this.loadContent();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrapper {
  display: flex;
  align-items: stretch;

  #content {
    width: 100%;
    padding: 0 50px;
  }
}

#sidebar {
  min-width: 30vw;
  max-width: 30vw;
  margin-left: 50px;
  transition: all 0.3s;
}

@media (max-width: 767px) {
  #sidebar {
    margin-left: -300px;
    min-width: 300px;
    max-width: 300px;
    transition: all 0.3s;
  }
  #sidebar.active {
    margin-left: 0;
    transition: all 0.3s;
  }
  .wrapper {
    overflow-x: hidden;

    #content {
      padding: 0 5px;
      transition: all 0.3s;

      &.active {
        transition: all 0.3s;
        min-width: 600px;
      }
    }
  }
}

.logo {
  color: $main-blue;
  font-size: 50px;
}

.header-container {
  padding-top: 20px;
  padding-bottom: 160px;
  background-color: #f6f8fc;
}

.home-box {
  position: relative;
  top: -80px;
}

.container {
  transition: all 0.3s ease-in-out;
}

.hamburger .line {
  @media (min-width: 768px) {
    opacity: 0;
  }
  width: 30px;
  height: 3px;
  background-color: black;
  display: block;
  opacity: 1;
  margin: 5px auto;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.hamburger:hover {
  cursor: pointer;
}

#hamburger-circle {
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  position: absolute;
  left: 25px;
  top: -50px;
}

#hamburger-circle.active {
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
  @media (min-width: 768px) {
    opacity: 0;
  }
}

#hamburger-circle:before {
  content: "";
  position: absolute;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 60px;
  height: 60px;
  border: 5px solid transparent;
  top: calc(50% - 30px);
  left: calc(50% - 30px);
  border-radius: 100%;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

#hamburger-circle.active:before {
  border: 1px solid black;
}

#hamburger-circle.active .line {
  width: 30px;
}

#hamburger-circle.active .line:nth-child(2) {
  opacity: 0;
}

#hamburger-circle.active .line:nth-child(1) {
  -webkit-transform: translateY(8px);
  -ms-transform: translateY(8px);
  -o-transform: translateY(8px);
  transform: translateY(8px);
}

#hamburger-circle.active .line:nth-child(3) {
  -webkit-transform: translateY(-8px) rotate(90deg);
  -ms-transform: translateY(-8px) rotate(90deg);
  -o-transform: translateY(-8px) rotate(90deg);
  transform: translateY(-8px) rotate(90deg);
}

.login-page {
  min-height: 35vh;
}

.content-card {
  margin-bottom: 15px;
  border: none;
  transition: box-shadow 0.6s ease-in;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.content-card:hover {
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
  transition: box-shadow 0.2s ease-in;
}
</style>
