//main.js
angular
.module('app')
.controller('appointmentController', appointmentController);

appointmentController.$inject = [
  '$scope',
  'uuid',
  '$http',
  '$state',
  '$window',
  '$cookies',
  '$localStorage',
  '$sessionStorage',
  '$appointmentServices'
];

function appointmentController($scope, uuid, $http, $state, $window, $cookies, $localStorage, $sessionStorage,$appointmentServices) {
	var excludemobileapps = $sessionStorage.excludemobileapps;
	var companyId = $sessionStorage.userDetails.companyid;
	var userId = $sessionStorage.userDetails.userid;
	var uuid = $cookies.get('uuid');
	$scope.companyId = companyId;
	$scope.uuid = uuid;
	$scope.userid = userId;
	$scope.userrole = $sessionStorage.userDetails.userrole;
	console.log($scope.appointmentToday);
	console.log($scope.appointmentOverstay);
	console.log($scope.appointmentVip);
	
	
	if($scope.appointmentToday || $scope.appointmentVip || $scope.appointmentOverstay) {
		var todaysappointRequestData = {
		"excludemobileapps": excludemobileapps,
		"companyid" : companyId,
		"userid" : userId,
		"uuid" : uuid
		};
		var todaysappointRequest = $appointmentServices.appointmentTodayListRequest(todaysappointRequestData);
		todaysappointRequest.then(function(todaysappointResponse){
			$localStorage.todayAppointments  = todaysappointResponse;
			var todayappointment = [];
			var vipappointment = [];
			for (var key in todaysappointResponse)
			{
			    if(todaysappointResponse[key].vipstatus==0) {
			    	todayappointment.push(todaysappointResponse[key]);
			    }
			    if(todaysappointResponse[key].vipstatus==1) {
			    	vipappointment.push(todaysappointResponse[key]);
			    }
			   
			}
			$scope.todaysAppointment = todayappointment;
			console.log('Todays---->>',$scope.todaysAppointment);
			$scope.vipappointment = vipappointment;
			console.log('Vip---->>',$scope.vipappointment);
		});
	}
	

	$scope.selectionAppointment = [];

	$scope.toggleSelection = function toggleSelection(fruitName) {
	    var idx = $scope.selectionAppointment.indexOf(fruitName.id);
	    // Is currently selected
	    if (idx > -1) {
	      $scope.selectionAppointment.splice(idx, 1);
	    }

	    // Is newly selected
	    else {
	      $scope.selectionAppointment.push(fruitName.id);
	    }

	    checkAnyblockItem($scope.selectionAppointment);
    };

    function checkAnyblockItem(selectionAppointment) {
    	var selectedCheckItems = [];
    	angular.forEach(selectionAppointment, function(value){
		      	angular.forEach($localStorage.todayAppointments, function(eachAppointment){
		      	if(eachAppointment.id === value){
		      		selectedCheckItems.push(eachAppointment);
		      	}
		      });
		   });
    	var disableBlock = selectedCheckItems.some(item => item.isblocked === 1);
    	$scope.disableBlock = disableBlock;
    	$scope.disableMarkEntry = disableBlock;
    	$scope.disableMarkExit = disableBlock;
    }

    $scope.unselectAllAppointmentToday = function(){
    	$scope.selectionAppointment = [];
    };

    $scope.selectAllAppointmentToday = function() {
		$scope.selectionAppointment = [];
		angular.forEach($scope.todaysAppointment, function (todaysAppointment) {
             todaysAppointment.selected = true;
             $scope.toggleSelection(todaysAppointment);
        });
	}

	$scope.exportTodaysSelectedData = function() {
		alert('Export functionality');
	}

	$scope.todayAppointmentMarkEntry = function(selectedAppointments) {

		console.log('todayAppointmentEntry--->>', selectedAppointments);
		if($sessionStorage.userDetails.userrole==='role_company_building_gate')
		{
			alert('user build entry');
		}
		if($sessionStorage.userDetails.userrole==='role_company_reception') {
			alert('user company entry');
		}
		else{

			console.log(selectedAppointments);
			console.log($localStorage.todayAppointments.some(item => item.id === selectedAppointments[0]));

			for(var i = 0; i < selectedAppointments.length; i++) {

			}
			
			/*{
				"tocompany":"1",
				"id":"13",
				"year" : "2017",
				"userid" : "1",
				"uuid" : "AABC-DEFG-LLM6-48GT"
			}*/

			alert('user gate entry');
		}
	}

	$scope.todayAppointmentMarkExit  =  function(selectedAppointments) {

		console.log('todayAppointmentExit--->>', selectedAppointments);
		if($sessionStorage.userDetails.userrole==='role_company_building_gate')
		{
			alert('user build exit');
		}
		if($sessionStorage.userDetails.userrole==='role_company_reception'){
			alert('user company exit');
		}
		else {
			alert('user gate exit');
		}
	}

	$scope.todayAppointmentDelete = function(selectedAppointments) {
		if(selectedAppointments.length < 100) {
			angular.forEach(selectedAppointments, function(value){
		      	angular.forEach($localStorage.todayAppointments, function(eachAppointment){
		      	if(eachAppointment.id === value){
		      		var deleteRequestData = {
		      			'appointmentid' : value,
		      			'companyid' : companyId,
		      			'year' : eachAppointment.year,
		      			'userid' : userId,
		      			'uuid' : uuid
		      		};
		      		var appointmentDeleteRequest =  $appointmentServices.appointmentDelete(deleteRequestData);
		      		appointmentDeleteRequest.then(function(deleteReponse){
		      			$state.go($state.current, {}, {reload: true});
		      		});
		      	}
		      });
		   });
		}
		else{
			alert('We can delete maximum of 100 appointments at once');
		}
		
	}

	$scope.todayAppointmentBlock = function(selectedAppointments) {
		var reason = prompt("Block Reason", "");


		console.log('today unblock--->>', selectedAppointments);
		alert('Today Appointment Block');
		if(selectedAppointments.length < 100) {
			angular.forEach(selectedAppointments, function(value){
				angular.forEach($localStorage.todayAppointments, function(eachAppointment){
					if(eachAppointment.id === value){
						var blockRequestData = {
		      			'id' : value,
		      			'parentid' : '',
		      			'tocompany' : companyId,
		      			'year' : eachAppointment.year,
		      			'userid' : userId,
		      			'uuid' : uuid,
		      			'visitdate' : eachAppointment.visitdate,
		      			'remarks' : reason
			      		};
			      		var appointmentBlockRequest =  $appointmentServices.appointmentBlock(blockRequestData);
			      		appointmentBlockRequest.then(function(blockReponse){
			      			//$state.go($state.current, {}, {reload: true});
			      			console.log(blockReponse);
			      		});
					}
				});
			});
		}
		else {
			alert('We can block maximum of 100 appoints at once');
		}
	}

	$scope.todayAppointmentView = function(selectedAppointment) {
		$state.go('app.view', { 'id': selectedAppointment[0] });
	}

	$scope.todayAppointmentEdit = function() {
		alert('Edit Today Appointment');
	}



	$scope.selectionVip = [];

	$scope.toggleVipSelection = function toggleVipSelection(fruitName) {

	    var idx = $scope.selectionVip.indexOf(fruitName.id);
	    // Is currently selected
	    if (idx > -1) {
	      $scope.selectionVip.splice(idx, 1);
	    }

	    // Is newly selected
	    else {
	      $scope.selectionVip.push(fruitName.id);
	    }
    };

    $scope.unselectAllAppointmentVip = function() {
    	$scope.selectionVip = [];
    };

    $scope.selectAllAppointmentVip = function() {
		$scope.selectionVip = [];
		angular.forEach($scope.vipappointment, function (vipAppointment) {
             vipAppointment.selected = true;
             $scope.toggleVipSelection(vipAppointment);
        });
	}



	$scope.vipAppointmentView = function(seelectedVip) {
		$state.go('app.view', { 'id': seelectedVip[0] });
	}

	$scope.vipAppointmentEdit = function() {
		alert('Vip Appointment Edit');
	}

	$scope.vipAppointmentMarkEntry = function() {
		alert('Vip Appointment Mark Entry');
	}

	$scope.vipAppointmentMarkExit = function() {
		alert('vip Appointment Mark Exit');
	}

	$scope.exportVipSelectedData = function() {
		alert('Vip Appointment export functionality');
	}

	$scope.vipAppointmentDelete = function() {
		alert('Vip Appointment Delete functionality');
	}

	$scope.vipAppointmentBlock = function() {
		alert('Vip Appointment Block Functionality');
	}





	$scope.overstayView = function() {
		alert('Overstay View Functionality');
	}

	$scope.overstayEdit = function() {
		alert('Overstay Edit Functionality');
	}

	$scope.overstayMarkExit = function() {
		alert('Overstay Mark Exit Functionlity');
	}

	$scope.overstayExport = function () {
		alert('Overstay export functionality');
	}

	$scope.overstayDelete = function() {
		alert('Overstay Delete');
	}

	$scope.overstayBlock = function() {
		alert('Overstay BLock');
	}




}

