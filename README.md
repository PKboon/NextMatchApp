## Setup Steps

### Create NextJS App

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

### Install [HeroUI](https://www.heroui.com/docs/guide/installation#manual-installation) and [React Icons](https://react-icons.github.io/react-icons/)

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
