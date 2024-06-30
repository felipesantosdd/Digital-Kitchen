import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;

    if (req.method === 'GET') {
        const recipe = await prisma.recipe.findUnique({
            where: { id: String(id) },
            include: { ingredients: true, user: true },
        });
        res.json(recipe);
    } else if (req.method === 'PUT') {
        const { name, description, image, link, ingredients } = req.body;
        const updatedRecipe = await prisma.recipe.update({
            where: { id: String(id) },
            data: {
                name,
                description,
                image,
                link,
                ingredients: { set: [], create: ingredients },
            },
        });
        res.json(updatedRecipe);
    } else if (req.method === 'DELETE') {
        await prisma.recipe.delete({
            where: { id: String(id) },
        });
        res.status(204).end();
    }
};
