<template>
  <div>
    <div class="header-container">
      <div class="container">
        <div class="">
          <h1>
            <b class="logo">KenSpace</b>
            <span class="badge badge-secondary">Beta</span>
          </h1>
          <p>Hello World from {{ msg }}</p>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="jumbotron info-message">
        <h1 class="display-4">Sorry!</h1>
        <p class="lead">
          This Page is currently only accessible to registered beta user.
        </p>
      </div>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#0099ff"
        fill-opacity="1"
        d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,112C672,96,768,96,864,117.3C960,139,1056,181,1152,181.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
    </svg>
    <footer>
      <div class="container">
        <h1>Hello World</h1>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Home",
  props: {
    msg: String
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
  padding-top: 40px;
  padding-bottom: 140px;
  background-color: #f6f8fc;
}

.info-message {
  position: relative;
  top: -80px;
}

footer {
  color: white;
  background-color: $footer-blue;
  padding: 100px 0;
}
</style>
