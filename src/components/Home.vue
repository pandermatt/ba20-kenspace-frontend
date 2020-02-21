<template>
  <div>
    <div class="header-container">
      <div class="container">
        <div class="">
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
    </div>
    <div class="container" v-if="!apiKey">
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
          <div class="jumbotron" v-for="index in 10" :key="index">
            <h1 class="display-4">Item 🥳</h1>
          </div>
        </div>
      </div>
      <!--      <div class="row info-message">-->
      <!--        <div class="col-md-4">-->
      <!--          -->
      <!--        </div>-->
      <!--        <div class="col-md-8">-->
      <!--          <div class="jumbotron" v-for="index in 10" :key="index">-->
      <!--            <h1 class="display-4">Item 🥳</h1>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
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
      apiKey: "",
      showMobileMenu: false
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

      if (password === "7C991E25649BD5F8F9D6A1AC9FFF3") {
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

@media (max-width: 768px) {
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
  padding-bottom: 140px;
  background-color: #f6f8fc;
}

.home-box {
  position: relative;
  top: -80px;
}

.wave {
  position: relative;
  top: 10px;
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
  top: 18px;
}

#hamburger-circle.active {
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
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
</style>
