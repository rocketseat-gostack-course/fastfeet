# fastfeet

## Docker

```sh
# Create container command
docker run --name fastfeetdb -e POSTGRES_USER=fastfeet -e POSTGRES_DB=fastfeet -e  POSTGRES_PASSWORD=fast3689feet -p:5432:5432 -d postgres
```

## Sequelize

### Rebuild All

```sh
yarn sequelize db:migrate:undo:all
yarn sequelize db:migrate
yarn sequelize db:seed:all
```
