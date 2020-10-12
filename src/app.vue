<template>
  <div id="app">
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {
  
  }
})
export default class App extends Vue {
  mounted() {

  }
  beforeDestroy(){

  }
}
</script>
<style lang="scss">
	*{
		padding: 0;
		margin: 0;
	}
	body{
		width: 100%;
		background: rgba(33,33,33,0.8);
	}
</style>
