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
        v-if="(pickedContent === '' || pickedDisplay === '') && validated"
      >
        Select columns to analyse
      </div>
      <h3 class="mt-4 mb-2">Data Language</h3>
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
      <div
        class="alert alert-danger"
        role="alert"
        v-if="language === '' && validated"
      >
        Select language
      </div>
      <h3 class="mt-4 mb-2">Language Analysis Techniques</h3>
      <div>
        <p>
          <label>
            <input
              class="mr-2"
              type="radio"
              name="techniques"
              :value="nltk"
              v-model="techniques"
            />NLTK
            <span class="text-muted font-italic ml-2"
              >Analyse Text based on Language Features, Faster</span
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
              :value="spacy"
              v-model="techniques"
            />SpaCy
            <span class="text-muted font-italic ml-2"
              >Analyse Text based on Connections, Slower</span
            >
          </label>
        </p>
      </div>
      <div
        class="alert alert-danger"
        role="alert"
        v-if="techniques === '' && validated"
      >
        Select Language Analysis Techniques
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
        acceptedFiles: "text/csv",
        maxFiles: 1,
        maxFilesize: 20,
        headers: { Authorization: `Bearer ${localStorage.apiKey}` }
      },
      cols: null,
      pickedDisplay: "",
      pickedContent: "",
      filename: "",
      language: "",
      techniques: "",
      showWarning: true,
      validated: false
    };
  },
  methods: {
    afterComplete(file) {
      let result = JSON.parse(file.xhr.response);
      this.cols = result["cols"];
      this.filename = result["filename"];
    },
    start() {
      this.validated = true;
      if (
        this.pickedContent === "" ||
        this.pickedDisplay === "" ||
        this.language === "" ||
        this.techniques === ""
      ) {
        return;
      }

      localStorage.settings = JSON.stringify({
        display: this.pickedDisplay,
        content: this.pickedContent,
        filename: this.filename,
        language: this.language,
        techniques: this.techniques
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
