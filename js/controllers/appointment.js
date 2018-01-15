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

	$scope.exportTodaysSelectedData = function(selectedAppointments) {
		var exportedData = [];
		angular.forEach(selectedAppointments, function(value){
		      	angular.forEach($localStorage.todayAppointments, function(eachAppointment){
		      	if(eachAppointment.id === value){
		      		console.log(eachAppointment);
		      		var tempArray = [];
		      		tempArray.push(eachAppointment.visitorname);
		      		tempArray.push(eachAppointment.visitormobile);
		      		tempArray.push(eachAppointment.visitoremail);
		      		tempArray.push(eachAppointment.sex);
		      		tempArray.push(eachAppointment.visiteemobile);
					tempArray.push(eachAppointment.visiteeemail);
					tempArray.push("'"+eachAppointment.visitdate+"'");
					tempArray.push(eachAppointment.purpose);
					tempArray.push(eachAppointment.idtype);
					tempArray.push(eachAppointment.idno);				
					tempArray.push(eachAppointment.fromcompany);
					tempArray.push($sessionStorage.companyDetails[0].companyname);
					if($sessionStorage.userDetails.userrole==='role_company_building_gate') {
						if(!eachAppointment.buildingentrytime) {
							tempArray.push('');
						}
						else {
							tempArray.push(eachAppointment.buildingentrytime);
						}
						
					}
					if($sessionStorage.userDetails.userrole==='role_company_building_gate') {
						if(!eachAppointment.buildingexittime) {
							tempArray.push('');
						}
						else {
							tempArray.push(eachAppointment.buildingexittime);
						}
						
					}
					if($sessionStorage.userDetails.userrole==='role_company_reception') {
						if(!eachAppointment.companyentrytime) {
							tempArray.push('');
						}
						else {
							tempArray.push(eachAppointment.companyentrytime);
						}
					}
					if($sessionStorage.userDetails.userrole==='role_company_reception') {
						if(!eachAppointment.companyexittime) {
							tempArray.push('');
						}
						else {
							tempArray.push(eachAppointment.companyexittime);
						}
					}
					if($sessionStorage.userDetails.userrole==='role_company_admin' || $sessionStorage.userDetails.userrole==='role_company_gate') {
						if(!eachAppointment.gateentrytime) {
							tempArray.push('');
						}
						else {
							tempArray.push(eachAppointment.gateentrytime);
						}
					}
					if($sessionStorage.userDetails.userrole==='role_company_admin' || $sessionStorage.userDetails.userrole==='role_company_gate') {
						if(!eachAppointment.gateexittime) {
							tempArray.push('');
						}
						else {
							tempArray.push(eachAppointment.gateexittime);
						}
					}
					
					if(eachAppointment.isblocked > 0){
						tempArray.push('Blocked');
					}
					if(eachAppointment.isblocked == 0)
					{
						if($sessionStorage.userDetails.userrole==='role_company_building_gate') {
							if(!eachAppointment.buildingentrytime && !eachAppointment.buildingexittime) {
								tempArray.push('Expected');
							}
							else if(eachAppointment.buildingentrytime && !eachAppointment.buildingexittime)
							{
								tempArray.push('Entered');
							}
							else {
								tempArray.push('Exited');
							}
						
						}
						
						if($sessionStorage.userDetails.userrole==='role_company_reception') {
							if(!eachAppointment.companyentrytime && !eachAppointment.companyexittime) {
								tempArray.push('Expected');
							}
							else if(eachAppointment.companyentrytime && !eachAppointment.companyexittime) {
								tempArray.push('Entered');
							}
							else {
								tempArray.push('Exited');
							}
						}

						if($sessionStorage.userDetails.userrole==='role_company_admin' || $sessionStorage.userDetails.userrole==='role_company_gate') {
							if(!eachAppointment.gateentrytime && !eachAppointment.gateexittime) {
								tempArray.push('Expected');
							}
							else if(eachAppointment.gateentrytime && !eachAppointment.gateexittime) {
								tempArray.push('Entered');
							}
							else {
								tempArray.push('Exited');
							}
						}
					}
					
		      		exportedData.push(tempArray);
		      	}
		      });
		   });
		return exportedData;
	}

	$scope.todayAppointmentMarkEntry = function(selectedAppointments) {

		console.log('todayAppointmentEntry--->>', selectedAppointments);
		if($sessionStorage.userDetails.userrole==='role_company_building_gate')
		{
			angular.forEach(selectedAppointments, function(value){
		      	angular.forEach($localStorage.todayAppointments, function(eachAppointment){
		      	if(eachAppointment.id === value){
		      		var markEntryRequestData = {
		      			'tocompany' : eachAppointment.tocompany,
		      			'id' : eachAppointment.id,
		      			'year' : eachAppointment.year,
		      			'userid' : userId,
		      			'uuid' : uuid
		      		};
		      		var appointmentMarkentryRequest =  $appointmentServices.appointmentBuildingEntry(markEntryRequestData);
		      		appointmentDeleteRequest.then(function(deleteReponse){
		      			$state.go($state.current, {}, {reload: true});
		      		});
		      	}
		      });
		   });
		}
		if($sessionStorage.userDetails.userrole==='role_company_reception') {
			angular.forEach(selectedAppointments, function(value){
		      	angular.forEach($localStorage.todayAppointments, function(eachAppointment){
		      	if(eachAppointment.id === value){
		      		var markEntryRequestData = {
		      			'tocompany' : eachAppointment.tocompany,
		      			'id' : eachAppointment.id,
		      			'year' : eachAppointment.year,
		      			'userid' : userId,
		      			'uuid' : uuid
		      		};
		      		var appointmentMarkentryRequest =  $appointmentServices.appointmentBuildingEntry(markEntryRequestData);
		      		appointmentDeleteRequest.then(function(deleteReponse){
		      			$state.go($state.current, {}, {reload: true});
		      		});
		      	}
		      });
		   });
		}
		else {
			angular.forEach(selectedAppointments, function(value){
		      	angular.forEach($localStorage.todayAppointments, function(eachAppointment){
		      	if(eachAppointment.id === value){
		      		var markEntryRequestData = {
		      			'tocompany' : eachAppointment.tocompany,
		      			'id' : eachAppointment.id,
		      			'year' : eachAppointment.year,
		      			'userid' : userId,
		      			'uuid' : uuid
		      		};
		      		var appointmentMarkentryRequest =  $appointmentServices.appointmentGateEntry(markEntryRequestData);
		      		appointmentDeleteRequest.then(function(deleteReponse){
		      			$state.go($state.current, {}, {reload: true});
		      		});
		      	}
		      });
		   });
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

