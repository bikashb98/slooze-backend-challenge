import {prisma} from "@/lib/prisma";

export async function getUserFromEmail(email: string) {
    return await prisma.user.findUnique({
        where: { email },
    });
}