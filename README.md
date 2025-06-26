# Second Brain

Second Brain is a personal knowledge management app where users can save thoughts, links, videos, documents, and more — all in one place.

This project uses Prisma ORM and Docker for easy local development and deployment.

---

## Prerequisites

Make sure you have the following installed on your machine:

- [Docker]
- [Git]

---

## Getting Started: Running Locally with Docker

### 1. Clone the repository

```bash
git clone https://github.com/bikash138/second-brain.git
cd second-brain
```

### 2. Configure environment variables

Create a `.env` file in the project root (you can copy `.env.example`) and set your database URL and other necessary variables.


### 3. Build and start Docker containers

Run this command to build your Docker images and start the containers:

```bash
docker-compose up --build
```

This will start your app and the database.

### 4. Apply Prisma migrations

Open a new terminal and run migrations inside the app container:

```bash
docker compose -f docker-compose.yml exec app pnpm --filter=@repo/database exec prisma migrate deploy
```

Replace `<app_container_name>` with the name of your running app container (find it via `docker ps`).

### 5. Access the app

Once everything is up, visit:

```
http://localhost:3000
```

(or whatever port your app uses)

---

## Useful Docker commands

- Stop containers:

```bash
docker-compose down
```

- View running containers:

```bash
docker ps
```

- Access container shell:

```bash
docker exec -it <container_name> sh
```

---

## Notes

- Prisma migrations should be created locally during development with:

```bash
npx prisma migrate dev --name your_migration_name
```

- Remember to commit your migration files to version control.

- On container startup, migrations are applied automatically using `prisma migrate deploy`.

---

## Contributing

Feel free to open issues or submit pull requests to improve the project!

---

