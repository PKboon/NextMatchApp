# Setup Steps

## 1. Create NextJS App

1. Run `npx create-next-app@latest`

   ```bash
   What is your project named? next-match-app
   Would you like to use TypeScript? Yes
   Would you like to use ESLint? Yes
   Would you like to use Tailwind CSS? Yes
   Would you like your code inside a `src/` directory? Yes
   Would you like to use App Router? (recommended) Yes
   Would you like to use Turbopack for `next dev`?  Yes
   Would you like to customize the import alias (`@/*` by default)? No
   ```

## 2. Install [eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort)

1. Run `npm install --save-dev eslint-plugin-simple-import-sort`
2. Update `eslint.config.mjs` to [the code here](./eslint.config.mjs)
3. Enable `eslint` in IDE

## 3. Install [HeroUI](https://www.heroui.com/docs/guide/installation#manual-installation) and [React Icons](https://react-icons.github.io/react-icons/)

I used [Manual Installation](https://www.heroui.com/docs/guide/installation#manual-installation) and [Tailwind v4 Migration Guide](https://www.heroui.com/docs/guide/tailwind-v4) because I didn't start the project with HeroUI and this project uses Tailwind 4.

1. Run `npm install @heroui/react@beta framer-motion react-icons`
2. Follow the [Tailwind v4 Migration Guide](https://www.heroui.com/docs/guide/tailwind-v4) to set up HeroUI
3. Create `src/components/Providers.tsx` and use the following code:

   ```tsx
   "use client";

   import { HeroUIProvider } from "@heroui/react";
   import { ReactNode } from "react";

   const Providers = ({ children }: { children: ReactNode }) => {
   	return <HeroUIProvider>{children}</HeroUIProvider>;
   };

   export default Providers;
   ```

4. Update the `return` statement in `src/app/layout.tsx` as shown:
   ```tsx
   <html lang="en">
   	<body>
   		<Providers>{children}</Providers>
   	</body>
   </html>
   ```

### Note

When using a component, remember to `import` from `@heroui/<component-folder>` instead of `@heroui/react` since NextJS is SSR.

For example:

```tsx
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
```

In the `node_modules/@heroui/react`, it has `"use strict";`, but `node_modules/@heroui/<component-folder>` has `"use client"; "use strict";`.

## 4. Install Form Packages

1. Run `react-hook-form zod @hookform/resolvers`

## 5. Set up Authentication and Database

1. Follow [Auth.js setup steps](https://authjs.dev/getting-started/installation?framework=Next.js)
2. Follow [Prisma Adapter installation commands](https://authjs.dev/getting-started/adapters/prisma#installation)
3. Follow [Edge compatibility guide](https://authjs.dev/guides/edge-compatibility#split-config) (step 1 and 2)
4. Run `npx prisma init` to initialize Prisma
5. Update `src/auth.ts` to:

   ```ts
   import { PrismaAdapter } from "@auth/prisma-adapter";
   import NextAuth from "next-auth";

   import authConfig from "@/auth.config";
   import { prisma } from "@/lib/prisma";

   export const {
   	handlers: { GET, POST },
   	auth,
   	signIn,
   	signOut,
   } = NextAuth({
   	adapter: PrismaAdapter(prisma),
   	session: { strategy: "jwt" },
   	...authConfig,
   });
   ```

6. Update `src/app/api/auth/[...nextauth]/route.ts` to:

   ```ts
   export { GET, POST } from "@/auth";
   ```

7. Create a Postgres database with [NEON](https://neon.com/) and update the `DATABASE_URL` value in `.env`

8. Update `prisma/schema.prisma` (see [here](https://authjs.dev/getting-started/adapters/prisma#schema))
9. Run `npx prisma generate`
10. Create `src/lib/prisma.ts` with the following code:

    ```ts
    import { PrismaClient } from "../generated/prisma";

    const globalForPrisma = global as unknown as { prisma: PrismaClient };

    export const prisma =
    	globalForPrisma.prisma || new PrismaClient({ log: ["query"] });

    if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
    ```

11. Run `npx prisma db push`
12. Run `npx prisma studio` to see the tables
13. Run `npm i bcryptjs` and `npm i -D @types/bcryptjs`

### Note

- Every time you update the `schema.prisma`, Run:

  ```bash
  npx prisma generate
  npx prisma db push
  npx prisma studio
  ```

- See [Prisma's Seeding documentation](https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding) if want to seed data.

### Reset the database

There are 2 ways to do.

#### 1. Run the following:

```bash
npx prisma migrate reset --skip-seed
npx prisma db push
npx prisma db seed
```

#### 2. Create `migrations`

- Run `npx prisma migrate dev -n Initial --create-only`
  - `Initial` is the name of the migration which can be anything that you want
  - Use `--create-only` when needed
- Run `npx prisma reset`
- A `migrations` folder will be created in the `/prisma` folder

## 6. Set up Session and Middleware

1. Follow [Auth.js Session Management documentation](https://authjs.dev/getting-started/session-management/get-session) (both Next.js server and client)
2. Follow [Next.js Middleware documentation](https://nextjs.org/docs/app/building-your-application/routing/middleware)

## 7. Set up Cloudinary

For storing image.

1. Create an account
2. Run `npm install cloudinary`
3. Follow [Installing Next Cloudinary](https://next.cloudinary.dev/installation)
4. Create a `src/lib/cloudinary.ts` with:

   ```ts
   import cloudinary from "cloudinary";

   cloudinary.v2.config({
   	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
   	api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
   	api_secret: process.env.CLOUDINARY_API_SECRET,
   });

   export { cloudinary };
   ```

## 8. Set up Pusher

For real-time features.

1. Run `npm i pusher` for server side
2. Run `npm i pusher-js` for client side
3. Add the following to `.env`:
   ```
   NEXT_PUBLIC_PUSHER_APP_KEY=
   PUSHER_APP_ID=
   PUSHER_SECRET=
   ```
4. Create [`src/lib/pusher`](./src/lib/pusher.ts)

## 9. Set up [Zustand](https://zustand.docs.pmnd.rs/guides/nextjs)

For state management.

1. Run `npm install zustand`
2. Add all hooks to `Provider.tsx`
   - They don't have to be in the `Providers.tsx`, but they must be in a client component and import that component to the main layout

## 10. Set up [Resend](https://resend.com/docs/send-with-nextjs)

For email verification after registeration

1. Create an account at https://resend.com/
2. Create an API key and save it in the `.env` as `RESEND_API_KEY`
3. Run `npm i resend`

### Note

The email might be in spam

## 11. Set up Github OAuth

1. Add the following to `auth.config.ts`

   ```typescript
   import Github from "next-auth/providers/github";

   providers: [
   	Github({
   		clientId: process.env.GITHUB_CLIENT_ID,
   		clientSecret: process.env.GITHUB_CLIENT_SECRET,
   	}),
      ...
   ]
   ```

2. Go to you Github account > Developer settings > OAuth Apps
3. Click `New OAuth App` and enter the following
   - **Application name**: your app's name
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: you can find this URL by going to `http://localhost:3000/api/auth/providers` in your browser and look for `callbackUrl` for `github`
4. Click `Register application` and save Client ID and Client secret in the `.env` as:

   ```
   GITHUB_CLIENT_ID=
   GITHUB_CLIENT_SECRET=
   ```

5. See [`SocialLogin.tsx`](<./src/app/(auth)/login/SocialLogin.tsx>) on how to use it

## 12. Set up Google OAuth

1. Add the following to `auth.config.ts`

   ```typescript
   import Google from "next-auth/providers/google";

   providers: [
   	Google({
   		clientId: process.env.GOOGLE_CLIENT_ID,
   		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
   	}),
      ...
   ]
   ```

2. Go to **Google Developer Console** (must have a google account)
3. Create a project
4. A toast will appear on the top right, click Select
5. Go to APIs & Services > OAuth consent screen > create one
   - **App Information**: enter a name and an email
   - **Audience**: select External
   - **Contact Information**: enter an email
6. Click `Creat OAuth client`
   - **Application type**: select Web application
   - **Name**: enter a name
   - **Authorized JavaScript origins**: `http://localhost:3000`
   - **Authorized redirect URIs**: you can find this URL by going to `http://localhost:3000/api/auth/providers` in your browser and look for `callbackUrl` for `google`
7. Click `Creat`, go to the created client, and save Client ID and Client secret in the `.env` as:

   ```
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   ```
