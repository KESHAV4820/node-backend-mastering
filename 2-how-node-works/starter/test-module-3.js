console.log(`This is to test the concept of caching in node.js`);//ConceptVIEMarvel this code is to test how many times this whole code base is executed. Becouse we want to test if there is going to be any caching of the codes or not. If there is any caching then it will be executed only once. Becouse only that time, it was first executed from real code base and rest of the times, it was executed from the cache.
module.exports=() => {	console.log('code that needed to be exported.😎✅ to module.js');
	}
