## Setup Steps

### 1. Create NextJS App

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

### 2. Install [eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort)

1. Run `npm install --save-dev eslint-plugin-simple-import-sort`
2. Update `eslint.config.mjs` to [the code here](./eslint.config.mjs)
3. Enable `eslint` in IDE

### 3. Install [HeroUI](https://www.heroui.com/docs/guide/installation#manual-installation) and [React Icons](https://react-icons.github.io/react-icons/)

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

#### Note

When using a component, remember to `import` from `@heroui/<component-folder>` instead of `@heroui/react` since NextJS is SSR.

For example:

```tsx
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
```

In the `node_modules/@heroui/react`, it has `"use strict";`, but `node_modules/@heroui/<component-folder>` has `"use client"; "use strict";`.

### 4. Install Form Packages

1. Run `react-hook-form zod @hookform/resolvers`

### 5. Setup Authentication and Database

1. Follow [Auth.js setup steps](https://authjs.dev/getting-started/installation?framework=Next.js)
2. Follow [Prisma Adapter installation commands](https://authjs.dev/getting-started/adapters/prisma#installation)
3. Follow [Edge compatibility guide](https://authjs.dev/guides/edge-compatibility#split-config) (step 1 and 2)
4. Run `npx prisma init` to initialize Prisma
5. Update `src/auth.ts` to:

   ```ts
   import { PrismaAdapter } from "@auth/prisma-adapter";
   import { PrismaClient } from "@prisma/client";
   import NextAuth from "next-auth";

   import authConfig from "@/auth.config";

   const prisma = new PrismaClient();

   export const {
   	handlers: { GET, POST },
   	auth,
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
