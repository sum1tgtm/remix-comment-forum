# Welcome to Remix Commenting Forum

- [Live Demo](https://remix-comment-forum.vercel.app/)

## Running the application locally

- Clone the repository

```sh
git clone https://github.com/sum1tgtm/remix-comment-forum.git
```

### Without using docker

From your terminal:

```sh
npm install
npm run build
npm run start
```

This starts the application in port 3000 (default), which can be accessed using browser at [localhost:3000](localhost:3000)

### Using docker

#### Prerequisites (windows)

- [ ] Docker Desktop and latest version of Windows Subsystem for Linux
- [ ] Copy the enviroment variables (in the attachments) in a .env file. Make sure it is saved in the root folder of the project

From your terminal:

```sh
docker compose up --build -d
```

Remove the '-d' flag if you do not want to run in in detach mode

This will build and run the application inside a docker container.

The application can be accessed in port 3000 of the host machine at [localhost:3000](localhost:3000)

## Deployment

### Using Cloud Deployment Platforms

The application can be deployed easily in various cloud hosting providers that support NodeJS such as Vercel or Netlify.

#### Deployment using Vercel and Github

- [ ] Upload the project in a github repository
- [ ] Sign in to [vercel.com](vercel.com) using the github account
- [ ] Go to your dashboard and click on **_Add New_** button.
- [ ] Click on Project
- [ ] Import the repository from your github
- [ ] Copy and paste the environment variables
- [ ] Press Deploy

Wait couple of minutes for vercel to build and publish the application.

#### Deployment using Docker Container

The application can also be deployed in any container deployment platform like AWS ECS, EC2 or Microsoft Azure.

## Features

- Nested comment/replies
- Design inspired from [dev.to](dev.to)
- Clerk for authentication
- Supabase postgres as database
- Prisma ORM
- Shadcn and Tailwind CSS for styling
- Lucide React for icons
