# Role-Based Food Ordering Backend

A slooze backend system for a food ordering application implementing **Role-Based Access Control (RBAC)** and **Country-Based Access Restriction (ReBAC)**.

## Features

- View restaurants & menu items
- Create and manage orders (cart-based system)
- Add items to order
- Checkout (place order)
- Cancel order
- Manage payment methods
- Role-based access control (Admin, Manager, Member)
- Country-based data restriction (India / America)

#Country-Based Restriction (ReBAC)

- Admin → Access all data
- Manager → Access only their own data
- Member → Access only their own data

Enforced at:

- Restaurant listing
- Order creation

#Setup:

1**.** _Clone the repo_

git clone [https://github.com/bikashb98/slooze-backend-challenge.git](https://github.com/bikashb98/slooze-backend-challenge.git)

cd slooze-backend-challenge

2\. _Install dependencies_

npm install

3\. _Setup environment variable(.env)_

Create a .env file and add the required environment variables. Check .env.example for exact environment variable name used in the project

4\. _Setup Database_

I have used aiven.io, you can use any postgres db of your choice and add the db connection string in the .env file mentioned in previous step.

After adding the connection string in .env, run the following commands

**npx prisma db push**

**npx prisma generate**

5\. _Seed the db with initial data_

The data is already added in the seed.ts file. Run the following command with populate the db with the data.

npx prisma db seed

6\. Import collections to Postman

A postman collection called _Slooze-Backend.postman_collection.json_ is added in the project import the collection from your postman client.

7\. Run the poject

**npm run dev**

After running this command you are good to go, you can hit the api endpoints.
