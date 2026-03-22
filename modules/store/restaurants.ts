import {prisma} from "../../lib/prisma";

export const getAllRestaurants = async () =>{
    return await prisma.restaurant.findMany();
}
