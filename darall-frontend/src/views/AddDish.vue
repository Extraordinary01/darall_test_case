<template>
	<section class="add-dish section">
		<div class="alert alert-success" role="alert" v-if="successAlert">
			<div class="row">
				<div class="col-lg-11">Вы успешно добавили блюдо в меню!</div>
				<div class="col-lg-1">
					<span class="link" @click="successAlert = false">x</span>
				</div>
			</div>
		</div>
		<h1 class="add-dish__title title mt-3">Добавить блюдо</h1>
		<form class="add-dish__form row">
			<custom-input
				class="form-field col-lg-12"
				@change="labelOff($event)"
				id="name"
				type="text"
				:isRequired="true"
				v-model="name"
				label="Название"
			></custom-input>

			<custom-input
				class="form-field col-lg-12"
				@change="labelOff($event)"
				id="price"
				type="number"
				:isRequired="true"
				v-model.number="price"
				label="Цена"
			></custom-input>
			<select
				v-if="showCategory"
				v-model="category"
				class="custom-select add-dish__select col-lg-12"
			>
				<option selected disabled value="">Выберите категорию</option>
				<option v-for="item in categories" :key="item.id" :value="item.id">
					{{ item.name }}
				</option>
			</select>
			<div class="row col-lg-12" v-else>
				<custom-input
					class="form-field col-lg-9"
					id="category"
					type="text"
					:is-required="true"
					label="Категория"
					v-model="categoryName"
					@change="labelOff($event)"
				></custom-input>
				<div class="col-lg-3">
					<button class="btn btn-lg main-btn" @click.prevent="createCategory">
						Добавить
					</button>
				</div>
			</div>
			<div class="col-lg-12 mb-4">
				<small v-if="showCategory" class="text-muted"
					>Если категории которую вы ищете нету, то тогда
					<span class="main-link" @click="showCategory = !showCategory"
						>создайте!</span
					></small
				>
				<small v-else class="text-muted"
					>Если вы по ошибке перешли сюда и категория вашего блюда уже
					существует, то тогда нажмите
					<span class="main-link" @click="showCategory = !showCategory"
						>сюда!</span
					></small
				>
			</div>
			<select
				v-if="showCountry"
				v-model="country"
				class="custom-select add-dish__select col-lg-12"
			>
				<option selected disabled value="">
					Выберите страну происхождения
				</option>
				<option v-for="item in countries" :key="item.id" :value="item.id">
					{{ item.name }}
				</option>
			</select>
			<div class="row col-lg-12" v-else>
				<custom-input
					class="form-field col-lg-9"
					id="country"
					type="text"
					:is-required="true"
					label="Страна"
					v-model="countryName"
					@change="labelOff($event)"
				></custom-input>
				<div class="col-lg-3">
					<button class="btn btn-lg main-btn" @click.prevent="createCountry">
						Добавить
					</button>
				</div>
			</div>
			<div class="col-lg-12 mb-4">
				<small v-if="showCountry" class="text-muted"
					>Если страна происхождения вашего блюда не существует, то тогда
					<span class="main-link" @click="showCountry = !showCountry"
						>добавьте!</span
					></small
				>
				<small v-else class="text-muted"
					>Если вы по ошибке перешли сюда и страна происхождения вашего блюда
					уже существует, то тогда нажмите
					<span class="main-link" @click="showCountry = !showCountry"
						>сюда!</span
					></small
				>
			</div>
			<div class="form-field col-lg-12">
				<button class="btn btn-lg main-btn" @click.prevent="createDish">
					Добавить
				</button>
			</div>
		</form>
	</section>
</template>

<script>
	import { ref } from "vue";
	import api from "@/api/api";
	import CustomInput from "@/components/ui/CustomInput.vue";
	export default {
		components: {
			CustomInput,
		},
		async setup() {
			const name = ref("");
			const showCategory = ref(true);
			const showCountry = ref(true);
			const price = ref("");
			const categoryName = ref("");
			const countryName = ref("");
			const categories = ref({});
			const countries = ref({});
			const category = ref("");
			const country = ref("");
			const successAlert = ref(false);
			const loadCategory = async () => {
				const response = await api.get("/categories");
				categories.value = response.data;
			};
			loadCategory();
			const createCategory = async () => {
				if (categoryName.value) {
					const response = await api.post("/create/category/", {
						name: categoryName.value,
					});
					await loadCategory();
					showCategory.value = !showCategory.value;
				}
			};
			const loadCountries = async () => {
				const response = await api.get("/countries");
				countries.value = response.data;
			};
			loadCountries();
			const createCountry = async () => {
				if (countryName.value) {
					const response = await api.post("/create/country/", {
						name: countryName.value,
					});
					await loadCountries();
					showCountry.value = !showCountry.value;
				}
			};
			const createDish = async () => {
				if (name.value && price.value && category.value && country.value) {
					const response = await api.post("/create/dish/", {
						name: name.value,
						price: parseInt(price.value),
						categoryId: category.value,
						countryId: country.value,
					});
					successAlert.value = true;
				}
			};
			const labelOff = (event) => {
				if (
					!(
						event.target.value.length > 0 &&
						event.target.nextSibling.classList.contains("label-off")
					)
				) {
					event.target.nextSibling.classList.toggle("label-off");
				}
			};
			return {
				name,
				labelOff,
				showCategory,
				price,
				showCountry,
				categoryName,
				countryName,
				createCategory,
				categories,
				countries,
				createCountry,
				country,
				category,
				createDish,
				successAlert,
			};
		},
	};
</script>

<style lang="scss">
	@import "@/assets/scss/null.scss";
	.add-dish {
		&__form {
			& .form-field {
				position: relative;
				margin: 32px 0;
			}
			& .input-text {
				display: block;
				width: 100%;
				height: 36px;
				font-size: 18px;
				line-height: 26px;
				font-weight: 400;
				&:focus {
					border-bottom: 1px solid $fontcolor;
					& + .label,
					&.not-empty + .label {
						-webkit-transform: translateY(-24px);
						transform: translateY(-24px);
					}
				}
			}
			& .label {
				position: absolute;
				left: 20px;
				bottom: 11px;
				font-size: 18px;
				line-height: 26px;
				font-weight: 400;
				color: $fontcolor;
				cursor: text;
				transition: -webkit-transform 0.25s ease-in-out;
				transition: transform 0.25s ease-in-out;
				transition: transform 0.25s ease-in-out,
					-webkit-transform 0.25s ease-in-out;
			}
			& .label-off {
				display: none;
			}
		}
		&__select {
			border: none;
			& option {
				border: none;
			}
		}
	}
</style>
