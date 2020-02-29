<template>
  <div>
    <div class="header-container">
      <div class="container">
        <h1>
          <b class="logo">KenSpace</b>
          <span class="badge badge-secondary">Beta</span>
        </h1>
        <div v-if="apiKey">
          <p><b>Hello!</b> <a v-on:click="logout" href="#">logout</a></p>
          <a v-on:click="clearFiltered" href="#">clear picked</a> |
          <a v-on:click="clearDeleted" href="#">clear deleted</a> |
          <a v-on:click="resetApp" href="#">reset & generate new model</a>
          <div class="display-filter">
            <b>picked</b> <span v-if="filterByList.length === 0">none</span>
            <transition-group name="list">
              <span
                v-for="(value, idx) in filterByList"
                v-bind:key="idx + 0"
                v-on:click="removeFilter(value)"
                class="badge badge-dark mr-1 cursor-pointer"
                style="padding-right: 20px;"
                >{{ value }}
                <i
                  class="ri-close-circle-line"
                  style="position: absolute;padding-left: 5px;"
                ></i>
              </span>
            </transition-group>
          </div>
          <div class="display-deleted">
            <b>deleted</b> <span v-if="deletedList.length === 0">none</span>
            <transition-group name="list">
              <span
                v-for="(value, idx) in deletedList"
                v-bind:key="idx + 0"
                class="badge badge-dark mr-1 cursor-pointer"
                style="padding-right: 20px;"
                v-on:click="removeDeleted(value)"
                >{{ value }}
                <i
                  class="ri-close-circle-line"
                  style="position: absolute;padding-left: 5px;"
                ></i>
              </span>
            </transition-group>
          </div>
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
        class="hamburger cursor-pointer"
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
          <h3>Facet</h3>
          <div class="sidebar-card">
            <div v-if="facetData.length === 0">
              <Loading></Loading>
            </div>
            <div
              v-for="(value, key) in facetData"
              v-bind:key="key"
              class="facet-badge"
            >
              <span
                class="badge cursor-pointer"
                v-on:click="toggleFilter(key)"
                v-bind:class="[
                  filterByList.includes(key) ? 'badge-info' : 'badge-dark'
                ]"
                >{{ key }}
                <span
                  class="badge"
                  v-bind:class="[
                    tags_same_as_result ? 'badge-danger' : 'badge-light'
                  ]"
                  >{{ value }}</span
                >
              </span>
              <div class="action-box">
                <div
                  v-on:click="addFilter(key)"
                  v-if="!filterByList.includes(key)"
                >
                  <i class="ri-heart-line"></i> Pick
                </div>
                <div
                  v-on:click="removeFilter(key)"
                  v-if="filterByList.includes(key)"
                >
                  <i class="ri-heart-2-line"></i> Unpick
                </div>
                <hr />
                <div v-on:click="addDeleted(key)">
                  <i class="ri-delete-bin-2-line"></i> Remove
                </div>
              </div>
            </div>
          </div>
        </nav>

        <!-- Page Content -->
        <div id="content" v-bind:class="{ active: showMobileMenu }">
          <h3>Result: {{ queriesData.length }}</h3>
          <div v-if="queriesData.length === 0 && !no_results">
            <div class="alert alert-info" role="alert">
              Generating, please wait.
            </div>
            <Loading></Loading>
          </div>
          <div v-if="no_results">
            <div class="alert alert-warning" role="alert">
              Your selection has no result.
            </div>
          </div>
          <div
            class="card content-card"
            v-for="(item, idx) in queriesData.slice(0, limit)"
            v-bind:key="idx"
          >
            <div class="card-body">
              <h5 class="card-title">{{ item.text }}</h5>
              <div>
                <span
                  v-for="(content, idx) in item.data"
                  v-bind:key="idx"
                  v-on:click="addFilter(content, false)"
                  class="badge badge-pill badge-secondary mr-1 cursor-pointer"
                  >{{ content }}
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            class="btn btn-light w-100"
            v-on:click="limit = limit + 5"
            v-if="limit < queriesData.length"
          >
            Show More
          </button>
        </div>
      </div>
    </div>
    <Footer :api-key="apiKey" :model-uuid="modelUuid"></Footer>
  </div>
</template>

<script>
import Footer from "./Footer";
import Loading from "./Loading";

export default {
  name: "Home",
  components: { Loading, Footer },
  props: {
    msg: String
  },
  data: function() {
    return {
      apiKey: "",
      showMobileMenu: false,
      originalQueriesData: [],
      filterByList: [],
      deletedList: [],
      queriesData: [],
      facetData: [],
      limit: 5,
      no_results: false,
      tags_same_as_result: false,
      modelUuid: ""
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
    resetApp: function() {
      localStorage.modelUuid = "";
      this.filterByList = [];
      this.deletedList = [];
      this.facetData = [];
      this.queriesData = [];
      this.no_results = false;
      const Swal = require("sweetalert2");
      Swal.fire({
        icon: "success",
        title: "Generating new Cluster",
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        onOpen: toast => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        }
      });
      this.loadContent();
    },
    clearFiltered: function() {
      this.no_results = false;
      this.filterByList = [];
      this.queriesData = [...this.originalQueriesData];
      this.generate_facet(this.queriesData);
    },
    clearDeleted: function() {
      this.no_results = false;
      this.deletedList = [];
      this.loadContent();
    },
    loadContent: async function() {
      const axios = require("axios");
      const Swal = require("sweetalert2");
      const vueApp = this;
      let params = {};
      if (localStorage.modelUuid) {
        params = { uuid: localStorage.modelUuid };
      }
      if (this.deletedList.length !== 0) {
        params = { ...params, deletedWords: JSON.stringify(this.deletedList) };
      }

      axios({
        method: "GET",
        url: `${process.env.VUE_APP_BACKEND_URL}/queries/`,
        params: params,
        headers: {
          Authorization: `Bearer ${localStorage.apiKey}`
        }
      }).then(function(response) {
        vueApp.originalQueriesData = response.data["results"];
        vueApp.queriesData = response.data["results"];
        vueApp.modelUuid = response.data["uuid"];
        localStorage.modelUuid = response.data["uuid"];

        vueApp.removeFilter("");
        Swal.close();
      });
    },
    generate_facet: function(obj) {
      let facet = {};

      for (let i = 0; i < obj.length; i++) {
        let cluster_data = obj[i].data;
        for (let j = 0; j < cluster_data.length; j++) {
          if (cluster_data[j] in facet) {
            facet[cluster_data[j]] = facet[cluster_data[j]] + 1;
          } else {
            facet[cluster_data[j]] = 1;
          }
        }
      }

      let keys = Object.keys(facet);
      let results = this.queriesData.length;
      this.tags_same_as_result = keys.every(val => facet[val] === results);

      this.facetData = this.sort_object(facet);
    },
    sort_object: function(obj) {
      let items = Object.keys(obj).map(function(key) {
        return [key, obj[key]];
      });
      items.sort(function(first, second) {
        return second[1] - first[1];
      });
      let sorted_obj = {};
      const jquery = require("jquery");
      jquery.each(items, function(k, v) {
        sorted_obj[v[0]] = v[1];
      });
      return sorted_obj;
    },
    removeFilter: function(item) {
      this.no_results = false;
      this.filterByList = this.filterByList.filter(e => e !== item);
      this.queriesData = [...this.originalQueriesData];
      for (let i = 0; i < this.filterByList.length; i++) {
        this.queriesData = this.queriesData.filter(result =>
          result["data"].includes(this.filterByList[i])
        );
      }
      if (this.queriesData.length === 0) {
        this.no_results = true;
      }
      this.generate_facet(this.queriesData);
    },
    toggleFilter: function(item) {
      if (this.filterByList.includes(item)) {
        this.removeFilter(item);
        return;
      }
      this.addFilter(item);
    },
    addFilter: function(item) {
      if (this.filterByList.includes(item)) {
        return;
      }
      this.limit = 5;
      this.filterByList.push(item);
      this.queriesData = this.queriesData.filter(result =>
        result["data"].includes(item)
      );
      this.generate_facet(this.queriesData);
    },
    addDeleted: function(item) {
      if (this.deletedList.includes(item)) {
        return;
      }

      this.deletedList.push(item);
      this.removeFilter(item);
      const Swal = require("sweetalert2");
      Swal.fire({
        title: "Generating new Cluster",
        onBeforeOpen: () => {
          Swal.showLoading();
          this.queriesData = [];
          this.loadContent();
        },
        showConfirmButton: false
      });
    },
    removeDeleted: function(item) {
      this.deletedList = this.deletedList.filter(e => e !== item);

      const Swal = require("sweetalert2");
      Swal.fire({
        title: "Generating new Cluster",
        onBeforeOpen: () => {
          Swal.showLoading();
          this.queriesData = [];
          this.loadContent();
        },
        showConfirmButton: false
      });
    }
  },
  watch: {
    apiKey(newApiKey) {
      localStorage.apiKey = newApiKey;
    },
    filterByList(newList) {
      localStorage.filterByList = JSON.stringify(newList);
    },
    deletedList(newList) {
      localStorage.deletedList = JSON.stringify(newList);
    }
  },
  mounted() {
    if (localStorage.filterByList) {
      this.filterByList = JSON.parse(localStorage.filterByList);
    }
    if (localStorage.deletedList) {
      this.deletedList = JSON.parse(localStorage.deletedList);
    }
    if (localStorage.modelUuid) {
      this.modelUuid = localStorage.modelUuid;
    }
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
  transition: all 1s;
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

.cursor-pointer:hover {
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
  transition: box-shadow 0.6s ease-in;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.content-card:hover {
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
  transition: box-shadow 0.1s ease-in;
}

.sidebar-card {
  background-color: #e9ecef;
  border-radius: 0.3rem;
  padding: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
}

.display-filter {
  padding-top: 10px;
  height: 50px;
}

.badge:hover {
  background-color: white;
  color: black;
}

@keyframes delayBubble {
  0% {
    height: 0;
  }
  70% {
    height: 0;
  }
  100% {
    height: 90px;
  }
}

.facet-badge {
  display: inline;

  margin-right: 4px;

  &:hover {
    .badge {
      background-color: white;
      color: black;
    }

    .action-box {
      transition: all 1s;
      animation: delayBubble 1s forwards;
      height: 90px;
      width: 30px;
    }
  }

  .action-box {
    background: #fbfbfb;
    border-radius: 10px;
    position: absolute;
    height: 0;
    width: 40px;
    display: inline-block;
    overflow: hidden;
    transition: all 0.01s;
    z-index: 1;

    hr {
      margin: 10px 0;
    }

    div {
      padding-right: 8px;
      padding-left: 8px;
      width: 100px;

      &:hover {
        color: red;
        cursor: pointer;
      }
    }

    div:first-child {
      padding-top: 8px;
      padding-bottom: 0;
    }

    div:last-child {
      padding-top: 0;
      padding-bottom: 8px;
    }

    &:hover {
      transition: all 0.2s;
      height: 90px;
      width: 100px;
    }
  }
}
</style>
