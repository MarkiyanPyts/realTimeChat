angular.module("liveChat").controller("ChatController", function($scope, $location, $http) {
	$scope.userName = "guest";
	$scope.message = "";
	$scope.messages = [],
	socketHost = $location.host() === "localhost" ? "http://localhost:8000" : "https://damp-island-6320.herokuapp.com",
	socket = io.connect(socketHost);
	socket.on("message", function(data) {
		$scope.getMessages();
	});
	$scope.getUserName = function() {
		$scope.userName = prompt("What is your name?");
	}
	$scope.sendMessage = function() {
		$http.post("/chat", {
			"username": $scope.userName,
			"message": $("textarea").val()
		})
		.success(function(data, status, headers, config) {
			$scope.messages = angular.fromJson(data);
			$("textarea").val("");
			socket.emit("message");
		  // this callback will be called asynchronously
		  // when the response is available
		}).
		error(function(data, status, headers, config) {
		  // called asynchronously if an error occurs
		  // or server returns response with an error status.
		});
	};
	$scope.getMessages = function() {
		$http.get("/chat")
		.success(function(data, status, headers, config) {
			$scope.messages = angular.fromJson(data);
			console.log($scope.messages);
		  // this callback will be called asynchronously
		  // when the response is available
		}).
		error(function(data, status, headers, config) {
			console.log(status)
		  // called asynchronously if an error occurs
		  // or server returns response with an error status.
		});
	};
	$scope.getMessages();
	$scope.getUserName();
});