# Toon Galaxy - Nx Angular Workspace

## Project Overview

**Toon Galaxy** is an Angular application built with Nx monorepo architecture, featuring a character-focused design system and modern web technologies.

### Tech Stack

- **Framework**: Angular 18.2.0 with SSR support
- **Monorepo**: Nx 20.0.3
- **State Management**: NgRx (Store, Effects, Entity)
- **UI Framework**: Angular Material + Custom Design System
- **Styling**: SCSS + Tailwind CSS
- **Testing**: Jest + Cypress
- **Documentation**: Storybook
- **Build**: Angular CLI + Nx

## Workspace Structure

### Applications

```
apps/
├── toon-galaxy/                 # Main Angular application
│   ├── src/                     # Application source code
│   ├── public/                  # Static assets
│   ├── server.ts               # SSR server configuration
│   └── project.json            # Nx project configuration
└── toon-galaxy-e2e/            # E2E tests with Cypress
    ├── cypress/                # Cypress test files
    └── src/                    # E2E test source
```

### Libraries

```
libs/
├── shared/                     # Shared libraries across domains
│   ├── ui-design-system/       # Design system components
│   │   ├── .storybook/         # Storybook configuration
│   │   ├── src/lib/            # UI components
│   │   └── tailwind.config.js  # Tailwind configuration
│   └── util-common/            # Common utilities and services
│       └── src/lib/            # Utility functions, environments
└── toon-galaxy/                # Domain-specific libraries
    ├── domain/                 # Domain models and business logic
    │   └── src/lib/            # Domain entities, interfaces
    └── feature-character/      # Character feature module
        └── src/lib/            # Character components, services
```

## Library Architecture

### Shared Libraries

- **`shared-ui-design-system`**: Reusable UI components with Storybook documentation
  - Prefix: `design-system`
  - Tags: `domain:shared`, `type:ui`
  - Features: Storybook integration, Tailwind CSS, Angular Material theming

- **`shared-util-common`**: Common utilities, services, and environment configurations
  - Tags: `domain:shared`, `type:util`
  - Contains: Environment configs, shared services, utility functions

### Domain Libraries

- **`toon-galaxy-domain`**: Core domain models and business logic
  - Tags: `domain:toon-galaxy`, `type:domain`
  - Contains: Entities, interfaces, domain services

- **`toon-galaxy-feature-character`**: Character-specific features
  - Tags: `domain:toon-galaxy`, `type:feature`
  - Contains: Character components, services, state management

## Development Commands

### Core Development

```bash
# Start development server
npm run start:dev
nx serve -o

# Build for production
npm run build:prod
nx build --configuration=production

# Run tests
npm test
nx test

# Run E2E tests
npm run e2e
nx e2e
```

### SSR Commands

```bash
# Development SSR
npm run dev:ssr
nx serve

# Production SSR simulation
npm run dev:ssr:prod-simul
nx serve --configuration=production

# Serve production SSR
npm run serve:ssr:prod
node dist/apps/toon-galaxy/server/server.mjs
```

### Storybook

```bash
# Start Storybook
npm run dev-storybook
nx storybook shared-ui-design-system

# Build Storybook
npm run build-storybook
nx build-storybook shared-ui-design-system
```

### Code Quality

```bash
# Lint all projects
npm run lint
nx workspace-lint && ng lint

# Format code
npm run format
nx format:write

# Run affected tests
npm run affected:test
nx affected:test
```

## Nx Configuration

### Target Defaults

- **Build**: Cached with production inputs, depends on library builds
- **Test**: Jest with coverage support, passes with no tests
- **Lint**: ESLint with workspace-wide configuration
- **Storybook**: Cached build and serve targets

### Generators

- **Applications**: Cypress E2E, ESLint, SCSS, Jest
- **Components**: SCSS, OnPush change detection, display block
- **Libraries**: ESLint, Jest unit testing

## Key Features

### Design System

- Custom Angular Material theme (cyan-orange)
- Tailwind CSS integration with custom preset
- Storybook documentation for all components
- FontAwesome icons integration
- Responsive design patterns

### State Management

- NgRx Store for application state
- NgRx Effects for side effects
- NgRx Entity for normalized state
- Store DevTools integration

### Performance

- Server-Side Rendering (SSR)
- Prerendering support
- Code splitting and lazy loading
- Bundle analysis with source-map-explorer

### Testing Strategy

- Unit tests with Jest
- E2E tests with Cypress
- Storybook interaction testing
- Coverage reporting

## File Conventions

### Component Structure

```typescript
// Component naming: feature-name.component.ts
@Component({
  selector: 'design-system-component-name',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
```

### Library Exports

```typescript
// libs/*/src/index.ts - Public API
export * from './lib/component/component.component';
export * from './lib/service/service.service';
```

### Project Tags

- **Domain**: `domain:shared`, `domain:toon-galaxy`
- **Type**: `type:app`, `type:ui`, `type:feature`, `type:util`, `type:domain`

## Build Outputs

```
dist/
├── apps/toon-galaxy/           # Application build
│   ├── browser/                # Client-side bundle
│   └── server/                 # SSR server bundle
├── libs/                       # Library builds
└── storybook/                  # Storybook static build
```

## Environment Configuration

- Development: `environment.development.ts`
- Production: `environment.ts`
- File replacement in build configurations

## Dependencies Management

- Angular 18.2.0 ecosystem
- Nx 20.0.3 with Angular plugin
- NgRx 18.1.0 for state management
- Storybook 8.3.6 for documentation
- Tailwind CSS 3.4.13 for styling

This workspace follows Nx best practices for scalable Angular applications with clear separation of concerns between shared utilities, domain logic, and feature implementations.
