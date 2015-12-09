/**
*  Module
*
* Description
*/
angular.module('TaskApp', [])

.controller('TaskController', ['$scope','$http', function($scope,$http){
	$scope.title;
	$scope.tasks = [];
	$scope.lastId = 1;
	$scope.category = 'daily';

	var getTasks = (function(){
		$http({
			method: 'GET',
			url: 'services/dbconnection.php'
		}).then(function successCall(response){
			if (response.data !== ""){
				$scope.tasks = response.data;
			}
			console.log(response.data);
			checkLastId($scope.tasks);
		}, function errorCallback(response){
			console.log(response);
		});
	})();

	$scope.addTask = function(el){
		
		var category = $scope.category;

		$scope.tasks.push({
			id: $scope.lastId, 
			category: category, 
			task: el
		});
		$scope.newTask = '';
		console.log($scope.tasks);
		$scope.lastId ++;
		
	};

	$scope.checkTasks = function(){
		if ($scope.tasks){
			$scope.saveTasks();
		}
	};

	$scope.saveTasks = function(){
		var tasks = angular.toJson($scope.tasks);
		// console.log(tasks);
		$http({
		  method: 'POST',
		  url: 'services/save_task.php',
		  data: tasks
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
			$scope.lastId = data.length;
		}
	};

	
	

}]);