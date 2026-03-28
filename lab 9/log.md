```
$  npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (lab-9) 
version: (1.0.0) 
description: 
entry point: (lab9_bookInventor.js) 
test command: 
git repository: 
keywords: 
author: ARTEMIS LEE
license: (ISC) 
type: (commonjs) 
About to write to /.../lab 9/package.json:

{
  "name": "lab-9",
  "version": "1.0.0",
  "description": "",
  "main": "lab9_bookInventory.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "ARTEMIS LEE",
  "license": "ISC",
  "type": "commonjs"
}


Is this OK? (yes) YES


$  npm install -g nodemon

changed 28 packages in 2s

5 packages are looking for funding
  run `npm fund` for details


$  npm install --save express

added 65 packages, and audited 66 packages in 1s

22 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities


$  npm install mongodb

added 12 packages, and audited 78 packages in 2s

22 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities


$   npm install dotenv --save

added 1 package, and audited 79 packages in 914ms

23 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities


$   npm install mongoose --save

added 5 packages, and audited 84 packages in 2s

24 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

$   nodemon lab9_bookInventor.js
[nodemon] 3.1.14
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node lab9_bookInventor.js lab9_bookInventory.js`
[dotenv@17.3.1] injecting env (1) from .env -- tip: ⚙️  specify custom .env file path with { path: '/custom/path/.env' }
MongoDB Connected: ac-jfcoobp-shard-00-02.an6n9sx.mongodb.net


```