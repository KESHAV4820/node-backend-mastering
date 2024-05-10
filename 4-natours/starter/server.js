'use strict';
/*Note:
1️⃣ Environment variables are mentioned in server.js. Express related works are done in app.js only.
2️⃣By default, production environment is kept by node.js or express.js. You can see your environment type by logging app.get('env');
3️⃣in summary, "env" variables are global variables that are used to define an environment in which node is running.
4️⃣'env' variable is set by express. But a lot of environment variable is also set by node.js as well.And these variables are located at "process.env".
5️⃣ in express, many packages are dependent on node.env, which defines if we are in development or production mode.
6️⃣you can set an environment variable to run a command just like we used to do it with script. You just need to prepend the "env" with that command.Eg:-
like if we want to set environment variable of this project, you will write NODE_ENV=development nodemon server.js. this shows NODE_ENV: 'development'. we can add some extra environment variables as well. like NODE_ENV=development X=23 nodemon server.js where X is any thing to test the whole command. Output in nodemon: NODE_ENV: 'development', X: '23'
7️⃣many packages on NPM depends on similar types of node environment variables. So when our project is already, we change the value of NODE_ENV variable to production.
8️⃣
9️⃣
🔟

 */



const app = require('./app');

console.log(process.env);// node uses/sets these env variables internally. These variables come from process core module.


//--------Server-------
const port =3000;
app.listen(port, ()=>{
    console.log(`App is running on port ${port}...`);
});