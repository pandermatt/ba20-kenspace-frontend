<template>
  <div class="progress">
    <div class="bar" :style="progressStyles">
      <p class="percent">{{ result }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "ProgressBar",
  props: {
    result: null,
    resultTotal: null
  },
  computed: {
    progressStyles() {
      return {
        width: `${(this.result / this.resultTotal) * 100}%`
      };
    }
  }
};
</script>
<style scoped lang="scss">
.progress {
  padding: 0;
  overflow: hidden;
  background: #e5e5e5;
  border-radius: 6px;
}

.bar {
  position: relative;
  float: left;
  min-width: 1%;
  height: 100%;
  background: cornflowerblue;
  transition: all 1s;
}

.percent {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  font-size: 12px;
  color: white;
}
</style>
