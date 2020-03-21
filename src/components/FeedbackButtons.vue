<template>
  <div>
    <div v-if="!submitted">
      Is this helpful?
      <button class="link-style" v-on:click="share('up')">
        <i class="far fa-thumbs-up ml-3"></i> Yes
      </button>
      <button class="link-style" v-on:click="share('down')">
        <i class="far fa-thumbs-down ml-3"></i> No
      </button>
    </div>
    <div v-if="submitted">
      <i>Thanks for your feedback</i>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    submitted: String
  },
  methods: {
    share(shareType) {
      this.$emit(shareType);
      this.submitted = true;
    }
  }
};
</script>
<style scoped lang="scss">
.link-style {
  border: none;
  background: transparent;
  padding: 0;
  color: #007bff;

  &:focus {
    outline: 0;
  }

  &:hover {
    text-decoration: underline;
  }
}
</style>
