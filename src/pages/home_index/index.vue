<template>
  <div class="index-page">
	<welcome></welcome>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import Welcome from '../../components/views_components/welcome'
  @Component({
    components:{
		Welcome
	},
	props:{
		
	}
  })
  export default class HomePage extends Vue {
	  
  }
</script>
<style lang="scss" scoped>

</style>
