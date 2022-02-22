# Drop Server


## Develop Usage

```bash
node app.js

```

### MongoDB configuration

```bash
use admin
db.createUser(
  {
    user: "root",
    pwd: "Root@123",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)

# Create User DB
use test
db.createUser({user:"nft",pwd:"Nft@123",roles:["readWrite"]})

```