angular
	.module('app')
	.controller('loginController', loginController);

loginController.$inject = [
	'$scope',
	'uuid',
	'$http',
	'$state',
	'$window',
	'$localStorage',
    '$sessionStorage',
    '$cookies',
    '$userServices',
];

function loginController($scope, uuid, $http, $state, $window,$localStorage, $sessionStorage,$cookies,$userServices) {

	var uuidCookie = $cookies.get('uuid');
	var usernameCookie = $cookies.get('username');
	var passwordCookie = $cookies.get('password');

	if(uuidCookie && usernameCookie && passwordCookie) {
	var data =  {
				"username":usernameCookie,
				"password":passwordCookie,
				"uuid" : uuidCookie
			};
		var responseDetails1 = $userServices.userLoginRequest(data);
		responseDetails1.then(function(userDetails){
			$userServices.userLoginDetail = userDetails;
			$state.go('app.main');
		});
	}


	$scope.signin = function(validForm) {

		var hash = uuid.v4();
		var loginEnteredValue = $scope.user;
		if (validForm) {
			var data =  {
					"username":loginEnteredValue.email,
					"password":loginEnteredValue.password,
					"uuid" : hash
				};

			var responseDetails = $userServices.userLoginRequest(data);
			responseDetails.then(function(userDetails){
				$userServices.userLoginDetail = userDetails;
				$cookies.put('uuid', hash);
				$cookies.put('username', loginEnteredValue.email);
				$cookies.put('password', loginEnteredValue.password);
				$state.go('app.main');
			});
		}
	};
}