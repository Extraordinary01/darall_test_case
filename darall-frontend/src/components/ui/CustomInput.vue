<template>
	<div>
		<input
			:id="id"
			class="input-text js-input"
			:type="type"
			:required="isRequired"
			@change="update"
		/>
		<label class="label" :for="id">{{ label }}</label>
	</div>
</template>

<script>
	export default {
		props: {
			id: String,
			type: String,
			label: String,
			isRequired: Boolean,
		},
		methods: {
			update(event) {
				this.$emit("update:modelValue", event.target.value);
			},
		},
	};
</script>

<style></style>
