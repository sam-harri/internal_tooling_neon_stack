# Internal Tool Template

A starter kit for building secure internal tools. This template provides a solid foundation with a database, authentication, authorization, and a pre-built admin panel, allowing you to get up and running in minutes.

The core stack is built on the generous free tiers from Neon, Stack, and Vercel, making it ideal for new projects, startups, and internal applications without worrying about infrastructure costs.

![walkthrough of the template](/docs/template.gif)

## Features

-   **Secure Authentication:** Out-of-the-box support for social (Google, GitHub) and passwordless email login powered by [Stack](https://www.stackframe.co/)/[Neon Auth](https://neon.tech/docs/guides/neon-auth).
-   **Email-Based Access Control:** Secure your application by defining which users are allowed access.
    -   **Whitelist by Domain:** Allow sign-ups from your company's domain.
    -   **Whitelist by Email:** Manually grant access to external users.
    -   **Blacklist by Email:** Explicitly deny access to specific accounts.
-   **Pre-built Admin Panel:** A ready-to-use dashboard at `/tools/admin` for managing users and their access permissions.

    ![admin page of the template](/docs/admin-page.png)

## Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Database:** [Neon](https://neon.tech/) Serverless Postgres
-   **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
-   **Authentication:** [Stack Auth](https://www.stackframe.co/)

## Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/sam-harri/internal_tooling_neon_stack.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

First, copy the example environment file `.env.example` to a local `.env` and fill in the values.

To fill these in, get a connection string for a Neon database in the [console](https://console.neon.tech/app/projects/)
You'll also want to register an account on [Stack Auth](https://stack-auth.com/), and copy the keys from the dashboard, 

| Variable               | Description                                                                  |
| ---------------------- | -----------------------------------------------------------------------------|
| `DATABASE_URL`         | Your Neon database connection string. Found in your Neon project dashboard.  |
| `STACK_PROJECT_ID`     | Your Stack Auth project ID. Found in the Stack dashboard.                    |
| `NEXT_PUBLIC_STACK_KEY`| Your public key for Stack Auth. Found in the Stack dashboard.                |
| `STACK_SECRET_KEY`     | Your secret key for Stack Auth. Found in the Stack dashboard.                |

### 4. Push Database Schema

This command will sync your Drizzle schema with your Neon database.

```bash
npx drizzle-kit migrate
```

### 5. Create Project Permissions

Head over to Auth tab in the Neon and claim the project with your Stack Auth account. From there, create 2 new project roles, `admin` and `user`, where `user` is contained within `admin`.

### 6. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

Since you're the first user ever of that project, head over to `http://localhost:3000/setup` after signing in to claim your admin priviliges.

## Deploying to Vercel

### Create Vercel Project

Add your newly created repo as a Vercel project, copy over all the values from your `.env` into the envinronment variables section, and deploy your app.

### Update Stack Auth domains

For the Stack Auth to work outside of localhost, add the domain Vercel gave you to the trusted domains in the `Domains` section of Stack dashboard.

And you're done. You have a hosted and secured internal tool dashboard and a Postgres database completly for free now!