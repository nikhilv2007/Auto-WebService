
var angMain = angular.module('myApp', []);
	

angMain.controller('MainCtrl', function($scope, $http){
    
    $scope.url = '';
    $scope.requestType = 'GET';
    
    $scope.startIn = 1;
    $scope.repeat = 5;
    
	$scope.getAngular = function(){
        if($scope.requestType == "GET"){
            $http.get($scope.url)
            .success(function(response, status, headers, config) {
                console.log(response);
                document.getElementById('response').innerHTML = response;
            })
            .error(function(data, status, headers, config){console.log("error occured whilst fetching details");})
            ;
        }
	};
	
    $scope.addTest = function(){
        var data =  { 'requestType': $scope.requestType, 'url': $scope.url};
        addTestToStore(data);
    }
    
    $scope.generateAlarm = function(){
        // ToDo - Store the alarm data in local storage as in https://developer.chrome.com/extensions/storage#property-local
        
        // Stop prev alarm
        chrome.alarms.clear("AutoWebService", function(cleared){
            if(cleared)
                console.log("Alarm cleared successfully");
            else
                console.log("Alarm couldn't be cleared");
        });
        
        // Create new alarm
        chrome.alarms.create("AutoWebService",{delayInMinutes: parseInt($scope.startIn), periodInMinutes: parseInt($scope.repeat)});
    }
    
    //chrome.alarms.create("AutoWebService",{delayInMinutes: 1, periodInMinutes: 5})
    //chrome.alarms.get('AutoWebService', function (alarm){console.log(alarm)})
    //http://api.geonames.org/postalCodeSearch?postalcode=560086&maxRows=10&username=user1234
});
