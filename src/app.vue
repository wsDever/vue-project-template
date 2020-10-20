<template>
  <div id="app">
	<net-check></net-check>
	<!-- 可根据需求添加模块 -->
    <div>
      <router-view />
    </div>
  </div>
</template>

<style src="./styles/global.scss"></style>
<script>
import Vue from "vue";
import Component from "vue-class-component";
import NetCheck from '@viewComp/net_check';
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

</style>
