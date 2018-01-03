angular
	.module('app')
	.controller('navBarController', navBarController);

navBarController.$inject = [
	'$scope',
	'uuid',
	'$http',
	'$state',
	'$window',
	'$cookies',
	'$userServices'
];

function navBarController($scope, uuid, $http, $state, $window, $cookies, $userServices) {
	$scope.user = {};
	var userDetails = $userServices.userLoginDetail;
	if(!userDetails){
		$state.go('appSimple.login');
	}
	else{
		$scope.user = userDetails;
		console.log($scope.user);
		var uuidCookie = $cookies.get('uuid');
		if($scope.user.companyid && $scope.user.userid) {
			var userlogourl = "https://cppjs.com/api/company/companyid/"+$scope.user.companyid+"/photo/user/"+$scope.user.userid+"/uuid/"+uuidCookie;
			$scope.logo = userlogourl;
		}
		else {
			$scope.logo = false;
		}
		
		$scope.logout = function(){
			var logoutData =  {
				'userid' : $scope.user.userid,
				'uuid' : $window.sessionStorage.uuid
			}
			var userLogoutPromise = $userServices.userLogout(logoutData);
			userLogoutPromise.then(function(logoutRes){
				if(logoutRes.status==='Successful'){
					$window.sessionStorage["uuid"] = null;
				 	$state.go('appSimple.login');
				}
			})
		};

	}
}