//main.js
angular
.module('app')
.controller('mailrecordController', mailrecordController);

mailrecordController.$inject = [
  '$scope',
  'uuid',
  '$http',
  '$state',
  '$window',
  '$cookies',
  '$localStorage',
  '$sessionStorage',
  '$mailrecordServices',
  '$interval'
];

function mailrecordController($scope, uuid, $http, $state, $window, $cookies, $localStorage, $sessionStorage, $mailrecordServices,$interval) {
	var excludemobileapps = $sessionStorage.excludemobileapps;
	var companyId = $sessionStorage.userDetails.companyid;
	var userId = $sessionStorage.userDetails.userid;
	var uuid = $cookies.get('uuid');
	console.log('mailrecord');
	if($scope.mailRecord) {
		var mailRequestTodayData = {
			'companyId' : companyId,
			'userId': userId,
			'uuid' : uuid
		};
		function todayMailRecordEvery3sec(){
			var mailRecordTodayRequest = $mailrecordServices.mailrecordTodayRequest(mailRequestTodayData);

			mailRecordTodayRequest.then(function(todayMailResponse){
				console.log('MailReord today---->', todayMailResponse);
				if(todayMailResponse.length > 0) {
					$scope.todayMailAvailable = true;
					$scope.todayMails = todayMailResponse;
					$scope.totalTodaymail = todayMailResponse.length;
				}
				else {
					$scope.todayMailAvailable = false;
					$scope.totalTodaymail = todayMailResponse.length;
				}
			});

		};

		$interval(todayMailRecordEvery3sec,3000);
		

	}
	$scope.todayMailRecord = function() {
		$scope.mailRecord = true;
    	$scope.allMailreord = false;
	};

	$scope.allMailrecord = function() {
		$scope.mailRecord = false;
    	$scope.allMailreord = true;
	};
}


