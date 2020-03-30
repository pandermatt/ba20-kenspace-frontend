module.exports = {
  // publicPath:
  //   process.env.NODE_ENV === "production" ? "/ba20-kenspace-frontend/" : "/",
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/scss/_variables.scss";`
      }
    }
  }
};
