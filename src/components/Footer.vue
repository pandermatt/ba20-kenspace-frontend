<template>
  <div>
    <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#0099ff"
        d="M0 77 C 473,283 822,-40 1920,116 V 359 H 0 V 67 Z"
      >
        <animate
          attributeName="d"
          attributeType="XML"
          dur="20s"
          repeatCount="indefinite"
          values="M0 77 C 473,283 822,-40 1920,116 V 359 H 0 V 67 Z;
          M0 77 C 973,260 1722,-53 1920,120 V 359 H 0 V 67 Z;
          M0 77 C 473,-40 1222,283 1920,136 V 359 H 0 V 67 Z;
          M0 77 C 473,283 822,-40 1920,116 V 359 H 0 V 67 Z;"
        />
      </path>
    </svg>
    <footer>
      <div class="container">
        <div class="container">
          <div class="row">
            <div class="col-sm">
              <h1>KenSpace</h1>
              <div v-if="apiKey">
                <p><b>Your Token:</b> {{ apiKey }}</p>
                <p><b>Model UUID:</b> {{ modelUuid }}</p>
              </div>
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
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: {
    apiKey: String,
    modelUuid: String
  }
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

.wave {
  position: relative;
  top: 10px;
}
</style>
