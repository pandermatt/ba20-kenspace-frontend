<template>
  <div id="app">
    <wordcloud
      :data="defaultWords"
      nameKey="name"
      valueKey="value"
      spiral="rectangular"
      :color="myColors"
      :margin="margin"
      :showTooltip="false"
      :rotate="rotate"
      :wordClick="wordClickHandler"
    >
    </wordcloud>
  </div>
</template>

<script>
import wordcloud from "vue-wordcloud";

export default {
  components: {
    wordcloud
  },
  methods: {
    wordClickHandler(name) {
      this.$emit("wordClicked", name);
    }
  },
  props: {
    defaultWords: Array
  },
  data() {
    return {
      myColors: ["#1f77b4", "#629fc9", "#94bedb", "#c9e0ef"],
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      rotate: { from: 0, to: 0, numOfOrientation: 1 }
    };
  }
};
</script>

<style lang="scss">
.text {
  cursor: pointer;
  transition: fill 0.1s;

  &:hover {
    fill: #2e1cd2 !important;
  }
}
</style>
