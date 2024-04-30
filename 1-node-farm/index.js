'use strict';

// const hello= 'hello world'
// console.log(`hello world`);


/*
lacture Notes:- 
1️⃣"require('fs')" here fs stands for file system. requrie is a function that returns the object which has all the methods that can read, write or operate on the files in the system.
2️⃣Concept: as seen from the execution of codes, you can see that the execution of a line in node is blocking the execution of another line comming next . This is typical behavivour of "👀synchronous code". It is blocking in nature, as explained above. The solution is non-blocking code which comes from asynchronous code which is shown in next example👉 non-blocking code are generally considered better though it depends on usecase. 3️⃣readFileSync(), writeFileSync() are blocking codes. But "readFile()" is none blocking.Taking care of blocking and non-blocking code is very important for the node.js becouse it's a single threaded. Becouse if a user request some file, it will block the single thread for that one second. Think on large scale👀4️⃣working of non-blocking code: it takes the heavylifting code ot background and registers a callback function. This function will make a call when the background code is done executing. DO REMEMBER THAT PASSING CALLBACK FUNCTIONS DOESN'T MAKE IT ASYNCHRONOUS CODE. IT SIMPLY WORKS FOR SOME FUNCTIONS IN NODE API.5️⃣Routing: it is used to direct website on different pages by defining or examing the path sent in the url from frontend side. And this routing has nothing to do with the folders on our project. No. This routing is defined for the content loading of different parts of our website not the architecture files themselves. Dont confuse with that. 
6️⃣you may note that our addresspath are starting with 👉"./" it is becouse in node.js, this means the folder from where the node commands are being run in terminal. but there is another way to do the same as well in the node. That is using the 👉"__dirname". But there is an ⚠ ⚡exception⚡ to this concept. "." means current directory for "require()" function. Note: i have done my research. Basically, ./ gives you relative address and __dirname gives you absolute address.You keep this in mind and exeception. Nothing else. Chill. 😎
7️⃣👉response.end() takes string, so if you have to pass an object of data, you need to convert it into string.  
8️⃣Concept1:Each time there is a new request, the server related callback function get executed. So any code outside server context get executed only once. Hence these codes are executed only once when the program gets executed at the start of the session.So if this code is synchronous, that is blocking type, since it is going to happen only once, it doesn't matter.BUt why use synchronous at the first place if it is blocking. Becouse, it puts the data read or write into a formate that can be used rightaway.VIEConcept2: this also means that if some data is deleted and the total reloading of the page isn't conducted, they will still be visible on the web page.  
9️⃣One of the crucial skill while working in backend is to understand which code is blocking type and which is not. 
🔟-----About NPM (Node Package Manager)------
🔵NPM is a commandline app which comes with node.js  and it is also a repository for packages.
🔵It has over million packages on it. 😎
🔵NPM is a software that we use to include and  manage third party packages that we are using in our project.
🔵There are 2 types of dependencies. Type 1: is the one in which third party packages that we used to make our program runs. Type 2: is the one in which the development work by the dev himself is imporved and without this, it's possible that program may not work. Hence such dependecies are called dev-dependencies. We declare a file as dev-dependencies 👉 adding "--save-dev" after "npm install packagename". You can also install a package globally which will be available to you through out your sytem, not the project folder only. to do that, you need to👉 use --global instead of --save-dev.
🔵nodemon is a third party package that restarts the server every time we make some changes to file. Earlier, we used to do it on our own. Now this tool will do it. AS you can see, we aren't using this library directly into our code, but it is helping us to develop the project. Hence it is a dev-dependency.
🔵 looking at version names of packages, you can understand: ^1.18.11 where👉 11 means the patch fixing update. They are used for fixing minor bugs. 18 is minor updata. It brings more changes but keeps the package backward compatible. but ^1 tells you the major updates. It brings sweeping changes and may no be backward compatible. Hence always be ready for such updates. They may break something into the old code. VIEConcept ^ symbol means that this package accepts minor updates and releases. if you have set this symbol on the version numbers, you need to be vigilent. Becouse it will install all types of updates. Hence you may choose to install only the patches, not the major releases which aren't backward compatible.👉 So you can use "~" symbol instead of "^" symbol. Sometimes people use 👉 * as well. This means that this particular package can download any...any update major or minor, when ever they are made available. Don't use this symbol if you aren't sure. It takes a lot of couragea and commitment. Becouse you will have to come back to the old project everytime there is something disruptive in the code base of the package. Take A Good Look 
🔵 How to update packages? write 👉"npm outdate" and this will give you table of those outdated. Now write 👉"npm update name" in terminal like slugify@1.19.11 or simply slugify. YOu can also choose to install only a particular version of the package which is by writing 👉 npm install slugify@2.85.69 ↩ enter
🔵Delete packages: 👉 "npm uninstall slugify" ↩ enter
🔵VIE Never ever include node_modules file in your git repository. YOu can get these files on any system you log into and type npm install. That's it. 
🔵MarvelVIE always share your package.json and package-lock.json files with your team. Becouse this helps them in recreating the exact developement environment that you were using. package-lock.json contain all the version and data related to the dependencies and dependencies of dependencies. Hence it is the ultimate tool that records the exact dev. evnvironment being used.
1️⃣1️⃣ 
⭕frontend:- every thing that happens in your browser. Backend:- every thing that happens on server and database.
⭕Backend is made of server and database. Server is simply a machine/computer that receives that request from the client and processess it and sends back response either after consulting with Database if the service demands it or on it's own if the request doesn't need database manupulation.
⭕Static Website: a website can be dynamic in the nature in context of frontend development but it is static website if server doesn't have to make any changes to the website.
⭕Dynamic Website: the websites that are working from the server side instructions each time a request is made are called dynamic websites.These websites have Database, node.js talking to it to make webpage each  time  a request is made. This is why, these websites are said to have server side rendering. Like Twitter. It has different page HTML code from the last day. 
1️⃣2️⃣ Web Applications= Dynamic Website + Functionality
1️⃣3️⃣ Understand API:- 
⭕in API powered website, only the required data from the database is sent. Just the data, not the ready to be displayed page code like html or css. Only JSON is sent. 
⭕In such Websites, there are two steps. Building API in backend side, Consuming API in frontend side. API powered websites are called client-side rendered 
⭕Node.js is commonly used to make APIs. It is also well suited for making sever-side rendered websites as well.
⭕API has many advantages over server side rendered website. 
    💹it can be used by any browser or any machine since we aren't sending the code to render but the bare minimum data to be rendered.
    💹Becouse of that, it supports better cross-platform utility.
    💹it has great potential to be used as stand alone business. That devs make their APIs, they don't even have frontend. Just the API and they sell it's access to the other devs.
1️⃣4️⃣ Working of Node.js in Next section. Go there.
1️⃣5️⃣ 
🔵🔵🔵
*/

//----------Reading and Writing files(blocking/non-blocking manner)----------

//Note: these are blocking code
/*
const fs=require('fs');
const textIn= fs.readFileSync('./starter/txt/input.txt', 'utf-8');//New Element: to read the file content
console.log(`${textIn}`);

fs.writeFileSync('./starter/txt/output.txt',`The avocado 🥑 is popular in vegetarian cuisine as a substitute for meats in sandwiches and salads because of its high fat content 😄 ${Date.now()}`);// New Element to write into a file. 
const textin1= fs.readFileSync('./starter/txt/output.txt', 'utf-8');
console.log(`${textin1}`);

//Note: 👇Non-blocking code example


const textIn2= fs.readFile('./starter/txt/input.txt', 'utf-8', (err, data1)=>{});//New Element: to read the file content in none blocking manner.
console.log(`${textIn2}`);//output: undefined

fs.readFile(`./starter/txt/${data1}.txt`,'utf-8',(error, data2)=>{console.log(`${data2}`);
});console.log(`Will read file!`);// NoteOutput: Firstoutput: Will read file! second output: read-this


const fs=require('fs');
fs.readFile(`./starter/txt/start.txt`,'utf-8',(error, data1)=>{
    fs.readFile(`./starter/txt/${data1}.txt`,'utf-8',(error, data2)=>{
        console.log(`${data2}`);
        fs. writeFile('./starter/txt/finalwrite.txt', `${data2}/n${data1}`,'utf-8', err=>{ console.log(`successfullly WROTE the files"finalwrite.txt"`);
        if(err)console.log(`code phat gya`);        
    });
    });
});
console.log(`Will read file!`);
*/


//-------------CREATING SERVER----------------
const fs=require('fs');
const http=require('http');// New Element: to create simple server
const url=require('url');
const slugify= require('slugify');//Note: what is a Slug? it is the last part of the url after the domain name that are used to uniquely identify a page that url is seeking to access.

const replaceTemplate= require('./starter/modules/replaceTemplate');//Note1: we are using ./ owing to the exception mentioned in point number 6️⃣. Note2: we could have named it any thing. But we chose this name so that our old coding doesn't need any change.

/*code migrated 👆to replaceTemplate.js to make it a module.
const replaceTemplate=(temp,product)=>{
let output= temp.replace(/{%PRODUCTNAME%}/g,product.productName);//New Element "/{%PRODUCTNAME%}/g" is used to replace at all the places. That's why we used regular expression by wrapping it with / and / and used "g" as global flag to replace at all positions.
output=output.replace(/{%IMAGE%}/g,product.image);
output=output.replace(/{%PRICE%}/g,product.price);
output=output.replace(/{%FROM%}/g,product.from);
output=output.replace(/{%NUTRIENTS%}/g,product.nutrients);
output=output.replace(/{%QUANTITY%}/g,product.quantity);
output=output.replace(/{%DESCRIPTION%}/g,product.description);
output=output.replace(/{%ID%}/g,product.id);
if(!product.organic) output=output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
return output;
}
*/

//👇 the reason why we are reading it here is that we want to read it only once since these piece of code aren't meant be read each time there is a request on server. So why keep in within servers execution ambit. That will kill time and execution thread.Hence we chose to move it out.
const tempOverview=fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`,'utf-8');
const tempProduct=fs.readFileSync(`${__dirname}/starter/templates/template-product.html`,'utf-8');
const tempCard=fs.readFileSync(`${__dirname}/starter/templates/template-card.html`,'utf-8');

const data= fs.readFileSync(`${__dirname}/starter/dev-data/data.json`,'utf-8');//NoteVIE: using readFileSync(). Why, read point 8️⃣.
const dataObj= JSON.parse(data);
console.log(`${dataObj} at LOC78`);//Code Testing
// console.log(slugify('Taj Mahal', {lower:true}));//Code Testing

const slug=dataObj.map(el=>slugify(el.productName,{lower:true}));//New Element
console.log(slug);//Code Testing

//👇 this is the way to create a server.

const server=http.createServer((request, response)=>{//New Element
    // console.log(request);// Code Testing
//Code Testing console.log(request.url);//Output:/product?id=2 if you click the second card.
//Code Testing console.log(url.parse(request.url, true));// Output: without selecting a card template:
   /*   Url {
        protocol: null,
        slashes: null,
        auth: null,
        host: null,
        port: null,
        hostname: null,
        hash: null,
        search: null,
        query: [Object: null prototype] {},
        pathname: '/',
        path: '/',
        href: '/'
      }
      and when a card is selected:-
    Url {
        protocol: null,
        slashes: null,
        auth: null,
        host: null,
        port: null,
        hostname: null,
        hash: null,
    VIE search: '?id=0',
    VIE query: [Object: null prototype] { id: '0' },
    VIE pathname: '/product',
    VIE path: '/product?id=0',
    VIE href: '/product?id=0'
      }
     */ 
      const {query, pathname}=url.parse(request.url,true);
      
     //legacy code const pathname=request.url;
   //---Overview page---
   if(pathname==='/' || pathname==='/overview'){
    //response.end('This is the overview');
    response.writeHead(200,{'Content-type':'text/html'});//code 200 means "OK".👍
    const cardsHtml=dataObj.map(el=>replaceTemplate(tempCard, el)).join('');//Note: Here we are using the map method to loop through the data of json file in LOC76 and LOC77 and replace the template with individual data of that element and this will be passed to output.
   // console.log(cardsHtml);//Code Testing
   // response.end(tempOverview);//Code Testing

   const output=tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);
   response.end(output);//Note: In this section, we are passing the prepared card for each object/item of json file onto the pane.

    //---Product page---
   }else if(pathname==='/product'){
       //response.end('This is the product');
       response.writeHead(200,{
        'Content-type':'text/html'});
    //    response.end(tempProduct);
        const product = dataObj[query.id];
        const output=replaceTemplate(tempProduct,product);
        //response.end('This is the PRODUCT');
        response.end(output);
    }
    //-----Making a webAPI VIE-------------------
    else if(pathname==='/api'){
        //Note👇this is non-blocking code becouse it's insider server😎
        fs.readFile(`${__dirname}/starter/dev-data/data.json`,'utf-8', (error, data)=>{
            const productData= JSON.parse(data);
            //Code Testingconsole.log(`${productData}`);
            response.writeHead(200,{'Content-type':'text/html'});//code 200 means "OK".👍
          response.end(data);
             console.log(`${data} at LOC113`);//Code Testing
       });
        //response.end(`this how you push APIs.`);// Code Testing
    }
    //---Not Found---
   else{
    response.writeHead(404,{
        'Content-type':'text/html','my-own-customheader':'hello-world-inbackend'});//VIENoteConcept: this writeHead() when containing second parameter in {} which is an header object, the "response.end()" must come after specifying {} parameter or there will be an error.That is header must be sent before response. Always. What is header? it is a piece of information about the packet or somekind of status. Take A Good Look 
    response.end('<h1>page not found baba👹👺!!</h1>');
    };    
    //response.end('Server says: hello world :)');
});

server.listen(8000,'127.0.0.1',()=>{//New Element
    console.log('Requesting the dream to become reality on port 8000');
});