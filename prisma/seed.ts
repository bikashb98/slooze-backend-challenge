import { prisma } from "../lib/prisma";
import { Country, Role } from "./generated/prisma/client";

async function main() {
  // Seed the database with some initial data

  // Create some users
  await prisma.user.upsert({
    where: { email: "nickfury@shield.com" },
    update: {},
    create: {
      email: "nickfury@shield.com",
      name: "Nick Fury",
      role: Role.Admin,
      country: Country.America,
    },
  });
  await prisma.user.upsert({
    where: { email: "captainmarvel@shield.com" },
    update: {},
    create: {
      email: "captainmarvel@shield.com",
      name: "Captain Marvel",
      role: Role.Manager,
      country: Country.India,
    },
  });
  await prisma.user.upsert({
    where: { email: "captainamerica@shield.com" },
    update: {},
    create: {
      email: "captainamerica@shield.com",
      name: "Captain America",
      role: Role.Manager,
      country: Country.America,
    },
  });
  await prisma.user.upsert({
    where: { email: "thanos@shield.com" },
    update: {},
    create: {
      email: "thanos@shield.com",
      name: "Thanos",
      role: Role.TeamMember,
      country: Country.India,
    },
  });
  await prisma.user.upsert({
    where: { email: "thor@shield.com" },
    update: {},
    create: {
      email: "thor@shield.com",
      name: "Thor",
      role: Role.TeamMember,
      country: Country.India,
    },
  });
  await prisma.user.upsert({
    where: { email: "travis@shield.com" },
    update: {},
    create: {
      email: "travis@shield.com",
      name: "Travis",
      role: Role.TeamMember,
      country: Country.America,
    },
  });

  // Create some Restaurants
  await prisma.restaurant.upsert({
    where: { name: "Currypatta" },
    update: {},
    create: {
      name: "Currypatta",
      country: Country.India,
      menuItems: {
        create: [
          {
            name: "Butter Chicken",
            price: 99.99,
          },
          {
            name: "Paneer Tikka",
            price: 79.99,
          },
          {
            name: "Naan",
            price: 30,
          },
        ],
      },
    },
  });
  await prisma.restaurant.upsert({
    where: { name: "Spicy India" },
    update: {},
    create: {
      name: "Spicy India",
      country: Country.India,
      menuItems: {
        create: [
          {
            name: "Chicken Biryani",
            price: 150,
          },
          {
            name: "Veg Biryani",
            price: 69.99,
          },
        ],
      },
    },
  });
  await prisma.restaurant.upsert({
    where: { name: "Pizza Hut" },
    update: {},
    create: {
      name: "Pizza Hut",
      country: Country.America,
      menuItems: {
        create: [
          {
            name: "Pepperoni Pizza",
            price: 175.69,
          },
          {
            name: "Veggie Pizza",
            price: 110.99,
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
