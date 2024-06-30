import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const { email, password }: any = credentials;

                // Aqui você busca o usuário pelo email
                const user = await prisma.user.findUnique({
                    where: { email }
                });

                if (user && bcrypt.compareSync(password, user.password)) {
                    // Se a senha estiver correta, retorne o objeto user
                    return user;
                } else {
                    // Se a autenticação falhar, retorne null
                    throw new Error('Email ou senha incorretos');
                }
            }
        })
    ],
    secret: process.env.SECRET,
    pages: {
        signIn: '/auth/signin',  // Você pode personalizar a página de signin se necessário
        error: '/auth/error'     // Página de erro para autenticação falhada
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        session: async ({ session, token }: any) => {
            session.user.id = token.id;
            return session;
        }
    },
    session: {
        strategy: 'jwt'
    }
});
