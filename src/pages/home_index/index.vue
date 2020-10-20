<template>
  <div class="index-page">
	<welcome></welcome>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import Welcome from '@viewComp/welcome'
  @Component({
    components:{
		Welcome
	},
	props:{
		
	}
  })
  export default class HomePage extends Vue {
	  created(){
		//   说明
		//   需要在页面中 完成对 httpEvbus 事件的绑定及具体实现
	  }
  }
</script>
<style lang="scss" scoped>

</style>
