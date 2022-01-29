import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.post("/create/dish/", async (req, res) => {
	const { name, price, categoryId, countryId } = req.body;
	const result = await prisma.dish.create({
		data: {
			name,
			price,
			category: { connect: { id: categoryId } },
			country: { connect: { id: countryId } },
		},
	});
	res.json(result);
});

app.post("/create/category/", async (req, res) => {
	const result = await prisma.category.create({
		data: { ...req.body },
	});
	res.json(result);
});

app.post("/create/country/", async (req, res) => {
	const result = await prisma.dishCountry.create({
		data: { ...req.body },
	});
	res.json(result);
});

app.get("/categories/", async (req, res) => {
	const categories = await prisma.category.findMany();
	res.json(categories);
});

app.get("/countries", async (req, res) => {
	const countries = await prisma.dishCountry.findMany();
	res.json(countries);
});

app.get("/dishes", async (req, res) => {
	const dishes = await prisma.dish.findMany({
		include: {
			category: {
				select: {
					name: true,
				},
			},
			country: {
				select: {
					name: true,
				},
			},
		},
	});
	res.json(dishes);
});

app.listen(8000, () =>
	console.log("REST API server ready at http://localhost:8000")
);
