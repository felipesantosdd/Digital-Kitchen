import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const recipes = await prisma.recipe.findMany({
            include: { ingredients: true, user: true },
        });
        res.json(recipes);
    } else if (req.method === 'POST') {
        const { name, description, image, link, userId, ingredients } = req.body;
        const newRecipe = await prisma.recipe.create({
            data: {
                name,
                description,
                image,
                link,
                userId,
                ingredients: { create: ingredients },
            },
        });
        res.status(201).json(newRecipe);
    }
};
