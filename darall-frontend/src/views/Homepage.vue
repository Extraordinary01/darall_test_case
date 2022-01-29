<template>
	<section class="main">
		<div class="container">
			<h1 class="title text-center mt-5">Добро пожаловать!</h1>
			<h2 class="text-center">
				Тестовое задание. Сайт для добавления блюд в меню.
			</h2>
			<div class="row mt-4">
				<div class="col-lg-6 text-center">
					<router-link class="btn btn-lg main-btn" :to="{ name: 'menu' }"
						>Меню</router-link
					>
				</div>
				<div class="col-lg-6 text-center">
					<router-link class="btn btn-lg main-btn" :to="{ name: 'add-dish' }"
						>Добавить блюдо</router-link
					>
				</div>
			</div>
		</div>
	</section>
</template>
