angular
	.module('app')
	.controller('modalController', modalController);

modalController.$inject = [
	'$scope',
	'uuid',
	'$http',
	'$state',
	'$window',
	'$userServices'
];

function modalController($scope, uuid, $http, $state, $window, $userServices) {


	$scope.passwordChange = function(){
		console.log($userServices.userLoginDetail);
		var changePasswordValue = $scope.user;
		console.log(changePasswordValue);
		var data =  {
				"username":$userServices.userLoginDetail.username,
				"currentpassword":changePasswordValue.currentpassword,
				"newpassword" : changePasswordValue.retypepassword,
				"userid":$userServices.userLoginDetail.userid,
				"uuid":$window.sessionStorage.uuid
			};

		var responseDetails = $userServices.userChangePassword(data);
		responseDetails.then(function(changePasswordResponse){
			$('#passwordChangeClose').click();
			$('.modal-backdrop').hide();
			$state.go('appSimple.login');
		});
	}
}