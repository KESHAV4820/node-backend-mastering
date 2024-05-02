/* VIENoteConcept Inner working of Node.js
1️⃣🔵🔵🔵🔵
2️⃣🔵🔵🔵
3️⃣🔵🔵
4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣🔟
 */


//Below is emample of codes that use different types of event-loop queues.  
'use strict';

const fs=require('fs');

setTimeout(() => {	console.log(`settimout call finished now`);
	}, 0);
    
setImmediate(() => { console.log(`immediate call happened now`);
            });//this code will be executed as soon as encountered given that the last code has finished it's callback. This code will be executed right after that. No waiting for other code. You move it's placement to see the effect of this code.
fs.readFile('test-file.txt',()=>{
    console.log(`I/O finished exactly now!!`);
    console.log(`-----------------------------`);
    

    setTimeout(() => {	console.log(`inner settimeout call finished now`);
	}, 0);
    setTimeout(() => {	console.log(`inner settimeout call with 3000ms delayed finished now`);
	}, 3000);
    
    setImmediate(() => { console.log(`immediate call happened now`);
            });
});//IO process is always the most delayed one. 


console.log(`the top level code finished executing right about Now.`);// executes ASAP and before others becouse it is top level code. 


