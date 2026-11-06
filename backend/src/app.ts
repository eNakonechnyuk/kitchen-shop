import express from "express";
import { prisma } from "./lib/prisma.js";

const app = express();
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/kitchens", async (req, res) => {
  try {
    const kitchens = await prisma.kitchen.findMany();

    res.json(kitchens);
  } catch (error) {
    console.error("Failed to fetch kitchens:", error);

    res.status(500).json({
      error: "Failed to fetch kitchens",
    });
  }
});

app.post("/api/kitchens", async (req, res) => {
  try {
    const { name, description } = req.body;

    if (typeof name !== "string" || typeof description !== "string") {
      return res.status(400).json({
        error: "Name and description must be strings",
      });
    }


    if (!name.trim() || !description.trim()) {
      return res.status(400).json({
        error: "Name and description are required",
      });
    }
    const kitchen = await prisma.kitchen.create({
      data: {
        name,
        description,
      },
    });

    res.status(201).json(kitchen);
  } catch (error) {
    console.error("Failed to create kitchen:", error);

    res.status(500).json({
      error: "Failed to create kitchen",
    });
  }
});

app.put("/api/kitchens/:id", async (req, res) => {
  const id = Number(req.params.id);

  res.json({ id });
});

export default app;
