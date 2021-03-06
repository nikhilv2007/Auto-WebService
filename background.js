chrome.runtime.onInstalled.addListener(function() {
    // Initialise storage
    //chrome.storage.local.set(object items, function callback);
});

chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('window.html', {
    innerBounds: {
		'width': 800,
	    'height': 800
    },
    outerBounds:{
    	/*'left':-1,
    	'top':-1*/
    },
    state:"maximized"
    //resizable: false,
    //alwaysOnTop: true,
	/*frame: {
		'type':'none'
	}*/
  });
});

chrome.runtime.onSuspend.addListener(function() {
  // Do some simple clean-up tasks.
    console.log("Suspending app");
});

// Indexed DB part begins----------------------------------------------------------------

//support();

// End of indexed DB code -----------------------------------------------------------------
    
chrome.alarms.onAlarm.addListener(function(alarm) {
    //var testData = [];
    console.log("Alarm triggered @ - " + Date());
    
    readAllTestsFromStore(makeRequests)
        
});

function makeRequests(data){
    console.log("inside make request");
    console.log(data);
    /* initial code
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          console.log("Test "+data.key + " -> "+xhttp.status);
        }
    };
    xhttp.open(data.value.requestType, data.value.url, true);
    xhttp.send();
    */
    /*
    // --------------- TODO : promise + sequence @ http://www.html5rocks.com/en/tutorials/es6/promises/ & https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise---------
    // Code from mozilla blog
    for(var i in data){
        console.log(data[i])
        // Executes the method call 
        $http(data[i]) 
          .get({}) 
          .then(callback.success) 
          .catch(callback.error);
    }
    */
    
    // Source - http://www.html5rocks.com/en/tutorials/es6/promises/
    // Start off with a promise that always resolves
    var sequence = Promise.resolve();

    // Loop through our chapter urls
    data.forEach(function(request) {
        // Add these actions to the end of the sequence
        sequence = sequence.then(function() {
            console.log("request for key"+ request.id);
            return get(request.url);
          }).then(function(response) {
            console.log(response);
          });
    });
    
    
};

/*
// Source - https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
function $http(requestData){
 
  // A small example of object
  var core = {

    // Method that performs the ajax request
    ajax: function (method, url, args) {

      // Creating a promise
      var promise = new Promise( function (resolve, reject) {

        // Instantiates the XMLHttpRequest
        var client = new XMLHttpRequest();
        var uri = url;

        if (args && (method === 'POST' || method === 'PUT')) {
          uri += '?';
          var argcount = 0;
          for (var key in args) {
            if (args.hasOwnProperty(key)) {
              if (argcount++) {
                uri += '&';
              }
              uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
            }
          }
        }

        client.open(method, uri);
        client.send();

        client.onload = function () {
          if (this.status >= 200 && this.status < 300) {
                // Performs the function "resolve" when this.status is equal to 2xx
                resolve(this.response, requestData.id);
          } else {
            // Performs the function "reject" when this.status is different than 2xx
            reject(this.statusText, requestData.id);
          }
        };
        client.onerror = function () {
          reject(this.statusText);
        };
      });

      // Return the promise
      return promise;
    }
  };

  // Adapter pattern
  return {
    'get': function(args) {
      return core.ajax('GET', requestData.url, args);
    },
    'post': function(args) {
      return core.ajax('POST', requestData.url, args);
    },
    'put': function(args) {
      return core.ajax('PUT', requestData.url, args);
    },
    'delete': function(args) {
      return core.ajax('DELETE', requestData.url, args);
    }
  };
};

var callback = {
  success: function(data, id) {
    console.log(id, 'success', data);
  },
  error: function(data, id) {
    console.log(id, 'error', data);
  }
};

// Source - http://www.html5rocks.com/en/tutorials/es6/promises/
function get(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });
}
*/