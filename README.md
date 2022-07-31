# Pol

This project was generated using [Nx](https://nx.dev).

Please use node version `v16.16.0`.

## Development server

### Entire project

Run `nx run-many --target=serve --projects=expense-service,expense-tracker-client` to run the project in dev mode.

### Single app/lib

Run `nx serve [app name]` to run a dev server for any app/lib in the project.

Run `nx build [app name]` to build any app/lib in te project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test [app name]` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Code formatting

Run `nx format:write` to manually format all files in the workspace. A prettier config is provided with the workspace, and should be used for all projects.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

## TODO

Things that weren't, but should've been done:

-   adding a pre-commit hook that checks file formatting and runs the linter on changed files
