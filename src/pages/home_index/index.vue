<template>
  <div class="index-page">
	<welcome></welcome>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import Welcome from '@viewComp/welcome';
  import API from '../../apis/api'
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
	// 完成接口调用
	// async getRequest(){
	// 	 const aaa = await API('common', '00001',{
	// 		 name: '1'
	// 	 })
	// }
  }
</script>
<style lang="scss" scoped>

</style>
