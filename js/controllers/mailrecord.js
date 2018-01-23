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
    	$scope.selection = [];
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
	};

	$scope.getHistoryFromMailRecord = function(toDateString,fromDateString) {
		console.log(fromDateString);
		console.log(toDateString);
		if(!toDateString) {
			var today = new Date();
			var todayDate = today.getDate();
			var todayMonth = (today.getMonth()+1);
			var todayYear = today.getFullYear();
			var toDate = todayYear+'-'+todayMonth+'-'+todayDate;
			var historyRequestData = {
				'fromDate' : fromDateString,
				'toDate': toDate,
				'companyId': companyId,
				'userId': userId,
				'uuid': uuid
			};

			var mailRecordHistoryRequest = $mailrecordServices.mailrecordHistoryRequest(historyRequestData);
			mailRecordHistoryRequest.then(function(responseHistory) {
				console.log(responseHistory);
				if(responseHistory.length==0){
					$scope.todayMailAvailable = false;
				}
				$scope.todayMails = responseHistory;
			});
		}
		else{
			var historyRequestData = {
				'fromDate' : fromDateString,
				'toDate': toDateString,
				'companyId': companyId,
				'userId': userId,
				'uuid': uuid
			};

			var mailRecordHistoryRequest = $mailrecordServices.mailrecordHistoryRequest(historyRequestData);
			mailRecordHistoryRequest.then(function(responseHistory) {
				console.log(responseHistory);
				if(responseHistory.length==0){
					$scope.todayMailAvailable = false;
				}
				$scope.todayMails = responseHistory;
			});
		}
	}

	$scope.getHistoryToMailRecord = function(toDateString,fromDateString) {
		console.log(toDateString);
		console.log(fromDateString);
		if(!fromDateString) {
			var today = new Date();
			var todayDate = today.getDate();
			var todayMonth = (today.getMonth()+1);
			var todayYear = today.getFullYear();
			var toDate = todayYear+'-'+todayMonth+'-'+todayDate;
			var historyRequestData = {
				'fromDate' : toDate,
				'toDate': toDateString,
				'companyId': companyId,
				'userId': userId,
				'uuid': uuid
			};

			var mailRecordHistoryRequest = $mailrecordServices.mailrecordHistoryRequest(historyRequestData);
			mailRecordHistoryRequest.then(function(responseHistory) {
				console.log(responseHistory);
				if(responseHistory.length==0){
					$scope.todayMailAvailable = false;
				}
				$scope.todayMails = responseHistory;
			});
		}
		else {

			var historyRequestData = {
				'fromDate' : fromDateString,
				'toDate': toDateString,
				'companyId': companyId,
				'userId': userId,
				'uuid': uuid
			};

			console.log(historyRequestData);
			var mailRecordHistoryRequest = $mailrecordServices.mailrecordHistoryRequest(historyRequestData);
			mailRecordHistoryRequest.then(function(responseHistory) {
				console.log(responseHistory);
				if(responseHistory.length==0){
					$scope.todayMailAvailable = false;
				}
				$scope.todayMails = responseHistory;
			});
		}
	}

	$scope.exportSelectedData = function(selectedData) {
		var exportedData = [];
		angular.forEach(selectedData, function(value){
		      	angular.forEach($scope.todayMails, function(eachMail){
		      	if(eachMail.id === value){
		      		console.log(eachMail);
		      		var tempArray = [];
		      		tempArray.push(eachMail.name);
		      		tempArray.push(eachMail.mobile);
		      		tempArray.push(eachMail.email);
		      		tempArray.push($sessionStorage.companyDetails[0].companyname);
					tempArray.push(eachMail.trackingid);
					tempArray.push(eachMail.remarks);
					if(eachMail.iscollected > 0) {
						tempArray.push('Collected');
					}
					if(eachMail.iscollected == 0) {
						tempArray.push('Not Collected');
					}
					tempArray.push(eachMail.instructions);
					exportedData.push(tempArray);
				}
		      		
		    });
		 });
		return exportedData;
	}

	$scope.deleleSelectionData = function(selectedData) {
		if(selectedData.length < 100) {
			angular.forEach(selectedData, function(value){
		      	angular.forEach($scope.todayMails, function(eachMail){
		      	if(eachMail.id === value){
		      		var deleteRequestData = {
		      			'mailrecordid' : value,
		      			'companyid' : companyId,
		      			'year' : eachMail.year,
		      			'userid' : userId,
		      			'uuid' : uuid
		      		};
		      		var mailDeleteRequest =  $mailrecordServices.mailrecordDeleteRequest(deleteRequestData);
		      		mailDeleteRequest.then(function(deleteReponse){
		      			$state.go($state.current, {}, {reload: true});
		      		});
		      	}
		      });
		   });
		}
		else{
			alert('We can delete maximum of 100 mail at once');
		}
	}



}


