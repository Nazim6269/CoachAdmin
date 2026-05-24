import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
    pages: {
        signIn: "/dashboard/auth/login",
        error: "/dashboard/auth/error",
    },
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60,
    },
    callbacks: {
        async jwt(params: any) {
            const { token, user } = params;
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                session.user.accessToken = token.accessToken as string;
                session.user.refreshToken = token.refreshToken as string;
            }
            return session;
        },
        authorized({ auth }) {
            return !!auth?.user;
        },
    },
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                try {
                    const res = await fetch(
                        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/auth/login`,
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                email: credentials.email,
                                password: credentials.password,
                            }),
                        }
                    );

                    const data = await res.json();
                    if (!res.ok || !data.success) return null;

                    return {
                        id: data.authorization.access_token,
                        name: credentials.email as string,
                        email: credentials.email as string,
                        role: data.type,
                        accessToken: data.authorization.access_token,
                        refreshToken: data.authorization.refresh_token,
                    };
                } catch {
                    return null;
                }
            },
        }),
    ],
} satisfies NextAuthConfig;