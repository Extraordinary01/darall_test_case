<template>
	<header-vue></header-vue>
	<main class="container">
		<router-view></router-view>
	</main>
</template>

<script>
	import HeaderVue from "@/components/Header.vue";
	export default {
		components: {
			HeaderVue,
		},
	};
</script>

<style lang="scss">
	@import "@/assets/scss/style.scss";
</style>
