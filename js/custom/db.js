const DB_NAME = 'AutoWebService';
const DB_VERSION = 1; // Use a long long for this value (don't use a float)
const TEST_STORE_NAME = 'tests';
const SUITE_STORE_NAME = 'suites';

var db;
/*
function support(){
    if (!window.indexedDB) {
        console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
    }
    else{
        console.log("your browser supports indexed DB");
    }
}
*/
// Open database
var request = window.indexedDB.open(DB_NAME, DB_VERSION);
request.onerror = function(event) {
    // Do something with request.errorCode!
    console.log("Database error: " + event.target.errorCode);
};
request.onsuccess = function(event) {
    // Do something with request.result!
    console.log("DB opened successfully !!");
    db = event.target.result;
    captureDBErrors();
};
request.onupgradeneeded = function(event) { 
    var db = event.target.result;

    // Create another object store called "names" with the autoIncrement flag set as true.    
    var testStore = db.createObjectStore(TEST_STORE_NAME, { autoIncrement : true });
};

function captureDBErrors(){
    db.onerror = function(event) {
        // Generic error handler for all errors targeted at this database's requests!
        console.log("Database error: " + event.target.errorCode);
    };
}

function addTestToStore(data){
    var transaction = db.transaction([TEST_STORE_NAME], "readwrite");
    
    // Do something when all the data is added to the database.
    transaction.oncomplete = function(event) {
      console.log("transaction done!");
    };

    transaction.onerror = function(event) {
      // Don't forget to handle errors!
    };
    
    var objectStore = transaction.objectStore(TEST_STORE_NAME);
    
    var request = objectStore.add(data);
    request.onsuccess = function(event) {
        console.log("test added to object store");
    };
}

function readAllTestsFromStore(callback){
    console.log("inside read all tests from store");
    var testData = [];
    var objectStore = db.transaction(TEST_STORE_NAME).objectStore("tests");

    objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            console.log("Test " + cursor.key + " | " + cursor.value.requestType + " | " + cursor.value.url);
            var data = {'id': cursor.key, 'requestType': cursor.value.requestType, 'url': cursor.value.url};
            testData.push(data);
            //makeRequests(cursor);
            cursor.continue();
        }
        else {
          console.log("Finished reading test object store!");
          callback(testData);
        }
    };
    
}