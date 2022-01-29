import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			name: "home",
			path: "/",
			component: () => import("@/views/Homepage.vue"),
		},
		{
			name: "menu",
			path: "/menu",
			component: () => import("@/views/Menu.vue"),
		},
		{
			name: "add-dish",
			path: "/add-dish",
			component: () => import("@/views/AddDish.vue"),
		},
	],
});

export default router;
