# Demo Web Application
A demonstration application to showcase a simple full-stack web application in a mono repo.

## Libraries Used and Why

### API Runtime

- express: widely used api framework
  - body-parser: parses body content of HTTP request into usable blocks
- sequelize: generic SQL ORM lib. Allows a more fluid way of interacting with a SQL database.
  - pg
  - pg-hstore
- @phaesynthe/phlog: a simple loggger

### UI Runtime

Note: all of the ui requirements are listed as devDependancies. This is because the UI artifacts are generated into a small set of static assets at build time. Deployed instances should not run build processes, so these packages are isolated out of that environment.

- axios: HTTP request lib

- bable-core - Code transpiler that enables writing UI code in a more appropriate way with the concerns that UI has 
  - babel-loader
  - babel-preset-env
  - babel-preset-react

- node-sass: a superset of CSS that makes writing and maintaining style concerns easier.

- react
  - react-dom
  - react-redux
  - react-router-dom
  - redux

- webpack: frontend build tool
  - copy-webpack-plugin
  - css-loader
  - html-webpack-plugin
  - sass-loader
  - style-loader
  - webpack-cli

### Testing

- chai: used for assert/expect functionality in testing
- mocha: industry standard test runner. Tap is a fair alternative, but I prefer mocha because of the lesser focus on the procedure and more focus on the test.

### Other Technology

- Docker: makes managing environments and deployments easier, safer, and more consistent. I'm using it here because I don't want ta locally 'installed' postgres instance and looking forward at CI and prod requirements.
- Docker-Compose: Docker is 90% of what you need. After than some way of managing configuration in a consistent way is needed.
