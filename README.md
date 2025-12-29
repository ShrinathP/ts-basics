Using Node Version 16.2

Setting up typescript
1. Create a node project
yarn init -y
2. Add Typescript compiler in development mode
yarn add typescript -D
3. Add ts-node - wrapper around node that works for ts files
yarn add ts-node -D
31. For promise issues -
'Promise' only refers to a type, but is being used as a value here. Do you need to change your target library? Try changing the 'lib' compiler option to es2015 or later.

https://stackoverflow.com/questions/27573365/how-to-use-typescript-with-native-es6-promises
Create a package.json file with only { } as the content (if you don't have a package.json already. Call npm install --save @types/es6-promise and tsc --init. The first npm install command will change your package.json to include the es6-promise as a dependency. tsc --init will create a tsconfig.json file for you.

4. Initialize a ts config file
npx tsc --init
6. Running ts-node
npx ts-node basics.js
npx ts-node basics.ts

7. compile ts to js file
npx tsc functions.ts

Error:
18_mapped_types.ts line 56-58
Error:
Type 'keyof Type' is not assignable to type 'string | number | bigint | boolean | null | undefined'. meaning
In TypeScript:
keyof Type === string | number | symbol
2️⃣ Template literal types only accept primitives
string | number | bigint | boolean | null | undefined

So this part breaks
`on${Property}Change`
     ^^^^^^^^
     could be symbol

