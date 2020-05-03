<template>
  <div>
    <LandingPage v-if="!apiKey" v-on:popupClick="login" />
    <div class="header-container" v-if="apiKey">
      <div class="container">
        <h1>
          <span class="logo font-weight-bold">KenSpace </span>
          <span class="font-italic">Beta</span>
        </h1>
        <div>
          <p>
            <b>Hello!</b>&nbsp;
            <button v-on:click="logout" class="link-style">logout</button>
          </p>
          <button v-on:click="clearFiltered" class="link-style">
            clear picked
          </button>
          |
          <button v-on:click="clearDeleted" class="link-style">
            clear deleted
          </button>
          |
          <button v-on:click="resetApp" class="link-style">
            reset & generate new model
          </button>
          <div class="row" v-if="!upload">
            <div class="col-md-6">
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
                    <i class="ri-close-circle-line remove-icon-position"></i>
                  </span>
                </transition-group>
              </div>
              <div>
                <b>deleted</b> <span v-if="deletedList.length === 0">none</span>
                <transition-group name="list">
                  <span
                    v-for="(value, idx) in deletedList"
                    v-bind:key="idx + 0"
                    class="badge badge-dark mr-1 cursor-pointer"
                    style="padding-right: 20px;"
                    v-on:click="removeDeleted(value)"
                    >{{ value }}
                    <i class="ri-close-circle-line remove-icon-position"></i>
                  </span>
                </transition-group>
              </div>
            </div>
            <div class="col-md-6" v-if="originalQueriesData.length !== 0">
              <div class="mt-4 search-bar">
                <div style="position: relative">
                  <input
                    type="text"
                    class="search"
                    v-model="searchText"
                    @input="search"
                  />
                  <span class="focus-border"></span>
                </div>
              </div>
              <button class="btn btn-primary btn-search" v-on:click="search">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Upload v-if="apiKey && upload" v-on:finished="loadContent" />
    <div v-if="apiKey && !upload" class="home-box">
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
        <nav id="sidebar" v-bind:class="{ active: showMobileMenu }">
          <h3>
            Facet
            <button type="button" class="btn btn-light" v-on:click="changeSort">
              Sort
              <i
                class="fas"
                v-bind:class="[
                  sortABC ? 'fa-sort-numeric-down' : 'fa-sort-alpha-down'
                ]"
              ></i>
            </button>
          </h3>
          <div
            class="sidebar-card mb-3"
            v-if="Object.keys(facetData).length !== 0"
          >
            <FacetWordCloud
              :default-words="cloudWords"
              v-on:wordClicked="toggleFilter"
            ></FacetWordCloud>
          </div>
          <div class="sidebar-card">
            <div v-if="Object.keys(facetData).length === 0">
              <Loading></Loading>
            </div>
            <div
              v-for="(item, idx) in Object.keys(facetData).slice(0, facetLimit)"
              v-bind:key="idx"
              class="facet-badge"
            >
              <span
                class="badge cursor-pointer"
                v-on:click="toggleFilter(item)"
                v-bind:class="[
                  filterByList.includes(item) ? 'badge-info' : 'badge-dark'
                ]"
                >{{ item }}
                <span
                  class="badge"
                  v-bind:class="[
                    tagsSameAsResult ? 'badge-danger' : 'badge-light'
                  ]"
                  >{{ facetData[item] }}</span
                >
              </span>
              <div class="action-box">
                <div
                  v-on:click="addFilter(item)"
                  v-if="!filterByList.includes(item)"
                >
                  <i class="ri-heart-line"></i> Pick
                  <i class="far fa-object-group" style="margin-left: 6px"></i>
                  {{ facetClusterNumber[item].length }}
                </div>
                <div
                  v-on:click="removeFilter(item)"
                  v-if="filterByList.includes(item)"
                >
                  <i class="ri-heart-2-line"></i> Unpick
                </div>
                <hr />
                <div v-on:click="addDeleted(item)">
                  <i class="ri-delete-bin-2-line"></i> Remove
                </div>
              </div>
            </div>
            <button
              type="button"
              class="btn btn-light w-100 mt-4"
              v-on:click="facetLimit = facetLimit + 200"
              v-if="facetLimit < Object.keys(facetData).length"
            >
              Show More
            </button>
          </div>
        </nav>
        <div id="content" v-bind:class="{ active: showMobileMenu }">
          <h3>
            Result: <span class="small">{{ queriesData.length }}</span>
            <ProgressBar
              :result="queriesData.length"
              :result-total="originalQueriesData.length"
            />
          </h3>
          <div v-if="queriesData.length === 0 && !noResults">
            <div class="alert alert-info" role="alert">
              Generating, please wait.
            </div>
            <div class="alert alert-warning" role="alert">
              Please do not refresh this page.
            </div>
            <Loading></Loading>
          </div>
          <div v-if="noResults">
            <div class="alert alert-warning" role="alert">
              Your selection has no result.
            </div>
          </div>
          <transition-group name="flip-list" tag="div">
            <div
              class="card content-card"
              v-for="(item, idx) in queriesData.slice(0, queryLimit)"
              v-bind:key="idx + 0"
            >
              <div
                class="show-similar"
                v-bind:class="{ active: similarActive }"
                v-on:click="sortSimilarObjects(item.cluster_id)"
              >
                <div v-if="!similarActive">
                  <i class="fas fa-greater-than-equal"></i> show
                  {{ clusterMap[item.cluster_id] }} similar records
                </div>
                <div v-if="similarActive">
                  <i class="fas fa-less-than-equal"></i> show all records
                </div>
              </div>
              <div class="card-header" v-if="item.meta_info.image">
                <img :src="item.meta_info.image" alt="Movie Cover" />
              </div>
              <div
                class="card-body"
                v-bind:class="{ 'card-body-with-image': item.meta_info.image }"
              >
                <h5 class="card-title card-title-similar">
                  {{ item.text }}
                  <span
                    class="badge badge-light"
                    v-if="item.meta_info.release_date"
                    >{{ item.meta_info.release_date }}</span
                  >
                  <span
                    class="ml-2 badge badge-light"
                    v-if="item.meta_info.rating"
                  >
                    <span
                      v-for="(_, idx) in item.meta_info.rating"
                      v-bind:key="idx"
                    >
                      <i class="fas fa-star star-rating-color"></i>
                    </span>
                  </span>
                </h5>

                <p class="small">{{ item.meta_info.content }}</p>
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
              <div
                class="card-footer"
                v-bind:class="{
                  'card-footer-with-image': item.meta_info.image
                }"
                v-if="queriesData.length !== originalQueriesData.length"
              >
                <FeedbackButtons
                  :submitted="false"
                  v-on:up="shareFeedback('yes', item.text)"
                  v-on:down="shareFeedback('no', item.text)"
                />
              </div>
            </div>
          </transition-group>
          <button
            type="button"
            class="btn btn-light w-100"
            v-on:click="queryLimit = queryLimit + 5"
            v-if="queryLimit < queriesData.length"
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
import FacetWordCloud from "./FacetWordCloud";
import FeedbackButtons from "./FeedbackButtons";
import Footer from "./Footer";
import LandingPage from "./LandingPage";
import Loading from "./Loading";
import ProgressBar from "./ProgressBar";
import Upload from "./Upload";

export default {
  name: "Home",
  components: {
    LandingPage,
    Upload,
    FeedbackButtons,
    ProgressBar,
    Loading,
    Footer,
    FacetWordCloud
  },
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
      facetData: {},
      facetClusterNumber: {},
      maxFacetClusterNumber: null,
      queryLimit: 10,
      facetLimit: 200,
      searchText: "",
      noResults: false,
      tagsSameAsResult: false,
      modelUuid: "",
      sortABC: false,
      similarActive: false,
      currentClusterId: null,
      upload: false,
      removeFilterFunc: null,
      cloudWords: [],
      clusterMap: []
    };
  },
  computed: {
    badgeHeatMap(color) {
      return {
        width: `${color}%`
      };
    }
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
              localStorage.apiKey = password;

              if (password.split(":")[1] === "custom") {
                vueApp.upload = true;
              } else {
                vueApp.loadContent();
              }
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
      localStorage.modelUuid = "";
      this.filterByList = [];
      this.deletedList = [];
      this.facetData = {};
      this.queriesData = [];
      this.noResults = false;
      this.facetLimit = 200;
      this.queryLimit = 10;
      this.searchText = "";
      localStorage.settings = "";
      this.similarActive = false;
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
      this.facetData = {};
      this.queriesData = [];
      this.noResults = false;
      this.facetLimit = 200;
      this.queryLimit = 10;
      this.searchText = "";
      this.similarActive = false;
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
    loadContent: async function() {
      const axios = require("axios");
      const Swal = require("sweetalert2");
      this.upload = false;
      const vueApp = this;
      let params = {};
      if (localStorage.modelUuid) {
        params = { uuid: localStorage.modelUuid };
      }
      if (this.deletedList.length !== 0) {
        params = { ...params, deletedWords: JSON.stringify(this.deletedList) };
      }
      if (localStorage.settings) {
        params = { ...params, settings: localStorage.settings };
      }

      axios({
        method: "GET",
        url: `${process.env.VUE_APP_BACKEND_URL}/queries/`,
        params: params,
        headers: {
          Authorization: `Bearer ${localStorage.apiKey}`
        }
      })
        .then(function(response) {
          vueApp.originalQueriesData = response.data["results"];
          vueApp.queriesData = response.data["results"];
          vueApp.modelUuid = response.data["uuid"];
          localStorage.modelUuid = response.data["uuid"];

          vueApp.removeFilter("");
          Swal.close();
        })
        .catch(() => {
          Swal.fire({
            title: "Oops... Something went wrong!",
            text: "Please reset the app",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Reset App",
            icon: "error"
          }).then(result => {
            if (result.value) {
              vueApp.logout();
            }
          });
        });
    },
    generateFacet: function(obj) {
      let facet = {};
      let facetClusterNumber = {};

      let clusterMap = {};

      for (let i = 0; i < obj.length; i++) {
        let clusterData = obj[i].data;
        let clusterId = obj[i].cluster_id;

        if (clusterId in clusterMap) {
          clusterMap[clusterId]++;
        } else {
          clusterMap[clusterId] = 1;
        }

        for (let j = 0; j < clusterData.length; j++) {
          if (clusterData[j] in facet) {
            facet[clusterData[j]]++;
            if (!facetClusterNumber[clusterData[j]].includes(clusterId)) {
              facetClusterNumber[clusterData[j]].push(clusterId);
            }
          } else {
            facet[clusterData[j]] = 1;
            facetClusterNumber[clusterData[j]] = [clusterId];
          }
        }
      }

      this.clusterMap = clusterMap;

      this.facetClusterNumber = facetClusterNumber;
      let keys = Object.keys(facet);
      let results = this.queriesData.length;
      this.tagsSameAsResult = keys.every(val => facet[val] === results);

      this.facetData = this.sortObject(facet);

      let sortedKeys = Object.keys(this.facetData);
      let lenKeys = sortedKeys.length;
      let words = [];
      for (let i = 0; i < 150; i++) {
        if (i > lenKeys) {
          break;
        }
        words.push({
          name: sortedKeys[i],
          value: facet[sortedKeys[i]]
        });
      }
      this.cloudWords = words;
    },
    changeSort: function() {
      this.sortABC = !this.sortABC;
      this.facetData = this.sortObject(this.facetData);
    },
    sortObject: function(obj) {
      let items = Object.keys(obj).map(function(key) {
        return [key, obj[key]];
      });
      if (this.sortABC) {
        items.sort(function(first, second) {
          if (first[0] < second[0]) {
            return -1;
          }
          if (first[0] > second[0]) {
            return 1;
          }
          return 0;
        });
      } else {
        items.sort(function(first, second) {
          return second[1] - first[1];
        });
      }
      let sorted_obj = {};
      const jquery = require("jquery");
      jquery.each(items, function(k, v) {
        sorted_obj[v[0]] = v[1];
      });
      return sorted_obj;
    },
    groupCluster: function() {
      if (this.similarActive) {
        this.queriesData = this.queriesData.filter(
          result => result["cluster_id"] == this.currentClusterId
        );
      }
    },
    sortSimilarObjects: function(sortItem) {
      this.similarActive = !this.similarActive;
      this.currentClusterId = null;
      if (this.similarActive) {
        this.currentClusterId = sortItem;
      }
      this.removeFilter("");
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
      this.queryLimit = 5;
      this.filterByList.push(item);
      this.queriesData = this.queriesData.filter(result =>
        result["data"].includes(item)
      );
      this.generateFacet(this.queriesData);
    },
    clearFiltered: function() {
      this.noResults = false;
      this.filterByList = [];
      // this.queriesData = [...this.originalQueriesData];
      this.queriesData = this.originalQueriesData.slice(0);
      this.groupCluster();
      this.filterBySearch();
      this.generateFacet(this.queriesData);
    },
    filterBySearch: function() {
      if (this.searchText !== "") {
        const Fuse = require("fuse.js");
        let options = {
          shouldSort: true,
          threshold: 0.6,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: ["text", "meta_info.content"]
        };
        let fuse = new Fuse(this.queriesData, options);
        this.queriesData = fuse.search(this.searchText);
      }
    },
    removeFilter: function(item) {
      this.noResults = false;
      this.filterByList = this.filterByList.filter(e => e !== item);

      // this.queriesData = [...this.originalQueriesData];
      let queriesData = this.originalQueriesData.slice(0);

      for (let i = 0; i < this.filterByList.length; i++) {
        queriesData = queriesData.filter(result =>
          result["data"].includes(this.filterByList[i])
        );
      }
      this.queriesData = queriesData;

      this.groupCluster();

      this.filterBySearch();
      if (this.queriesData.length === 0) {
        this.noResults = true;
      }

      this.generateFacet(this.queriesData);
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
        text: "This will take a few minutes...",
        onBeforeOpen: () => {
          Swal.showLoading();
          this.queriesData = [];
          this.loadContent();
        },
        showConfirmButton: false
      });
    },
    clearDeleted: function() {
      this.noResults = false;
      this.deletedList = [];
      const Swal = require("sweetalert2");
      Swal.fire({
        title: "Generating new Cluster",
        onBeforeOpen: () => {
          Swal.showLoading();
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
    },
    search: function() {
      if (this.searchText === "") {
        // this.queriesData = [...this.originalQueriesData];
        this.queriesData = this.originalQueriesData.slice(0);
        this.removeFilter("");
        return;
      }

      this.removeFilterFunc("");
    },
    shareFeedback: function(isHelpful, title) {
      let params = {
        uuid: localStorage.modelUuid,
        isHelpful: isHelpful,
        movieTitle: title,
        similarClusterActive: this.similarActive,
        search: this.searchText,
        facet: JSON.stringify(this.filterByList),
        delete: JSON.stringify(this.deletedList),
        resultCount: this.queriesData.length
      };
      const axios = require("axios");

      axios({
        method: "POST",
        url: `${process.env.VUE_APP_BACKEND_URL}/feedback/`,
        params: params,
        headers: {
          Authorization: `Bearer ${localStorage.apiKey}`
        }
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
    const lodash = require("lodash");
    this.removeFilterFunc = lodash.debounce(this.removeFilter, 400);
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

.card-title-similar {
  padding-top: 30px;
}

@media (min-width: 1270px) {
  .card-body-with-image {
    margin-left: 200px;
  }

  .card-footer-with-image {
    margin-left: 185px;
    padding-left: 35px;
  }

  .card-header {
    position: absolute;
    display: block;
    height: 100%;
    width: 200px;
    padding: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 3px 0 0 3px;
    }
  }
}

@media (max-width: 1269px) {
  .card-header {
    display: none;
  }
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
  min-height: 50px;
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
      width: 140px;

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
      width: 140px;
    }
  }
}

.show-similar {
  cursor: pointer;
  position: absolute;
  right: 0;
  background-color: #0099ff;
  color: white;

  &.active {
    background-color: #28a745;
  }

  text-align: center;
  width: 230px;
  padding: 5px 10px;
  border-radius: 0 3px 0 3px;
}

.search {
  border: 0;
  border-bottom: 1px solid #ccc;
  width: 100%;
  padding: 8px;
  border-radius: 5px 5px 0 0;

  &:focus {
    outline: none;
  }
}

.search ~ .focus-border {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: #3399ff;
  transition: 0.4s;
}

.search:focus ~ .focus-border {
  width: 100%;
  transition: 0.4s;
  left: 0;
}

.link-style {
  color: #007bff;
  border: none;
  background: transparent;
  padding: 0;

  &:focus {
    outline: 0;
  }

  &:hover {
    text-decoration: underline;
  }
}

.btn-search {
  display: inline-block;
  margin-left: 10px;
  width: calc(30% - 10px);
}

.search-bar {
  display: inline-block;
  width: 70%;
}

.flip-list-move {
  transition: transform 0.5s;
}

.flip-list-enter-active,
.flip-list-leave-active {
  transition: opacity 0.3s ease;
}

.flip-list-enter,
.flip-list-leave-to {
  opacity: 0;
}

.star-rating-color {
  color: #ff9529;
}

.remove-icon-position {
  position: absolute;
  padding-left: 5px;
}
</style>
