<template>
  <div class="container" style="margin-top: -100px;">
    <h1>Analyze your own data</h1>
    <small>Currently only CSV Files (with "," separated) are supported</small>

    <vue-dropzone
      ref="myVueDropzone"
      id="dropzone"
      :options="dropzoneOptions"
      @vdropzone-complete="afterComplete"
    ></vue-dropzone>
    <button @click="removeFile" class="btn btn-danger mt-2 mb-2">
      Remove All Files
    </button>

    <div v-if="cols">
      <table class="table mt-2 mb-2">
        <thead>
          <tr>
            <th scope="col">Display Text</th>
            <th scope="col">Content</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(c, idx) in cols" v-bind:key="idx">
            <td>
              <label>
                <input
                  class="mr-2"
                  type="radio"
                  name="display"
                  :value="c"
                  v-model="pickedDisplay"
                />{{ c }}
              </label>
            </td>
            <td>
              <label>
                <input
                  class="mr-2"
                  type="radio"
                  name="content"
                  :value="c"
                  v-model="pickedContent"
                />{{ c }}
              </label>
            </td>
          </tr>
        </tbody>
      </table>
      <p><b>Display Text:</b> {{ pickedDisplay }}</p>
      <p><b>Content:</b> {{ pickedContent }}</p>
      <div
        class="alert alert-danger"
        role="alert"
        v-if="this.pickedContent === '' || this.pickedDisplay === ''"
      >
        Select columns to analyse
      </div>
      <h3 class="mt-2 mb-2">Data Language</h3>
      <div v-for="(c, idx) in ['german', 'english']" v-bind:key="idx">
        <p>
          <label>
            <input
              class="mr-2"
              type="radio"
              name="language"
              :value="c"
              v-model="language"
            />{{ c }}
          </label>
        </p>
      </div>
      <div class="alert alert-danger" role="alert" v-if="this.language === ''">
        Select language
      </div>
      <button @click="start" class="btn btn-primary">Start</button>
    </div>
  </div>
</template>
<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

export default {
  name: "Upload",
  components: {
    vueDropzone: vue2Dropzone
  },
  data: function() {
    return {
      dropzoneOptions: {
        url: "http://127.0.0.1:5000/upload/",
        acceptedFiles: "text/csv",
        maxFiles: 1,
        maxFilesize: 20,
        headers: { Authorization: `Bearer ${localStorage.apiKey}` }
      },
      cols: null,
      pickedDisplay: "",
      pickedContent: "",
      filename: "",
      language: ""
    };
  },
  methods: {
    afterComplete(file) {
      let result = JSON.parse(file.xhr.response);
      this.cols = result["cols"];
      this.filename = result["filename"];
    },
    start() {
      if (this.pickedContent === "" || this.pickedDisplay === "") {
        return;
      }

      localStorage.settings = JSON.stringify({
        display: this.pickedDisplay,
        content: this.pickedContent,
        filename: this.filename,
        language: this.language
      });
      this.$emit("finished");
    },
    removeFile() {
      this.cols = null;
      this.$refs.myVueDropzone.removeAllFiles();
    }
  }
};
</script>
