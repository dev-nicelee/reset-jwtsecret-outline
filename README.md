## Purpose

When you lost SECRET_KEY of outline wiki for self-hosted, 

[In this case, you need to reset your jwtSecret for all users](https://github.com/outline/outline/issues/1037). (This is well described by [@tommoor](https://github.com/tommoor)

This simple script will reset your users' jwtSecret with your newly generated `SECRET_KEY`.

## How to use

1. npm install
2. Set your postgres info in index.js file. 
3. Set your `SECRET_KEY` in index.js file.
4. npm run start
5. node index.js