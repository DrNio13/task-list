/**
*  Module
*
* Description
*/
angular.module('TaskApp', [])

.controller('TaskController', ['$scope','$http', function($scope,$http){
	$scope.title;
	$scope.tasks = [];
	$scope.tasksServer = [];
	$scope.lastId = 1;
	$scope.category = 'daily';

	var getTasks = (function(){
		$http({
			method: 'GET',
			url: 'services/dbconnection.php'
		}).then(function successCall(response){
			if (response.data !== ""){
				$scope.tasksServer = response.data;
			}
			console.log(response.data);
			checkLastId($scope.tasks);
		}, function errorCallback(response){
			console.log(response);
		});
	})();

	$scope.addLastItem = function(lastObj){
		$http({
			  method: 'POST',
			  url: 'services/save_task.php',
			  data: lastObj
			}).then(function successCallback(response) {
			    // this callback will be called asynchronously
			    // when the response is available
			    console.log("success :) ");
			    console.log(response);
		  	}, function errorCallback(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			    console.log("failed :( ");
			    console.log(response);
			    
		});
	};

	$scope.addTask = function(el){
		console.log("mpainei");
		// var category = $scope.category;

		var addToArray=true;
		for(var i=0; i<$scope.tasksServer.length; i++){
		    if($scope.tasksServer[i].task === el){
		        addToArray=false;
		        console.log("diplo");
		    }
		}

		var skato = {
			id: $scope.lastId, 
			category: $scope.category, 
			task: el
		};

		if(addToArray) {
			$scope.tasksServer.push(skato);
			$scope.tasks.push(skato);
		}		

		$scope.newTask = '';

		$scope.lastId ++;
		
	};

	$scope.checkTasks = function(){
		if ($scope.tasks){
			$scope.saveTasks();
		}
	};

	$scope.saveTasks = function(){
		$scope.tasksServer = angular.toJson($scope.tasks);
		// var tasks = angular.toJson($scope.tasks);
		console.log($scope.tasks.length);
		if ($scope.tasks.length !== 0 && $scope.tasks !== undefined){
			$http({
			  method: 'POST',
			  url: 'services/save_task.php',
			  data: $scope.tasksServer
			}).then(function successCallback(response) {
			    // this callback will be called asynchronously
			    // when the response is available
			    console.log("success :) ");
				$scope.tasks = [];
			    console.log(response);
		  	}, function errorCallback(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			    console.log("failed :( ");
			    console.log(response);
			    
		  	});
		}
		else {
			window.alert("task list is empty");
		}
	};

	var checkCategory = function(data){
		var data = [];
		var category = '';
		data.forEach(function(element, index){
			if (element.category !== null && element.category !== category) {
				category = element.category;
			}
		});

		$scope.category = category;

	};

	var checkLastId = function(data){
		if (data !== "") {
			$scope.lastId = data.length + 1;
		}
	};

	
	

}]);