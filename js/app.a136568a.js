(function(t){function e(e){for(var s,n,o=e[0],l=e[1],c=e[2],d=0,h=[];d<o.length;d++)n=o[d],Object.prototype.hasOwnProperty.call(a,n)&&a[n]&&h.push(a[n][0]),a[n]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(t[s]=l[s]);u&&u(e);while(h.length)h.shift()();return r.push.apply(r,c||[]),i()}function i(){for(var t,e=0;e<r.length;e++){for(var i=r[e],s=!0,o=1;o<i.length;o++){var l=i[o];0!==a[l]&&(s=!1)}s&&(r.splice(e--,1),t=n(n.s=i[0]))}return t}var s={},a={app:0},r=[];function n(e){if(s[e])return s[e].exports;var i=s[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=s,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(i,s,function(e){return t[e]}.bind(null,s));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/ba20-kenspace-frontend/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var u=l;r.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"1c4d":function(t,e,i){},"229f":function(t,e,i){},4873:function(t,e,i){"use strict";var s=i("229f"),a=i.n(s);a.a},"53cc":function(t,e,i){},"56d7":function(t,e,i){"use strict";i.r(e);var s=i("2b0e"),a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("Home")],1)},r=[],n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"header-container"},[i("div",{staticClass:"container"},[t._m(0),t.apiKey?i("div",[i("p",[i("b",[t._v("Hello!")]),t._v(" "),i("button",{staticClass:"link-style",on:{click:t.logout}},[t._v("logout")])]),i("button",{staticClass:"link-style",on:{click:t.clearFiltered}},[t._v(" clear picked ")]),t._v(" | "),i("button",{staticClass:"link-style",on:{click:t.clearDeleted}},[t._v(" clear deleted ")]),t._v(" | "),i("button",{staticClass:"link-style",on:{click:t.resetApp}},[t._v(" reset & generate new model ")]),i("div",{staticClass:"row"},[i("div",{staticClass:"col-md-6"},[i("div",{staticClass:"display-filter"},[i("b",[t._v("picked")]),t._v(" "),0===t.filterByList.length?i("span",[t._v("none")]):t._e(),i("transition-group",{attrs:{name:"list"}},t._l(t.filterByList,(function(e,s){return i("span",{key:s+0,staticClass:"badge badge-dark mr-1 cursor-pointer",staticStyle:{"padding-right":"20px"},on:{click:function(i){return t.removeFilter(e)}}},[t._v(t._s(e)+" "),i("i",{staticClass:"ri-close-circle-line",staticStyle:{position:"absolute","padding-left":"5px"}})])})),0)],1),i("div",[i("b",[t._v("deleted")]),t._v(" "),0===t.deletedList.length?i("span",[t._v("none")]):t._e(),i("transition-group",{attrs:{name:"list"}},t._l(t.deletedList,(function(e,s){return i("span",{key:s+0,staticClass:"badge badge-dark mr-1 cursor-pointer",staticStyle:{"padding-right":"20px"},on:{click:function(i){return t.removeDeleted(e)}}},[t._v(t._s(e)+" "),i("i",{staticClass:"ri-close-circle-line",staticStyle:{position:"absolute","padding-left":"5px"}})])})),0)],1)]),0!==t.originalQueriesData.length?i("div",{staticClass:"col-md-6"},[i("div",{staticClass:"mt-4 search-bar"},[i("div",{staticStyle:{position:"relative"}},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.searchText,expression:"searchText"}],staticClass:"search",attrs:{type:"text"},domProps:{value:t.searchText},on:{input:[function(e){e.target.composing||(t.searchText=e.target.value)},t.search]}}),i("span",{staticClass:"focus-border"})])]),i("button",{staticClass:"btn btn-primary btn-search",on:{click:t.search}},[t._v(" Search ")])]):t._e()])]):t._e()])]),t.apiKey?t._e():i("div",{staticClass:"container login-page"},[i("div",{staticClass:"jumbotron home-box"},[i("h1",{staticClass:"display-4"},[t._v("Sorry!")]),i("p",{staticClass:"lead"},[t._v(" This page is currently only accessible for registered beta users. ")]),i("hr",{staticClass:"my-4"}),i("button",{staticClass:"link-style",on:{click:t.login}},[t._v(" Click here if you have received a beta key ")])])]),t.apiKey&&t.upload?i("Upload",{on:{finished:t.loadContent}}):t._e(),t.apiKey&&!t.upload?i("div",{staticClass:"home-box"},[i("div",{staticClass:"hamburger cursor-pointer",class:{active:t.showMobileMenu},attrs:{id:"hamburger-circle"},on:{click:function(e){t.showMobileMenu=!t.showMobileMenu}}},[i("span",{staticClass:"line"}),i("span",{staticClass:"line"}),i("span",{staticClass:"line"})]),i("div",{staticClass:"wrapper"},[i("nav",{class:{active:t.showMobileMenu},attrs:{id:"sidebar"}},[i("h3",[t._v(" Facet "),i("button",{staticClass:"btn btn-light",attrs:{type:"button"},on:{click:t.changeSort}},[t._v(" Sort "),i("i",{staticClass:"fas",class:[t.sortABC?"fa-sort-numeric-down":"fa-sort-alpha-down"]})])]),i("div",{staticClass:"sidebar-card"},[0===Object.keys(t.facetData).length?i("div",[i("Loading")],1):t._e(),t._l(Object.keys(t.facetData).slice(0,t.facetLimit),(function(e,s){return i("div",{key:s,staticClass:"facet-badge"},[i("span",{staticClass:"badge cursor-pointer",class:[t.filterByList.includes(e)?"badge-info":"badge-dark"],on:{click:function(i){return t.toggleFilter(e)}}},[t._v(t._s(e)+" "),i("span",{staticClass:"badge",class:[t.tagsSameAsResult?"badge-danger":"badge-light"]},[t._v(t._s(t.facetData[e]))])]),i("div",{staticClass:"action-box"},[t.filterByList.includes(e)?t._e():i("div",{on:{click:function(i){return t.addFilter(e)}}},[i("i",{staticClass:"ri-heart-line"}),t._v(" Pick "),i("i",{staticClass:"far fa-object-group",staticStyle:{"margin-left":"6px"}}),t._v(" "+t._s(t.facetClusterNumber[e].length)+" ")]),t.filterByList.includes(e)?i("div",{on:{click:function(i){return t.removeFilter(e)}}},[i("i",{staticClass:"ri-heart-2-line"}),t._v(" Unpick ")]):t._e(),i("hr"),i("div",{on:{click:function(i){return t.addDeleted(e)}}},[i("i",{staticClass:"ri-delete-bin-2-line"}),t._v(" Remove ")])])])})),t.facetLimit<Object.keys(t.facetData).length?i("button",{staticClass:"btn btn-light w-100 mt-4",attrs:{type:"button"},on:{click:function(e){t.facetLimit=t.facetLimit+200}}},[t._v(" Show More ")]):t._e()],2)]),i("div",{class:{active:t.showMobileMenu},attrs:{id:"content"}},[i("h3",[t._v(" Result: "),i("span",{staticClass:"small"},[t._v(t._s(t.queriesData.length))]),i("ProgressBar",{attrs:{result:t.queriesData.length,"result-total":t.originalQueriesData.length}})],1),0!==t.queriesData.length||t.noResults?t._e():i("div",[i("div",{staticClass:"alert alert-info",attrs:{role:"alert"}},[t._v(" Generating, please wait. ")]),i("Loading")],1),t.noResults?i("div",[i("div",{staticClass:"alert alert-warning",attrs:{role:"alert"}},[t._v(" Your selection has no result. ")])]):t._e(),t._l(t.queriesData.slice(0,t.queryLimit),(function(e,s){return i("div",{key:s,staticClass:"card content-card"},[i("div",{staticClass:"show-similar",class:{active:t.similarActive},on:{click:function(i){return t.sortSimilarObjects(e.cluster_id)}}},[t.similarActive?t._e():i("div",[i("i",{staticClass:"fas fa-greater-than-equal"}),t._v(" show similar records ")]),t.similarActive?i("div",[i("i",{staticClass:"fas fa-less-than-equal"}),t._v(" show all records ")]):t._e()]),e.meta_info.image?i("div",{staticClass:"card-header"},[i("img",{attrs:{src:e.meta_info.image,alt:"Movie Cover"}})]):t._e(),i("div",{staticClass:"card-body",class:{"card-body-with-image":e.meta_info.image}},[i("h5",{staticClass:"card-title card-title-similar"},[t._v(t._s(e.text))]),i("p",{staticClass:"small"},[t._v(t._s(e.meta_info.content))]),i("div",t._l(e.data,(function(e,s){return i("span",{key:s,staticClass:"badge badge-pill badge-secondary mr-1 cursor-pointer",on:{click:function(i){return t.addFilter(e,!1)}}},[t._v(t._s(e)+" ")])})),0)]),t.queriesData.length!==t.originalQueriesData.length?i("div",{staticClass:"card-footer",class:{"card-footer-with-image":e.meta_info.image}},[i("FeedbackButtons",{attrs:{submitted:!1},on:{up:function(i){return t.shareFeedback("yes",e.text)},down:function(i){return t.shareFeedback("no",e.text)}}})],1):t._e()])})),t.queryLimit<t.queriesData.length?i("button",{staticClass:"btn btn-light w-100",attrs:{type:"button"},on:{click:function(e){t.queryLimit=t.queryLimit+5}}},[t._v(" Show More ")]):t._e()],2)])]):t._e(),i("Footer",{attrs:{"api-key":t.apiKey,"model-uuid":t.modelUuid}})],1)},o=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("h1",[i("b",{staticClass:"logo"},[t._v("KenSpace")]),i("span",{staticClass:"badge badge-secondary"},[t._v("Beta")])])}],l=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("svg",{staticClass:"wave",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1440 320"}},[i("path",{attrs:{fill:"#0099ff",d:"M0 77 C 473,283 822,-40 1920,116 V 359 H 0 V 67 Z"}},[i("animate",{attrs:{attributeName:"d",attributeType:"XML",dur:"20s",repeatCount:"indefinite",values:"M0 77 C 473,283 822,-40 1920,116 V 359 H 0 V 67 Z;\n        M0 77 C 973,260 1722,-53 1920,120 V 359 H 0 V 67 Z;\n        M0 77 C 473,-40 1222,283 1920,136 V 359 H 0 V 67 Z;\n        M0 77 C 473,283 822,-40 1920,116 V 359 H 0 V 67 Z;"}})])]),i("footer",[i("div",{staticClass:"container"},[i("div",{staticClass:"container"},[i("div",{staticClass:"row"},[i("div",{staticClass:"col-sm"},[i("h1",[t._v("KenSpace")]),t.apiKey?i("div",[i("p",[i("b",[t._v("Your Token:")]),t._v(" "+t._s(t.apiKey))]),i("p",[i("b",[t._v("Model UUID:")]),t._v(" "+t._s(t.modelUuid))])]):t._e()]),t._m(0)])])])])])},c=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"col-sm"},[i("p",{staticClass:"author"},[t._v(" Pascal Andermatt"),i("br"),t._v(" Stefan Brunner ")])])}],u={name:"Footer",props:{apiKey:String,modelUuid:String}},d=u,h=(i("7583"),i("2877")),p=Object(h["a"])(d,l,c,!1,null,"2871ba14",null),f=p.exports,m=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},v=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"sk-folding-cube"},[i("div",{staticClass:"sk-cube1 sk-cube"}),i("div",{staticClass:"sk-cube2 sk-cube"}),i("div",{staticClass:"sk-cube4 sk-cube"}),i("div",{staticClass:"sk-cube3 sk-cube"})])}],g={name:"Loading"},b=g,y=(i("a430"),Object(h["a"])(b,m,v,!1,null,"72a14539",null)),_=y.exports,C=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"progress"},[i("div",{staticClass:"bar",style:t.progressStyles},[i("p",{staticClass:"percent"},[t._v(t._s(t.result))])])])},k=[],w={name:"ProgressBar",props:{result:null,resultTotal:null},computed:{progressStyles(){return{width:`${this.result/this.resultTotal*100}%`}}}},S=w,L=(i("e190"),Object(h["a"])(S,C,k,!1,null,"43c94896",null)),D=L.exports,B=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t.submitted?t._e():i("div",[t._v(" Is this helpful? "),i("button",{staticClass:"link-style",on:{click:function(e){return t.share("up")}}},[i("i",{staticClass:"far fa-thumbs-up ml-3"}),t._v(" Yes ")]),i("button",{staticClass:"link-style",on:{click:function(e){return t.share("down")}}},[i("i",{staticClass:"far fa-thumbs-down ml-3"}),t._v(" No ")])]),t.submitted?i("div",[i("i",[t._v("Thanks for your feedback")])]):t._e()])},x=[],O={props:{submitted:Boolean},methods:{share(t){this.$emit(t),this.submitted=!0}}},F=O,q=(i("c121"),Object(h["a"])(F,B,x,!1,null,"75b20a3f",null)),A=q.exports,T=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"container",staticStyle:{"margin-top":"-100px"}},[i("h1",[t._v("Analyze your own data")]),i("small",[t._v('Currently only CSV Files (with "," separated) are supported')]),i("vue-dropzone",{ref:"myVueDropzone",attrs:{id:"dropzone",options:t.dropzoneOptions},on:{"vdropzone-complete":t.afterComplete}}),i("button",{staticClass:"btn btn-danger mt-2 mb-2",on:{click:t.removeFile}},[t._v(" Remove All Files ")]),t.cols?i("div",[i("table",{staticClass:"table mt-2 mb-2"},[t._m(0),i("tbody",t._l(t.cols,(function(e,s){return i("tr",{key:s},[i("td",[i("label",[i("input",{directives:[{name:"model",rawName:"v-model",value:t.pickedDisplay,expression:"pickedDisplay"}],staticClass:"mr-2",attrs:{type:"radio",name:"display"},domProps:{value:e,checked:t._q(t.pickedDisplay,e)},on:{change:function(i){t.pickedDisplay=e}}}),t._v(t._s(e)+" ")])]),i("td",[i("label",[i("input",{directives:[{name:"model",rawName:"v-model",value:t.pickedContent,expression:"pickedContent"}],staticClass:"mr-2",attrs:{type:"radio",name:"content"},domProps:{value:e,checked:t._q(t.pickedContent,e)},on:{change:function(i){t.pickedContent=e}}}),t._v(t._s(e)+" ")])])])})),0)]),i("p",[i("b",[t._v("Display Text:")]),t._v(" "+t._s(t.pickedDisplay))]),i("p",[i("b",[t._v("Content:")]),t._v(" "+t._s(t.pickedContent))]),""===this.pickedContent||""===this.pickedDisplay?i("div",{staticClass:"alert alert-danger",attrs:{role:"alert"}},[t._v(" Select columns to analyse ")]):t._e(),i("h3",{staticClass:"mt-2 mb-2"},[t._v("Data Language")]),t._l(["german","english"],(function(e,s){return i("div",{key:s},[i("p",[i("label",[i("input",{directives:[{name:"model",rawName:"v-model",value:t.language,expression:"language"}],staticClass:"mr-2",attrs:{type:"radio",name:"language"},domProps:{value:e,checked:t._q(t.language,e)},on:{change:function(i){t.language=e}}}),t._v(t._s(e)+" ")])])])})),""===this.language?i("div",{staticClass:"alert alert-danger",attrs:{role:"alert"}},[t._v(" Select language ")]):t._e(),i("button",{staticClass:"btn btn-primary",on:{click:t.start}},[t._v("Start")])],2):t._e()],1)},j=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("thead",[i("tr",[i("th",{attrs:{scope:"col"}},[t._v("Display Text")]),i("th",{attrs:{scope:"col"}},[t._v("Content")])])])}],M=i("92c3"),P=i.n(M),K=(i("1e3f"),{name:"Upload",components:{vueDropzone:P.a},data:function(){return{dropzoneOptions:{url:"http://127.0.0.1:5000/upload/",acceptedFiles:"text/csv",maxFiles:1,maxFilesize:20,headers:{Authorization:`Bearer ${localStorage.apiKey}`}},cols:null,pickedDisplay:"",pickedContent:"",filename:"",language:""}},methods:{afterComplete(t){let e=JSON.parse(t.xhr.response);this.cols=e["cols"],this.filename=e["filename"]},start(){""!==this.pickedContent&&""!==this.pickedDisplay&&(localStorage.settings=JSON.stringify({display:this.pickedDisplay,content:this.pickedContent,filename:this.filename,language:this.language}),this.$emit("finished"))},removeFile(){this.cols=null,this.$refs.myVueDropzone.removeAllFiles()}}}),E=K,N=Object(h["a"])(E,T,j,!1,null,null,null),z=N.exports,$={name:"Home",components:{Upload:z,FeedbackButtons:A,ProgressBar:D,Loading:_,Footer:f},props:{msg:String},data:function(){return{apiKey:"",showMobileMenu:!1,originalQueriesData:[],filterByList:[],deletedList:[],queriesData:[],facetData:{},facetClusterNumber:{},maxFacetClusterNumber:null,queryLimit:10,facetLimit:200,searchText:"",noResults:!1,tagsSameAsResult:!1,modelUuid:"",sortABC:!1,similarActive:!1,currentClusterId:null,upload:!1,removeFilterFunc:null}},computed:{badgeHeatMap(t){return{width:`${t}%`}}},methods:{login:async function(){const t=i("3d20"),{value:e}=await t.fire({title:"Enter your Beta Key",input:"text",inputPlaceholder:"Enter your Beta Key",inputAttributes:{autocapitalize:"off",autocorrect:"off"},showClass:{popup:"animated zoomIn faster"},hideClass:{popup:"animated zoomOut faster"}}),s=t.mixin({icon:"error",showConfirmButton:!1,timer:1500,timerProgressBar:!0,footer:"Please contact an administrator",hideClass:{popup:"animated zoomOut faster"}});if(e){const a=i("bc3a"),r=this;a({method:"GET",url:"https://kenspace.cloudlab.zhaw.ch/auth/",headers:{Authorization:`Bearer ${e}`}}).then((function(i){"successful"===i.data&&(r.apiKey=e,t.fire({icon:"success",title:"Signed in successfully",toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3,timerProgressBar:!0,onOpen:e=>{e.addEventListener("mouseenter",t.stopTimer),e.addEventListener("mouseleave",t.resumeTimer)}}),localStorage.apiKey=e,"custom"===e.split(":")[1]?r.upload=!0:r.loadContent())})).catch((function(){s.fire({title:"Your key is not valid"})}))}else s.fire({title:"Your key is empty"})},logout:function(){this.apiKey="",localStorage.modelUuid="",this.filterByList=[],this.deletedList=[],this.facetData={},this.queriesData=[],this.noResults=!1,this.facetLimit=200,this.queryLimit=10,this.searchText="",localStorage.settings="",this.similarActive=!1;const t=i("3d20");t.fire({icon:"success",title:"Log out successfully",toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3,timerProgressBar:!0,onOpen:e=>{e.addEventListener("mouseenter",t.stopTimer),e.addEventListener("mouseleave",t.resumeTimer)}})},resetApp:function(){localStorage.modelUuid="",this.filterByList=[],this.deletedList=[],this.facetData={},this.queriesData=[],this.noResults=!1,this.facetLimit=200,this.queryLimit=10,this.searchText="",this.similarActive=!1;const t=i("3d20");t.fire({icon:"success",title:"Generating new Cluster",position:"top-end",showConfirmButton:!1,timer:2e3,timerProgressBar:!0,onOpen:e=>{e.addEventListener("mouseenter",t.stopTimer),e.addEventListener("mouseleave",t.resumeTimer)}}),this.loadContent()},loadContent:async function(){const t=i("bc3a"),e=i("3d20");this.upload=!1;const s=this;let a={};localStorage.modelUuid&&(a={uuid:localStorage.modelUuid}),0!==this.deletedList.length&&(a={...a,deletedWords:JSON.stringify(this.deletedList)}),localStorage.settings&&(a={...a,settings:localStorage.settings}),t({method:"GET",url:"https://kenspace.cloudlab.zhaw.ch/queries/",params:a,headers:{Authorization:`Bearer ${localStorage.apiKey}`}}).then((function(t){s.originalQueriesData=t.data["results"],s.queriesData=t.data["results"],s.modelUuid=t.data["uuid"],localStorage.modelUuid=t.data["uuid"],s.removeFilter(""),e.close()})).catch(()=>{e.fire({title:"Oops... Something went wrong!",text:"Please reset the app",showCancelButton:!0,confirmButtonColor:"#d33",confirmButtonText:"Reset App",icon:"error"}).then(t=>{t.value&&s.logout()})})},generateFacet:function(t){let e={},i={};for(let r=0;r<t.length;r++){let s=t[r].data,a=t[r].cluster_id;for(let t=0;t<s.length;t++)s[t]in e?(e[s[t]]++,i[s[t]].includes(a)||i[s[t]].push(a)):(e[s[t]]=1,i[s[t]]=[a])}this.facetClusterNumber=i;let s=Object.keys(e),a=this.queriesData.length;this.tagsSameAsResult=s.every(t=>e[t]===a),this.facetData=this.sortObject(e)},changeSort:function(){this.sortABC=!this.sortABC,this.facetData=this.sortObject(this.facetData)},sortObject:function(t){let e=Object.keys(t).map((function(e){return[e,t[e]]}));this.sortABC?e.sort((function(t,e){return t[0]<e[0]?-1:t[0]>e[0]?1:0})):e.sort((function(t,e){return e[1]-t[1]}));let s={};const a=i("1157");return a.each(e,(function(t,e){s[e[0]]=e[1]})),s},groupCluster:function(){this.similarActive&&(this.queriesData=this.queriesData.filter(t=>t["cluster_id"]==this.currentClusterId))},sortSimilarObjects:function(t){this.similarActive=!this.similarActive,this.currentClusterId=null,this.similarActive&&(this.currentClusterId=t),this.removeFilter("")},toggleFilter:function(t){this.filterByList.includes(t)?this.removeFilter(t):this.addFilter(t)},addFilter:function(t){this.filterByList.includes(t)||(this.queryLimit=5,this.filterByList.push(t),this.queriesData=this.queriesData.filter(e=>e["data"].includes(t)),this.generateFacet(this.queriesData))},clearFiltered:function(){this.noResults=!1,this.filterByList=[],this.queriesData=[...this.originalQueriesData],this.groupCluster(),this.filterBySearch(),this.generateFacet(this.queriesData)},filterBySearch:function(){if(""!==this.searchText){const t=i("ffe7");let e={shouldSort:!0,threshold:.6,location:0,distance:100,maxPatternLength:32,minMatchCharLength:1,keys:["text","meta_info.content"]},s=new t(this.queriesData,e);this.queriesData=s.search(this.searchText)}},removeFilter:function(t){this.noResults=!1,this.filterByList=this.filterByList.filter(e=>e!==t),this.queriesData=[...this.originalQueriesData];for(let e=0;e<this.filterByList.length;e++)this.queriesData=this.queriesData.filter(t=>t["data"].includes(this.filterByList[e]));this.groupCluster(),this.filterBySearch(),0===this.queriesData.length&&(this.noResults=!0),this.generateFacet(this.queriesData)},addDeleted:function(t){if(this.deletedList.includes(t))return;this.deletedList.push(t),this.removeFilter(t);const e=i("3d20");e.fire({title:"Generating new Cluster",onBeforeOpen:()=>{e.showLoading(),this.queriesData=[],this.loadContent()},showConfirmButton:!1})},clearDeleted:function(){this.noResults=!1,this.deletedList=[];const t=i("3d20");t.fire({title:"Generating new Cluster",onBeforeOpen:()=>{t.showLoading(),this.loadContent()},showConfirmButton:!1})},removeDeleted:function(t){this.deletedList=this.deletedList.filter(e=>e!==t);const e=i("3d20");e.fire({title:"Generating new Cluster",onBeforeOpen:()=>{e.showLoading(),this.queriesData=[],this.loadContent()},showConfirmButton:!1})},search:function(){if(""===this.searchText)return this.queriesData=[...this.originalQueriesData],void this.removeFilter("");this.removeFilterFunc("")},shareFeedback:function(t,e){let s={uuid:localStorage.modelUuid,isHelpful:t,movieTitle:e,similarClusterActive:this.similarActive,search:this.searchText,facet:JSON.stringify(this.filterByList),delete:JSON.stringify(this.deletedList),resultCount:this.queriesData.length};const a=i("bc3a");a({method:"POST",url:"https://kenspace.cloudlab.zhaw.ch/feedback/",params:s,headers:{Authorization:`Bearer ${localStorage.apiKey}`}})}},watch:{apiKey(t){localStorage.apiKey=t},filterByList(t){localStorage.filterByList=JSON.stringify(t)},deletedList(t){localStorage.deletedList=JSON.stringify(t)}},mounted(){const t=i("2ef0");this.removeFilterFunc=t.debounce(this.removeFilter,400),localStorage.filterByList&&(this.filterByList=JSON.parse(localStorage.filterByList)),localStorage.deletedList&&(this.deletedList=JSON.parse(localStorage.deletedList)),localStorage.modelUuid&&(this.modelUuid=localStorage.modelUuid),localStorage.apiKey&&(this.apiKey=localStorage.apiKey,this.loadContent())}},U=$,R=(i("4873"),Object(h["a"])(U,n,o,!1,null,"6623f318",null)),V=R.exports,H={name:"App",components:{Home:V}},J=H,Q=(i("5c0b"),Object(h["a"])(J,a,r,!1,null,null,null)),G=Q.exports,I=i("9483");Object(I["a"])("/ba20-kenspace-frontend/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(t){console.error("Error during service worker registration:",t)}});i("4989"),i("ab8b");s["a"].config.productionTip=!1,new s["a"]({render:function(t){return t(G)}}).$mount("#app")},"5c0b":function(t,e,i){"use strict";var s=i("9c0c"),a=i.n(s);a.a},"6bdb":function(t,e,i){},7242:function(t,e,i){},7583:function(t,e,i){"use strict";var s=i("53cc"),a=i.n(s);a.a},"9c0c":function(t,e,i){},a430:function(t,e,i){"use strict";var s=i("7242"),a=i.n(s);a.a},c121:function(t,e,i){"use strict";var s=i("6bdb"),a=i.n(s);a.a},e190:function(t,e,i){"use strict";var s=i("1c4d"),a=i.n(s);a.a}});
//# sourceMappingURL=app.a136568a.js.map