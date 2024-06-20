# Toon Galaxy

https://66739ea5b581c33ced2d5fbc-jokebfyntt.chromatic.com/

## 🔬 Toon Galaxy Atomic Design System

The Toon Galaxy Atomic Design System is an integral part of the Toon Galaxy project. It follows the principles of Atomic Design for it's Components, ensuring a scalable and maintainable UI component library.

Here is a quick link for Atomic Design:

- [Atomic Design by Brad Frost](https://bradfrost.com/blog/post/atomic-web-design/)

> [!NOTE]
> This Design System can be divided into UiKits to share UI elements across just
> a few applications rather than across all applications in the organization.

### Principles

1. Atoms: The smallest building blocks of the design system, such as buttons, inputs, and labels.
2. Molecules: Combinations of atoms that form more complex components, like form fields with labels and inputs.
3. Organisms: Groups of molecules that function together as a distinct section of the interface, such as a character list or a search form.
4. Templates: Layouts that combine organisms and define the structure of the application.
5. Pages: Specific instances of templates with real content, representing the final UI.

### 📙 Storybook Integration

To visualize and test UI components in isolation, the Toon Galaxy Atomic Design System integrates with Storybook:

1. Start Storybook:

```bash
nx run ui-design-system:storybook
```

2. Access Storybook Locally:
   Open your browser and navigate to http://localhost:6006.

To access Toon Galaxy Atomic Design System in production please visit [Production Links](#production-links) section

## Production Links

The Storybook for this project can be found at [design-insights.toongalaxy.toon](http://localhost:6006).

## License

This project is licensed under the [MIT License](LICENSE).

## Additional information about the Toon Galaxy monorepo

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, Smart Monorepos · Fast CI.](https://nx.dev)** ✨

### Integrate with editors

Enhance your Nx experience by installing [Nx Console](https://nx.dev/nx-console) for your favorite editor. Nx Console
provides an interactive UI to view your projects, run tasks, generate code, and more! Available for VSCode, IntelliJ and
comes with a LSP for Vim users.

### Start the application

Run `npx nx serve toon-galaxy` to start the development server. Happy coding!

### Build for production

Run `npx nx build toon-galaxy` to build the application. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

### Running tasks

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

### Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

### Explore the project graph

Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

- [Learn more about Exploring the Project Graph](https://nx.dev/core-features/explore-graph)

### Connect with the Nx team!

- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)
