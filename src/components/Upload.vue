<template>
  <div class="container" style="margin-top: -100px;">
    <h1>Analyze your own data</h1>
    <small>Currently only CSV Files (with "," separated) are supported</small>
    <div class="alert alert-warning mt-2 mb-2" role="alert">
      <h1 v-if="showWarning">Warning!</h1>
      <p>
        Your data will be uploaded directly to the server. If you do not want to
        share your data or if you do not have the rights of the data,
        <b>DO NOT</b> upload them.
      </p>
      <button
        v-if="showWarning"
        v-on:click="showWarning = false"
        class="btn btn-danger mt-2 mb-2"
      >
        I understand
      </button>
    </div>
    <div v-if="!showWarning">
      <vue-dropzone
        ref="myVueDropzone"
        id="dropzone"
        :options="dropzoneOptions"
        @vdropzone-complete="afterComplete"
        @vdropzone-error="failed"
      ></vue-dropzone>
      <button @click="removeFile" class="btn btn-danger mt-2 mb-2">
        Remove All Files
      </button>
    </div>

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
              <label class="upload-label">
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
              <label class="upload-label">
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
      <div
        class="alert alert-danger"
        role="alert"
        v-if="(pickedContent === '' || pickedDisplay === '') && validated"
      >
        Select columns to analyse
      </div>
      <h3 class="mt-4 mb-2">Data Language</h3>
      <p class="font-italic">
        The language of your data looks like
        <span class="upload-label">{{ originalLanguage }}</span>
      </p>
      <div v-for="(c, idx) in ['german', 'english']" v-bind:key="idx">
        <p>
          <label class="upload-label">
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
      <div v-if="!['german', 'english'].includes(originalLanguage)">
        <p>
          <label class="upload-label">
            <input
              v-on:click="techniques = 'auto'"
              class="mr-2"
              type="radio"
              name="language"
              :value="originalLanguage"
              v-model="language"
            />{{ originalLanguage }}
          </label>
        </p>
      </div>

      <h3 class="mt-4 mb-2">Language Analysis Techniques</h3>
      <div>
        <p>
          <label>
            <input
              class="mr-2"
              type="radio"
              name="techniques"
              value="auto"
              v-model="techniques"
            />Choose automatically
            <span class="text-muted font-italic ml-2">Fastest</span>
          </label>
        </p>
      </div>
      <div>
        <p>
          <label>
            <input
              class="mr-2"
              type="radio"
              name="techniques"
              value="nltk"
              v-model="techniques"
              :disabled="!['german', 'english'].includes(language)"
            />NLTK
            <span class="text-muted font-italic ml-2"
              >Analyse Text based on Language Features, Fast</span
            >
          </label>
        </p>
      </div>
      <div>
        <p>
          <label>
            <input
              class="mr-2"
              type="radio"
              name="techniques"
              value="spacy"
              v-model="techniques"
              :disabled="!['german', 'english'].includes(language)"
            />SpaCy
            <span class="text-muted font-italic ml-2"
              >Analyse Text based on Connections, <b>Slow</b></span
            >
          </label>
        </p>
      </div>
      <div
        class="alert alert-warning"
        role="alert"
        v-if="!['german', 'english'].includes(language)"
      >
        <span class="upload-label">{{ language }}</span> does not support
        user-defined "Language Analysis Techniques"
      </div>

      <h3 class="mt-4 mb-2">Recommendation Set Size</h3>
      <div>
        <p>
          <label>
            <input
              class="mr-2"
              type="radio"
              name="clusterSize"
              value="large"
              v-model="clusterSize"
            />Large
            <span class="text-muted font-italic ml-2"
              >This will result in {{ recommendationSet["large"][0] }} items per
              set and {{ recommendationSet["large"][1] }} recommendation groups,
              Fastest</span
            >
          </label>
        </p>
      </div>
      <div>
        <p>
          <label>
            <input
              class="mr-2"
              type="radio"
              name="clusterSize"
              value="medium"
              v-model="clusterSize"
            />Medium
            <span class="text-muted font-italic ml-2"
              >This will result in {{ recommendationSet["medium"][0] }} items
              per set and {{ recommendationSet["medium"][1] }} recommendation
              groups, Fast</span
            >
          </label>
        </p>
      </div>
      <div>
        <p>
          <label>
            <input
              class="mr-2"
              type="radio"
              name="clusterSize"
              value="small"
              v-model="clusterSize"
            />Small
            <span class="text-muted font-italic ml-2"
              >This will result in {{ recommendationSet["small"][0] }} items per
              set and {{ recommendationSet["small"][1] }} recommendation groups,
              <b>Slow</b></span
            ></label
          >
        </p>
      </div>
      <div
        class="alert alert-danger"
        role="alert"
        v-if="clusterSize === 'small' && this.techniques === 'spacy'"
      >
        This will take a lot of time...
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
        url: `${process.env.VUE_APP_BACKEND_URL}/upload/`,
        acceptedFiles: "text/csv,text/plain",
        maxFiles: 1,
        maxFilesize: 20,
        headers: { Authorization: `Bearer ${localStorage.apiKey}` }
      },
      cols: null,
      pickedDisplay: "",
      pickedContent: "",
      filename: "",
      language: "",
      originalLanguage: "",
      techniques: "",
      clusterSize: "",
      recommendationSet: "",
      showWarning: true,
      validated: false
    };
  },
  methods: {
    afterComplete(file) {
      let result = JSON.parse(file.xhr.response);
      this.cols = result["cols"];
      this.techniques = "auto";
      this.pickedDisplay = "";
      this.pickedContent = "";
      this.originalLanguage = result["language"];
      this.language = result["language"];
      this.filename = result["filename"];
      this.clusterSize = "medium";
      this.recommendationSet = result["recommendationSet"];
    },
    start() {
      this.validated = true;
      if (
        this.pickedContent === "" ||
        this.pickedDisplay === "" ||
        this.language === "" ||
        this.techniques === "" ||
        this.clusterSize === ""
      ) {
        return;
      }

      // AUTO -> NLTK
      if (this.techniques === "auto") {
        this.techniques = "nltk";
      }

      localStorage.settings = JSON.stringify({
        display: this.pickedDisplay,
        content: this.pickedContent,
        filename: this.filename,
        language: this.language,
        techniques: this.techniques,
        clusterSize: this.clusterSize
      });
      this.$emit("finished");
    },
    failed(file) {
      const message = JSON.parse(file.xhr.response).message;
      const elements = document.querySelectorAll(".dz-error-message span");
      const lastElement = elements[elements.length - 1];
      lastElement.textContent = message;
    },
    removeFile() {
      this.cols = null;
      this.$refs.myVueDropzone.removeAllFiles();
    }
  }
};
</script>
<style scoped lang="scss">
.upload-label {
  text-transform: capitalize;
}
</style>
