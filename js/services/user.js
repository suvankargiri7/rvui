angular
	.module('app')
	.factory('$userServices', userServices);


userServices.$inject = [
	'uuid',
	'$http',
	'$state',
	'$window',
	'$localStorage',
    '$sessionStorage',
    '$cookies'
];

function userServices( uuid, $http, $state, $window,$localStorage, $sessionStorage,$cookies) {

	var userLoginDetail = null;
	var userServices = {
		userLoginRequest: userLoginRequest,
		userLoginDetail:userLoginDetail
	};

	return userServices;


	function userLoginRequest(requestData) {
		return $http.post('https://cppjs.com/api/user/login', requestData).then(function(response){
			if(response.data.error){
				return "Error";
			}
			else {
				return response.data;
			}
	});
	}


}
