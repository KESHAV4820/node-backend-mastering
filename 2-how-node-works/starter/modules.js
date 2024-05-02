'use strict';
// LearnByHeart this whole section. It's new to you. You need to put it into your mind, through and through.

console.log(arguments);// Why are we loging arguments? becouse arguments is an array in JS  that contains all the values that we have passed as parameter to a function. So if we get some value after logging it, means that we are realling inside some function. why is it necessary? Becouse we were reading the concept that node.js puts any module or code into wrapper function and then runs. That means, all the time, we are inside some function only. To prove this fact. 
/*Output: 
[Arguments] {
  '0': {},// VIENotethis exports parameter. Empty becouse we are exporting nothing.   
  '1': [Function: require] {//VIENote require parameter
    resolve: [Function: resolve] { paths: [Function: paths] },       
    main: {
      id: '.',
      path: 'C:\\Users\\kesha\\OneDrive\\Desktop\\complete-node-bootcamp-master\\2-how-node-works\\starter',
      exports: {},
      filename: 'C:\\Users\\kesha\\OneDrive\\Desktop\\complete-node-bootcamp-master\\2-how-node-works\\starter\\modules.js',
      loaded: false,
      children: [],
      paths: [Array]
    },
    extensions: [Object: null prototype] {
      '.js': [Function (anonymous)],
      '.json': [Function (anonymous)],
      '.node': [Function (anonymous)]
    },
    cache: [Object: null prototype] {
      'C:\\Users\\kesha\\OneDrive\\Desktop\\complete-node-bootcamp-master\\2-how-node-works\\starter\\modules.js': [Object]
    }
  },
  '2': { // VIENote module exports parameter
    id: '.',
    path: 'C:\\Users\\kesha\\OneDrive\\Desktop\\complete-node-bootcamp-master\\2-how-node-works\\starter',
    exports: {},
    filename: 'C:\\Users\\kesha\\OneDrive\\Desktop\\complete-node-bootcamp-master\\2-how-node-works\\starter\\modules.js',
    loaded: false,
    children: [],
    paths: [
      'C:\\Users\\kesha\\OneDrive\\Desktop\\complete-node-bootcamp-master\\2-how-node-works\\starter\\node_modules',
      'C:\\Users\\kesha\\OneDrive\\Desktop\\complete-node-bootcamp-master\\2-how-node-works\\node_modules',
      'C:\\Users\\kesha\\OneDrive\\Desktop\\complete-node-bootcamp-master\\node_modules',
      'C:\\Users\\kesha\\OneDrive\\Desktop\\node_modules',
      'C:\\Users\\kesha\\OneDrive\\node_modules',
      'C:\\Users\\kesha\\node_modules',
      'C:\\Users\\node_modules',
      'C:\\node_modules'
    ]
  },
  '3': //VIENote absolute files path name parameter called __filename  'C:\\Users\\kesha\\OneDrive\\Desktop\\complete-node-bootcamp-master\\2-how-node-works\\starter\\modules.js',👈file name
  '4': //VIENote __dirname 'C:\\Users\\kesha\\OneDrive\\Desktop\\complete-node-bootcamp-master\\2-how-node-works\\starter'👈direc -tory name 
}
*/

console.log(require("module").wrapper);// Output: '(function (exports, require, module, __filename, __dirname) { ',  '\n});' 👈this is the wrapper function that node.js puts around every module. 


//-----module.exports----
const C = require('./test-module-1');//we use first letter capital because it is a class.
const calc1 = new C();// creating an instance of the class.
console.log(calc1.add(2, 5));

//------exports------
const calc2 = require('./test-module-2');
console.log(calc2.add(2,5));

//NoteVIEConcept calc2 is the object with all the properties that we exported in test-module-2.js. And since we are getting some object, we can perform some cool destructuring.👇  
const {add, multiply,divide,subtract}=require('./test-module-2');// Concept destructuring names has to be same.// also we can name only those that we need. 
console.log(multiply(2,5));


//------caching-----
require('./test-module-3')();//Note we aren't saving function into variable. We are calling it right away. 
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();

