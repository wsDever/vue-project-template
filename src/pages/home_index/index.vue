<template>
  <!-- 入口逻辑处理 -->
  <div class="index-page">
    Hello World !
  </div>
</template>

<script>
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    components:{
      
	},
	props:{
		
	}
  })
  export default class HomePage extends Vue {
   
  }
</script>
<style lang="scss" scoped>
.index-page{
	width: 100%;
	margin-top: 20%;
	color: #fff;
	font-size: 44px;
	text-align: center;
}
</style>
