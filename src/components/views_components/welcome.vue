<template>
	<div class="welcome-box">
		<a-result
			status="success"
			title="恭喜，项目模板下载成功"
			sub-title="当你看到这个页面的时候，表明你的项目模板已下载成功，请开始愉快的开发吧！"
		>
			<template #extra>
				<a-button type="primary" @click="showMessage">
					I konw !
				</a-button>
				<a-button @click="showToast">
					Thanks !
				</a-button>
			</template>
		</a-result>
	</div>
</template>


<script>


import Vue from 'vue'
import Component from 'vue-class-component'


@Component({
	components: {

	}
})
export default class Welcome extends Vue{



	showMessage(){
		this.$message.info("三方组件仓使用成功")
	}
	showToast(){
		this.$wsuiToast({ message: "自定义组件使用成功", position: "middle" })
	}
}
</script>


<style lang='scss' scoped>
.welcome-box{
	padding-top: 160px;
}
</style>