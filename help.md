# Create Modules
    nest g module <module name>
# Create Controller
    nest g controller <controller name>
# Create Service
    nest g service <service name>

## Run migration
```bash
$ ts-node --transpile-only ./node_modules/typeorm/cli.js migration:run
```
## Rollback migration
```
$ ts-node --transpile-only ./node_modules/typeorm/cli.js migration:revert
```
## Create Migration
```bash
$ npx typeorm migration:create -n <name> -d src/migrations
```