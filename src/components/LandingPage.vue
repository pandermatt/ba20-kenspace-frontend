<template>
  <div>
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-light fancy-nav">
        <a class="navbar-brand font-weight-bold">KenSpace</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-item nav-link" v-on:click="loginPopup" href="#">
              Get started! <span class="badge badge-secondary">Beta</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
    <h1 class="text-center" style="margin-top: 25vh; color: #0099ff;">
      KenSpace
    </h1>
    <h1
      class="display-4 text-center font-weight-bold"
      style="margin-top: -10px; margin-bottom: 25vh"
    >
      Search beyond your data.
    </h1>
    <div
      class="container text-center"
      style="margin-top: 150px; margin-bottom: 150px"
    >
      <div class="row">
        <div class="col-md-4">
          <i class="fab fa-searchengin fa-3x" style="color: #D53032"></i>
          <h5 class="font-weight-bold my-4">Explore your data</h5>
          <p class="text-muted mb-md-0 mb-5">
            KenSpace automatically indexes your search and generates keywords,
            so you can get the most out of your data.
          </p>
        </div>
        <div class="col-md-4">
          <i class="fas fa-object-group fa-3x" style="color: #FFB800"></i>
          <h5 class="font-weight-bold my-4">Group similar data</h5>
          <p class="text-muted mb-md-0 mb-5">
            Due to different grouping mechanisms KenSpace will group similar for
            you.
          </p>
        </div>
        <div class="col-md-4">
          <i class="fas fa-lock fa-3x" style="color: #1BE7FF"></i>
          <h5 class="font-weight-bold my-4">Control your data</h5>
          <p class="grey-text mb-0">
            KenSpace will never store any user based settings. Your data will
            never be passed on to others.
          </p>
        </div>
      </div>
    </div>
    <div class="container">
      <h1><i class="fas fa-chevron-right"></i> Get started!</h1>
      <p class="lead">
        KenSpace is currently only accessible for registered beta users.
      </p>
      <button v-on:click="loginPopup" class="link-style lead">
        <i class="fas fa-key"></i> Click here if you have received a beta key
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "LandingPage",
  methods: {
    loginPopup() {
      this.$emit("popupClick");
    }
  }
};
</script>
<style scoped lang="scss">
.fancy-nav {
  margin: 10px 0;
  border-radius: 5px;
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
