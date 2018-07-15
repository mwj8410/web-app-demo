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

### Testing

- chai: used for assert/expect functionality in testing
- mocha: industry standard test runner. Tap is a fair alternative, but I prefer mocha because of the lesser focus on the procedure and more focus on the test.

### Other Technology

- Docker: makes managing environments and deployments easier, safer, and more consistent. I'm using it here because I don't want ta locally 'installed' postgres instance and looking forward at CI and prod requirements.
- Docker-Compose: Docker is 90% of what you need. After than some way of managing configuration in a consistent way is needed.
