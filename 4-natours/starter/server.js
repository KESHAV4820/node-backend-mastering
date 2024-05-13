'use strict';
/*Note:
1️⃣ Environment variables are mentioned in server.js. Express related works are done in app.js only.
2️⃣By default, production environment is kept by node.js or express.js. You can see your environment type by logging app.get('env');
3️⃣in summary, "env" variables are global variables that are used to define an environment in which node is running.
4️⃣'env' variable is set by express. But a lot of environment variable is also set by node.js as well.And these variables are located at "process.env".
5️⃣ in express, many packages are dependent on node.env, which defines if we are in development or production mode.
6️⃣you can set an environment variable to run a command just like we used to do it with script. You just need to prepend the "env" with that command.Eg:-
like if we want to set environment variable of this project, you will write NODE_ENV=development nodemon server.js. this shows NODE_ENV: 'development'. we can add some extra environment variables as well. like NODE_ENV=development X=23 nodemon server.js where X is any thing to test the whole command. Output in nodemon: NODE_ENV: 'development', X: '23'
7️⃣many packages on NPM depends on similar types of node environment variables. So when our project is already, we change the value of NODE_ENV variable to production, when we are ready to deploy our project.
8️⃣ 
    ✅so there are many types of environement variables and to keep track of all of them, we need to keep them in a file. For that we declare config.env file. It is convention to use ".env" while defining such files.
    ✅after creating config.env, we need to connect it to our node application and a way to read the data present in here to be used as environment variable in our program. Becouse config.env is simply a text file. 
    ✅ So we use NPM package called "dotenv" in server.js
9️⃣environment variables are always declared in upppercase only. It's convention.
🔟

 */


const dotenv = require('dotenv');
dotenv.config({path:`${process.cwd()}/config.env`});//is recipe! not concept 👉this object will study the path parameter of this object. so the values from this files be read and saved to node environment variables. 👉It has to be above so that it's data could be read first and then accordingly app file is run. 👉 Note if you make a change in config.env, it won't be reflected on save. YOu have to start the server all over again. 👉Above style of path specifying is good. Becouse it will work even when you upload it in the remote server with it's own files keeping these codes.
const app = require('./app');

//console.log(process.env);// node uses/sets these env variables internally. These variables come from process core module. this LOC is Code Testing

//--------Server-------
const port =process.env.PORT || 3000;// To either use config port or the one hardcoded.Note it may throw up error if the port that you are giving is already occcupied. So you have to change the port number in config.env file.
app.listen(port, ()=>{
    console.log(`App is running on port ${port}...`);
});