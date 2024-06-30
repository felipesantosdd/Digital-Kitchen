// src/pages/api/users/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const { name, email, password } = req.body;

            // Validar se o email já existe
            const existingUser = await prisma.user.findUnique({
                where: {
                    email
                },
            });

            if (existingUser) {
                return res.status(409).json({ message: 'Email já registrado.' });
            }

            // Hash da senha
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            // Criar novo usuário
            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });

            // Retornar o novo usuário sem a senha
            const { password: _, ...userWithoutPassword } = newUser;
            return res.status(201).json(userWithoutPassword);
        } catch (error) {
            console.error('Request error', error);
            res.status(500).json({ error: 'Erro ao criar o usuário, tente novamente mais tarde.' });
        }
    } else {
        // Método não permitido
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
