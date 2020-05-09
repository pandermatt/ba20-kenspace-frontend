<template>
  <div class="container" style="margin-top: -100px;">
    <h1>
      Welcome<span v-if="choosedCity">
        to <span class="city-label">{{ choosedCity }}</span></span
      >!
    </h1>
    <div class="row">
      <div
        v-for="(item, idx) in citiesList"
        v-bind:key="idx"
        class="col-sm city-source-icon"
        v-bind:class="{ selected: choosedCity === item.cityID }"
        v-on:click="choosedCity = item.cityID"
      >
        <h1>{{ item.city }}</h1>
        <p>{{ item.country }}</p>
      </div>
    </div>
    <button type="button" class="btn btn-primary w-100" v-on:click="start">
      Next
    </button>
  </div>
</template>
<script>
export default {
  name: "CityChooser",
  components: {},
  data: function() {
    return {
      choosedCity: "",
      citiesList: [
        { cityID: "amsterdam", city: "Amsterdam", country: "Netherlands" },
        { cityID: "athens", city: "Athens", country: "Greece" },
        { cityID: "barcelona", city: "Barcelona", country: "Spain" },
        { cityID: "berlin", city: "Berlin", country: "Germany" },
        { cityID: "bologna", city: "Bologna", country: "Italy" },
        { cityID: "dublin", city: "Dublin", country: "Ireland" },
        { cityID: "geneva", city: "Geneva", country: "Switzerland" },
        { cityID: "hongkong", city: "Hong Kong", country: "China" },
        {
          cityID: "westernaustralia",
          city: "Western Australia",
          country: "Australia"
        }
      ]
    };
  },
  methods: {
    start() {
      localStorage.settings = JSON.stringify({
        city: this.choosedCity
      });
      this.$emit("finished");
    }
  }
};
</script>
<style scoped lang="scss">
.city-label {
  text-transform: capitalize;
}

.city-source-icon {
  cursor: pointer;
  text-align: center;
  background-color: white;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  border: $footer-blue solid 1px;
  min-width: 250px;

  .coming-soon {
    color: $footer-blue;
    font-weight: bold;
  }

  &:hover,
  &.selected {
    border: #3ed935 solid 1px;
    color: white;
    transition: all 0.3s;

    .coming-soon {
      color: white;
    }
  }

  &:hover {
    background-color: #6cf060;
  }

  &.selected {
    background-color: #3ed935;
  }
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
</style>
