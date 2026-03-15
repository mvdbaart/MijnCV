# CLAUDE.md — AI Assistant Guide for MijnCV

This file provides guidance for AI assistants (Claude, Copilot, etc.) working on this codebase.

## Project Overview

**MijnCV** is a personal portfolio/CV website for Maarten van den Baart. It is a modern React single-page application built with TypeScript and Vite, showcasing projects, skills, and contact information.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18.2 + TypeScript 5.2 |
| Build Tool | Vite 5.2 with SWC (fast refresh) |
| Styling | Tailwind CSS 3.4 (utility-first) |
| UI Components | shadcn/ui (new-york style) + Radix UI primitives |
| Animations | Framer Motion 11 |
| Icons | Lucide React |
| Backend | Supabase (BaaS — configured but not heavily used yet) |
| Routing | React Router DOM 6 |
| Forms | React Hook Form + Zod validation |
| Design System | Tempo Devtools |

## Directory Structure

```
src/
├── components/
│   ├── ui/              # 43 shadcn/ui components (do not modify manually)
│   ├── home.tsx         # Main landing page container
│   ├── Navbar.tsx       # Top navigation (responsive, smooth-scroll)
│   ├── HeroSection.tsx  # Fullscreen intro with profile data
│   ├── ProjectsGrid.tsx # Tag-filterable project showcase grid
│   ├── ProjectCard.tsx  # Individual project card with hover animation
│   ├── ContactSection.tsx  # Contact placeholder
│   └── ResumeSection.tsx   # Resume/CV placeholder
├── lib/
│   ├── utils.ts         # cn() helper (clsx + tailwind-merge)
│   └── supabase.ts      # Supabase client initialization
├── types/
│   └── supabase.ts      # Auto-generated Supabase types (do not edit by hand)
├── stories/             # Tempo storybook stories (design system)
├── App.tsx              # Root component — routing + Tempo integration
├── main.tsx             # Entry point (ReactDOM.createRoot)
└── index.css            # Global styles + Tailwind directives + CSS variables
```

## Development Workflow

### Start dev server
```bash
npm run dev
```
Runs Vite with HMR on localhost. Set `TEMPO=true` in env to enable Tempo devtools.

### Build for production
```bash
npm run build
```
Runs TypeScript type-checking (`tsc`) then Vite bundle. Strict TypeScript errors will fail the build.

### Lint
```bash
npm run lint
```
ESLint on `.ts`/`.tsx` files. Max warnings: 0 (treat warnings as errors).

### Preview production build
```bash
npm run preview
```

### Generate Supabase types
```bash
SUPABASE_PROJECT_ID=<id> npm run types:supabase
```
Writes generated types to `src/types/supabase.ts`. Always run this after Supabase schema changes.

## Environment Variables

All variables are prefixed with `VITE_` (exposed to client via Vite).

| Variable | Description | Required |
|---|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes (for backend features) |
| `VITE_SUPABASE_ANON_KEY` | Supabase public anon key | Yes (for backend features) |
| `VITE_BASE_PATH` | Base URL path (default `/`) | No |
| `TEMPO` | Enable Tempo devtools (`true`/`false`) | No |
| `SUPABASE_PROJECT_ID` | Used only for `types:supabase` script | Dev only |

Create a `.env.local` file (gitignored) for local overrides.

## Code Conventions

### Component Conventions

- **All components are functional** — no class components.
- **File naming**: PascalCase for components (`HeroSection.tsx`), camelCase for utilities (`utils.ts`).
- **Exports**: Default export for page/section components; named exports for shadcn/ui sub-components.
- **Props**: Define a `interface Props` or inline interface above the component.

```tsx
interface HeroSectionProps {
  name: string;
  title: string;
}

export default function HeroSection({ name, title }: HeroSectionProps) {
  // ...
}
```

### Styling Conventions

- **Tailwind utility classes only** — no custom CSS unless unavoidable.
- Use the `cn()` helper from `@/lib/utils` when merging conditional classes:
  ```tsx
  import { cn } from "@/lib/utils";
  <div className={cn("base-class", isActive && "active-class")} />
  ```
- **Theme colors**: Always use CSS variables (`bg-background`, `text-foreground`, `border-border`, etc.) — never hardcode hex/HSL values. These are defined in `src/index.css`.
- **Dark mode**: Supported via Tailwind's `class` strategy — use `dark:` variants as needed.
- **Responsive**: Use Tailwind breakpoints (`md:`, `lg:`) for responsive layouts.

### Path Aliases

Use the `@/` alias for all imports from `src/`:
```tsx
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
```
Never use relative `../../` imports when `@/` can be used.

### shadcn/ui Components

- **Do not edit files in `src/components/ui/`** unless customizing a component intentionally for this project.
- To add new shadcn/ui components, use the CLI: `npx shadcn-ui@latest add <component>`
- shadcn/ui components use `class-variance-authority` (CVA) for variants — follow the same pattern when creating new reusable components.

### Animation Conventions

Use Framer Motion for all animations:
```tsx
import { motion } from "framer-motion";
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
```
Keep animations subtle and purposeful. Avoid layout shifts.

### Supabase Usage

- Import the shared client: `import { supabase } from "@/lib/supabase";`
- Do not create additional Supabase clients.
- After modifying Supabase schema, regenerate types with `npm run types:supabase`.

## Key Data Flows

### Portfolio Data

The main portfolio data (name, title, summary, projects, links) is passed as props to the `<Home>` component in `src/components/home.tsx`. Default values are defined at the top of that file. To update profile content, modify the default props.

### Routing

React Router 6 is used. Routes are defined in `src/App.tsx`. Tempo devtools injects its own routes conditionally when `import.meta.env.VITE_TEMPO === "true"`.

### Project Filtering

`ProjectsGrid` extracts all unique tags from the projects array and renders filter buttons. Selected tag filters the displayed projects locally (no server query).

## What Does Not Exist Yet (Placeholders)

- `ContactSection.tsx` — contact form not implemented
- `ResumeSection.tsx` — resume/CV content not implemented
- No automated tests (no Jest/Vitest configured)

When implementing these, follow the same component conventions above.

## Common Gotchas

- **TypeScript strict mode is OFF** (`"strict": false` in `tsconfig.json`), but the build still runs `tsc` and will fail on actual type errors. Do not introduce `any` unless necessary.
- **Tempo routes**: The `<Routes>` component in `App.tsx` conditionally wraps Tempo storybook routes. Do not remove the Tempo conditional block.
- **`allowedHosts: true`** in `vite.config.ts` — intentional for dev environments (e.g., cloud IDEs). Do not remove.
- **`src/types/supabase.ts`** is auto-generated and currently empty. Don't write types there manually.
- The `tempobook/` directory (in `.gitignore`) is auto-generated by Tempo devtools. Do not commit it.
