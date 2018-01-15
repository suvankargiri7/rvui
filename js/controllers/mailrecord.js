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
  '$interval',
  '$filter'
];

function mailrecordController($scope, uuid, $http, $state, $window, $cookies, $localStorage, $sessionStorage, $mailrecordServices,$interval,$filter) {
	var excludemobileapps = $sessionStorage.excludemobileapps;
	var companyId = $sessionStorage.userDetails.companyid;
	var userId = $sessionStorage.userDetails.userid;
	var uuid = $cookies.get('uuid');
	console.log('mailrecord');
	if($scope.mailRecord) {
		var promise;
		var mailRequestTodayData = {
			'companyId' : companyId,
			'userId': userId,
			'uuid' : uuid
		};
		//function todayMailRecordEvery3sec(){
			var mailRecordTodayRequest = $mailrecordServices.mailrecordTodayRequest(mailRequestTodayData);

			mailRecordTodayRequest.then(function(todayMailResponse){
				console.log('MailReord today---->', todayMailResponse);
				if(todayMailResponse.length > 0) {
					$scope.todayMailAvailable = true;
					$scope.todayMails = todayMailResponse;
					$localStorage.todaymail = todayMailResponse;
					$scope.totalTodaymail = todayMailResponse.length;
				}
				else {
					$scope.todayMailAvailable = false;
					$scope.totalTodaymail = todayMailResponse.length;
				}
			});

		//};

		//var promise = $interval(todayMailRecordEvery3sec,2000);
		

	}
	$scope.todayMailRecord = function() {
		$scope.mailRecord = true;
    	$scope.allMailreord = false;
	};

	$scope.allMailrecord = function() {
		$scope.mailRecord = false;
    	$scope.allMailreord = true;
	};

	$scope.selection = [];

	$scope.toggleSelection = function toggleSelection(fruitName) {

	    var idx = $scope.selection.indexOf(fruitName.id);
	    // Is currently selected
	    if (idx > -1) {
	      $scope.selection.splice(idx, 1);
	    }

	    // Is newly selected
	    else {
	      $scope.selection.push(fruitName.id);
	    }
    };

    $scope.unselectAllToday = function(){
    	$scope.selection = [];
    };

	$scope.selectAllToday = function() {
		$scope.selection = [];
		angular.forEach($scope.todayMails, function (todayMail) {
             todayMail.selected = true;
             $scope.toggleSelection(todayMail);
        });
	}


}


