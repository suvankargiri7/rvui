angular
	.module('app')
	.controller('modalController', modalController);

modalController.$inject = [
	'$scope',
	'uuid',
	'$http',
	'$state',
	'$window',
	'$cookies',
	'$userServices'
];

function modalController($scope, uuid, $http, $state, $window, $cookies, $userServices) {


	$scope.passwordChange = function(){
		console.log($userServices.userLoginDetail);
		var changePasswordValue = $scope.user;
		console.log(changePasswordValue);
		var uuidCookie = $cookies.get('uuid');
		var data =  {
				"username":$userServices.userLoginDetail.username,
				"currentpassword":changePasswordValue.currentpassword,
				"newpassword" : changePasswordValue.retypepassword,
				"userid":$userServices.userLoginDetail.userid,
				"uuid":uuidCookie
			};

		var responseDetails = $userServices.userChangePassword(data);
		responseDetails.then(function(changePasswordResponse){
			$('#passwordChangeClose').click();
			$('.modal-backdrop').hide();
			var cookiesAll = $cookies.getAll();
			for (var key in cookiesAll) {
				$cookies.remove(key);
			}
			$state.go('appSimple.login');
		});
	}
}