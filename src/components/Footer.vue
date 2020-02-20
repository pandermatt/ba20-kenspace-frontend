<template>
  <footer>
    <div class="container">
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <p class="lead">KenSpace</p>
          </div>
          <div class="col-sm">
            <p class="author">
              Pascal Andermatt<br />
              Stefan Brunner
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped lang="scss">
footer {
  color: white;
  background-color: $footer-blue;
  padding: 100px 0;

  .author {
    @media (min-width: 576px) {
      text-align: right;
    }
  }
}
</style>
