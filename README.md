# Internal Tool Template

A production-ready starter kit for building secure internal tools. This template provides a solid foundation with a database, authentication, and a pre-built admin panel, allowing you to get up and running in minutes.

The core stack is built on a generous free tier, making it ideal for new projects, startups, and internal applications without worrying about infrastructure costs.

![walkthrough of the template](/docs/template.gif)

<!--
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fyour-repo-name)
-->

## Features

-   **Secure Authentication:** Powered by [Stack Auth](https://www.stackframe.co/)/[Neon Auth](https://neon.tech/docs/guides/neon-auth), offering social sign-on (Google, GitHub) and passwordless email login out of the box.

-   **Whitelist-Based Access Control:** The core security model ensures that only authorized users can access the application.
    -   **Whitelisted Domains:** Allow anyone with an email from a specific domain (e.g., `yourcompany.com`) to sign up and get access.
    -   **Whitelisted Emails:** Grant access to specific external email addresses (e.g., contractors, partners).
    -   **Blacklisted Emails:** Explicitly block certain users, even if their domain is whitelisted.

-   **Admin Management Dashboard:** A pre-built interface at `/admin/users` to manage your tool and its users

    ![admin page of the template](/docs/admin-page.png)

-   **Modern Tech Stack:** Built with popular, developer-friendly tools for a great experience.

## Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) (App Router)
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

### 5. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

Since you're the first user ever of that project, head over to `http://localhost:3000/setup` after signing in to claim your admin priviliges.

That it!
