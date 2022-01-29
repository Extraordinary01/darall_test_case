<template>
	<section class="menu mt-4">
		<h1 class="title">Меню</h1>
		<div class="row">
			<table class="table table-striped">
				<thead>
					<tr>
						<th scope="col">Название</th>
						<th scope="col">Цена</th>
						<th scope="col">Категория</th>
						<th scope="col">Страна происхождения</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in dishes" :key="item.id">
						<th scope="row">{{ item.name }}</th>
						<th>{{ item.price }}</th>
						<td>{{ item.category.name }}</td>
						<td>{{ item.country.name }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>
</template>

<script>
	import { ref } from "vue";
	import api from "@/api/api";
	export default {
		async setup() {
			const dishes = ref({});
			const loadDishes = async () => {
				const response = await api.get("/dishes");
				console.log(response.data);
				dishes.value = response.data;
			};
			loadDishes();
			return {
				dishes,
			};
		},
	};
</script>

<style lang="scss">
	@import "@/assets/scss/style.scss";

	thead {
		background-color: $backgroundColor;
	}
</style>
