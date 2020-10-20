<template>
	<div v-show="offline">
		网络检测模块
	</div>
</template>


<script>


import Vue from 'vue'
import Component from 'vue-class-component'


@Component({
	components: {

	}
})
export default class NetCheck extends Vue{


	offline = false
	created() {

	}
	 mounted() {

	}
}
</script>


<style lang='scss' scoped>


</style>