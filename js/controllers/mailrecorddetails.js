//main.js
angular
.module('app')
.controller('mailrecordDetailController', mailrecordDetailController);

mailrecordDetailController.$inject = [
  '$stateParams',
  '$scope',
  'uuid',
  '$http',
  '$state',
  '$window',
  '$cookies',
  '$localStorage',
  '$sessionStorage',
  '$mailrecordServices'
];

function mailrecordDetailController($stateParams, $scope, uuid, $http, $state, $window, $cookies, $localStorage, $sessionStorage,$mailrecordServices) {
	var excludemobileapps = $sessionStorage.excludemobileapps;
	var companyId = $sessionStorage.userDetails.companyid;
	var userId = $sessionStorage.userDetails.userid;
	var uuid = $cookies.get('uuid');
	console.log('mailDetailController----->', $stateParams);
	
	if(!$stateParams.id && !$stateParams.year) {
		$state.go('app.mail');
	}
	else {
		var mailDetailsRequestData = {
			'companyId' : companyId,
			'userId' : userId,
			'id' : $stateParams.id,
			'year': $stateParams.year,
			'uuid': uuid
		};
		var mailDetailsRequest = $mailrecordServices.mailrecordDetailsRequest(mailDetailsRequestData);
		mailDetailsRequest.then(function(responseData){
			console.log(responseData);
			$scope.mailDetail = responseData;
		});
	}	

	$scope.backToMailRecord = function(){
		$state.go('app.mail');
	}
}

