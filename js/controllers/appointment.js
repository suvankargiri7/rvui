//main.js
angular
.module('app')
.controller('appointmentController', appointmentController);

appointmentController.$inject = [
  '$scope',
  'uuid',
  '$interval',
  '$http',
  '$state',
  '$window',
  '$cookies',
  '$localStorage',
  '$sessionStorage',
  '$appointmentServices',
  'FileSaver',
  'Blob'
];

function appointmentController($scope, uuid, $interval, $http, $state, $window, $cookies, $localStorage, $sessionStorage,$appointmentServices,FileSaver,Blob) {
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
	var stop;
  $scope.showOverstay = function(){
    $scope.appointmentToday = false;
    $scope.appointmentOverstay = true;
    $scope.appointmentVip = false;
    /*var todaysAppointments = $localStorage.todayAppointments;
    var overstayappointment = [];
    	for (var key in todaysAppointments)
			{
	      	
	      	var gateentrytime = '';
	      	var gateexittime = '';
	      	if($sessionStorage.userDetails.userrole==='role_company_building_gate') {
	      		gateentrytime = todaysAppointments[key].buildingentrytime;
	      		gateexittime =  todaysAppointments[key].buildingexittime;
	      	}
	      	else if($sessionStorage.userDetails.userrole==='role_company_reception') {
	      		gateentrytime = todaysAppointments[key].companyentrytime;
	      		gateexittime = todaysAppointments[key].companyexittime;
	      	}
	      	else {
	      		gateentrytime = todaysAppointments[key].gateentrytime;
	      		gateexittime = todaysAppointments[key].gateexittime;
	      	}
	      	
			var enrtybits = gateentrytime.split(/\D/);
			var entryDateObject = new Date(enrtybits[0], --enrtybits[1], enrtybits[2], enrtybits[3], enrtybits[4], enrtybits[5]);
			var expectExitDateObj = new Date(entryDateObject.getTime() + todaysAppointments[key].duration*60000);
			var currentDateObj = new Date();

			if (currentDateObj.getTime() > expectExitDateObj.getTime() && !gateexittime) {
			    overstayappointment.push(todaysAppointments[key]);
			}
	      	//var entrytimespilited = value.gateentrytime.split(' ');
	      	//console.log(entrytimespilited);
			

	    }
	   $scope.overstayappointment = overstayappointment;
	   console.log(overstayappointment);*/

  }

  $scope.showVIP = function() {
    $scope.appointmentToday = false;
    $scope.appointmentOverstay = false;
    $scope.appointmentVip = true;

  }

  $scope.showToday = function() {
    $scope.appointmentToday = true;
    $scope.appointmentOverstay = false;
    $scope.appointmentVip = false;
  }
	
	if($scope.appointmentToday || $scope.appointmentVip || $scope.appointmentOverstay) { 
		stop = $interval(function() {
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
				var overstayappointment = [];
				for (var key in todaysappointResponse)
				{
				    if(todaysappointResponse[key].vipstatus==0) {
				    	todayappointment.push(todaysappointResponse[key]);
				    }
				    if(todaysappointResponse[key].vipstatus==1) {
				    	vipappointment.push(angular.copy(todaysappointResponse[key]));
				    }

				    var gateentrytime = '';
			      	var gateexittime = '';
			      	if($sessionStorage.userDetails.userrole==='role_company_building_gate') {
			      		gateentrytime = todaysappointResponse[key].buildingentrytime;
			      		gateexittime =  todaysappointResponse[key].buildingexittime;
			      	}
			      	else if($sessionStorage.userDetails.userrole==='role_company_reception') {
			      		gateentrytime = todaysappointResponse[key].companyentrytime;
			      		gateexittime = todaysappointResponse[key].companyexittime;
			      	}
			      	else {
			      		gateentrytime = todaysappointResponse[key].gateentrytime;
			      		gateexittime = todaysappointResponse[key].gateexittime;
			      	}
			      	if(gateentrytime){
			      		var enrtybits = gateentrytime.split(/\D/);
						var entryDateObject = new Date(enrtybits[0], --enrtybits[1], enrtybits[2], enrtybits[3], enrtybits[4], enrtybits[5]);
						var expectExitDateObj = new Date(entryDateObject.getTime() + todaysappointResponse[key].duration*60000);
						var currentDateObj = new Date();

						if (currentDateObj.getTime() > expectExitDateObj.getTime() && !gateexittime) {
						    overstayappointment.push(angular.copy(todaysappointResponse[key]));
						}
			      	}
					
				   
				}
				$scope.todaysAppointment = todayappointment;
				console.log('Todays---->>',$scope.todaysAppointment);
				$scope.vipappointment = vipappointment;
				console.log('Vip---->>',$scope.vipappointment);
				$scope.overstayappointment = overstayappointment;
			});

		},5000);
		
		
	}
	
	$scope.stopFight = function() {
      if (angular.isDefined(stop)) {
        $interval.cancel(stop);
        stop = undefined;
      }
    };
    

	$scope.selectionAppointment = [];

	$scope.toggleSelection = function toggleSelection(fruitName) {
		$scope.stopFight();
		//$interval.cancel(stop);
        //stop = undefined;
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
					tempArray.push(eachAppointment.visitdate);
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
		var data = [];
	    var ws = XLSX.utils.json_to_sheet(exportedData);
	    //var wopts = { bookType:'xlsx', bookSST:false, type:'array' };

	      /* add to workbook */
	      var wb = XLSX.utils.book_new();
	      XLSX.utils.book_append_sheet(wb, ws);

	      /* write workbook (use type 'array' for ArrayBuffer) */
	      var wbout = XLSX.write(wb, {bookType:'xlsx', type:'array'});

	      /* generate a download */
	      FileSaver.saveAs(new Blob([wbout],{type:"application/octet-stream"}), "TodayAppointment.xlsx");
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
		      		appointmentMarkentryRequest.then(function(deleteReponse){
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
		      		appointmentMarkentryRequest.then(function(deleteReponse){
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
		      		appointmentMarkentryRequest.then(function(deleteReponse){
		      			$state.go($state.current, {}, {reload: true});
		      		});
		      	}
		      });
		   });
		}
	}

	$scope.todayAppointmentMarkExit  =  function(selectedAppointments) {

		if($sessionStorage.userDetails.userrole==='role_company_building_gate')
		{
			angular.forEach(selectedAppointments, function(value){
		      	angular.forEach($localStorage.todayAppointments, function(eachAppointment){
		      	if(eachAppointment.id === value){
		      		var markExitRequestData = {
		      			'tocompany' : eachAppointment.tocompany,
		      			'id' : eachAppointment.id,
		      			'year' : eachAppointment.year,
		      			'userid' : userId,
		      			'uuid' : uuid
		      		};
		      		var appointmentMarkexitRequest =  $appointmentServices.appointmentBuildingExit(markExitRequestData);
		      		appointmentMarkexitRequest.then(function(deleteReponse){
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
		      		var markExitRequestData = {
		      			'tocompany' : eachAppointment.tocompany,
		      			'id' : eachAppointment.id,
		      			'year' : eachAppointment.year,
		      			'userid' : userId,
		      			'uuid' : uuid
		      		};
		      		var appointmentMarkexitRequest =  $appointmentServices.appointmentCompanyExit(markExitRequestData);
		      		appointmentMarkexitRequest.then(function(deleteReponse){
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
		      		var markExitRequestData = {
		      			'tocompany' : eachAppointment.tocompany,
		      			'id' : eachAppointment.id,
		      			'year' : eachAppointment.year,
		      			'userid' : userId,
		      			'uuid' : uuid
		      		};
		      		var appointmentMarkexitRequest =  $appointmentServices.appointmentGateExit(markExitRequestData);
		      		appointmentMarkexitRequest.then(function(deleteReponse){
		      			$state.go($state.current, {}, {reload: true});
		      		});
		      	}
		      });
		   });
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
			$('#maxAppointmentDeleteModal').modal('show');
		}
		
	}

	$scope.todayAppointmentBlock = function(selectedAppointments) {
		//var reason = prompt("Block Reason", "");
		
		if(selectedAppointments.length < 100) {
			var reason = ''
			$('#todayAppointmentBlockModal').modal('show');
			$('#blockReason').on("change", function () {
				  reason = $(this).val();
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
				      			$state.go($state.current, {}, {reload: true});
				      			$('.modal-backdrop').hide();
				      		});
						}
					});
				});
			});
		}
		else {
			$('#maxAppointmentBlockModal').modal('show');
		}
	}

	$scope.todayAppointmentView = function(selectedAppointment) {
		$state.go('app.view', { 'id': selectedAppointment[0] });
	}

	$scope.todayAppointmentEdit = function() {
		console.log('Feature Not available');
	}



	$scope.selectionVip = [];

	$scope.toggleVipSelection = function toggleVipSelection(fruitName) {
		$scope.stopFight();
	    var idx = $scope.selectionVip.indexOf(fruitName.id);
	    // Is currently selected
	    if (idx > -1) {
	      $scope.selectionVip.splice(idx, 1);
	    }

	    // Is newly selected
	    else {
	      $scope.selectionVip.push(fruitName.id);
	    }
	    checkAnyVipblockItem($scope.selectionVip);

    };

    function checkAnyVipblockItem(selectionAppointment) {
    	var selectedCheckItems = [];
    	angular.forEach(selectionAppointment, function(value){
		      	angular.forEach($scope.vipappointment, function(eachAppointment){
		      	if(eachAppointment.id === value){
		      		selectedCheckItems.push(eachAppointment);
		      	}
		      });
		   });
    	var disableBlock = selectedCheckItems.some(item => item.isblocked === 1);
    	$scope.disableVipBlock = disableBlock;
    	$scope.disableVipMarkEntry = disableBlock;
    	$scope.disableVipMarkExit = disableBlock;
    }

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
		alert('Edit functionality is not available');
	}

	$scope.vipAppointmentMarkEntry = function(selectedVip) {
		if($sessionStorage.userDetails.userrole==='role_company_building_gate')
		{
			angular.forEach(selectedVip, function(value){
		      	angular.forEach($scope.vipappointment, function(eachAppointment){
		      	if(eachAppointment.id === value){
		      		var markEntryRequestData = {
		      			'tocompany' : eachAppointment.tocompany,
		      			'id' : eachAppointment.id,
		      			'year' : eachAppointment.year,
		      			'userid' : userId,
		      			'uuid' : uuid
		      		};
		      		var appointmentMarkentryRequest =  $appointmentServices.appointmentBuildingEntry(markEntryRequestData);
		      		appointmentMarkentryRequest.then(function(markReponse){
		      			$state.go($state.current, {}, {reload: true});
		      		});
		      	}
		      });
		   });
		}
		if($sessionStorage.userDetails.userrole==='role_company_reception') {
			angular.forEach(selectedVip, function(value){
		      	angular.forEach($scope.vipappointment, function(eachAppointment){
		      	if(eachAppointment.id === value){
		      		var markEntryRequestData = {
		      			'tocompany' : eachAppointment.tocompany,
		      			'id' : eachAppointment.id,
		      			'year' : eachAppointment.year,
		      			'userid' : userId,
		      			'uuid' : uuid
		      		};
		      		var appointmentMarkentryRequest =  $appointmentServices.appointmentBuildingEntry(markEntryRequestData);
		      		appointmentMarkentryRequest.then(function(markReponse){
		      			$state.go($state.current, {}, {reload: true});
		      		});
		      	}
		      });
		   });
		}
		else {
			angular.forEach(selectedVip, function(value){
		      	angular.forEach($scope.vipappointment, function(eachAppointment){
		      	if(eachAppointment.id === value){
		      		var markEntryRequestData = {
		      			'tocompany' : eachAppointment.tocompany,
		      			'id' : eachAppointment.id,
		      			'year' : eachAppointment.year,
		      			'userid' : userId,
		      			'uuid' : uuid
		      		};
		      		var appointmentMarkentryRequest =  $appointmentServices.appointmentGateEntry(markEntryRequestData);
		      		appointmentMarkentryRequest.then(function(markReponse){
		      			$state.go($state.current, {}, {reload: true});
		      		});
		      	}
		      });
		   });
		}
	}

	$scope.vipAppointmentMarkExit = function(selectedVip) {
		if($sessionStorage.userDetails.userrole==='role_company_building_gate')
		{
			angular.forEach(selectedVip, function(value){
		      	angular.forEach($scope.vipappointment, function(eachAppointment){
		      	if(eachAppointment.id === value){
		      		var markExitRequestData = {
		      			'tocompany' : eachAppointment.tocompany,
		      			'id' : eachAppointment.id,
		      			'year' : eachAppointment.year,
		      			'userid' : userId,
		      			'uuid' : uuid
		      		};
		      		var appointmentMarkexitRequest =  $appointmentServices.appointmentBuildingExit(markExitRequestData);
		      		appointmentMarkexitRequest.then(function(deleteReponse){
		      			$state.go($state.current, {}, {reload: true});
		      		});
		      	}
		      });
		   });
		}
		if($sessionStorage.userDetails.userrole==='role_company_reception') {
			angular.forEach(selectedVip, function(value){
		      	angular.forEach($scope.vipappointment, function(eachAppointment){
		      	if(eachAppointment.id === value){
		      		var markExitRequestData = {
		      			'tocompany' : eachAppointment.tocompany,
		      			'id' : eachAppointment.id,
		      			'year' : eachAppointment.year,
		      			'userid' : userId,
		      			'uuid' : uuid
		      		};
		      		var appointmentMarkexitRequest =  $appointmentServices.appointmentCompanyExit(markExitRequestData);
		      		appointmentMarkexitRequest.then(function(deleteReponse){
		      			$state.go($state.current, {}, {reload: true});
		      		});
		      	}
		      });
		   });
		}
		else {
			angular.forEach(selectedVip, function(value){
		      	angular.forEach($scope.vipappointment, function(eachAppointment){
		      	if(eachAppointment.id === value){
		      		var markExitRequestData = {
		      			'tocompany' : eachAppointment.tocompany,
		      			'id' : eachAppointment.id,
		      			'year' : eachAppointment.year,
		      			'userid' : userId,
		      			'uuid' : uuid
		      		};
		      		var appointmentMarkexitRequest =  $appointmentServices.appointmentGateExit(markExitRequestData);
		      		appointmentMarkexitRequest.then(function(deleteReponse){
		      			$state.go($state.current, {}, {reload: true});
		      		});
		      	}
		      });
		   });
		}
	}

	$scope.exportVipSelectedData = function(selectedVip) {
		var exportedData = [];
		angular.forEach(selectedVip, function(value){
		      	angular.forEach($scope.vipappointment, function(eachAppointment){
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
		var data = [];
	    var ws = XLSX.utils.json_to_sheet(exportedData);
	    //var wopts = { bookType:'xlsx', bookSST:false, type:'array' };

	      /* add to workbook */
	      var wb = XLSX.utils.book_new();
	      XLSX.utils.book_append_sheet(wb, ws);

	      /* write workbook (use type 'array' for ArrayBuffer) */
	      var wbout = XLSX.write(wb, {bookType:'xlsx', type:'array'});

	      /* generate a download */
	      FileSaver.saveAs(new Blob([wbout],{type:"application/octet-stream"}), "vipAppointment.xlsx");
	}

	$scope.vipAppointmentDelete = function(selectedVip) {
		if(selectedVip.length < 100) {
			angular.forEach(selectedVip, function(value){
		      	angular.forEach($scope.vipappointment, function(eachAppointment){
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
			$('#maxAppointmentDeleteModal').modal('show');
		}
	}

	$scope.vipAppointmentBlock = function(selectedVip) {
		//var reason = prompt("Block Reason", "");

		if(selectedVip.length < 100) {
			$('#todayAppointmentBlockModal').modal('show');
			$('#blockReason').on("change", function () {
				reason = $(this).val();
				angular.forEach(selectedVip, function(value){
					angular.forEach($scope.vipappointment, function(eachAppointment){
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
				      			$state.go($state.current, {}, {reload: true});
				      		});
						}
					});
				});
			});
			
		}
		else {
			$('#maxAppointmentBlockModal').modal('show');
		}
	}


	$scope.selectionOverStay = [];

	$scope.toggleOverStaySelection = function toggleOverStaySelection(fruitName) {
	    $scope.stopFight();
	    var idx = $scope.selectionOverStay.indexOf(fruitName.id);
	    // Is currently selected
	    if (idx > -1) {
	      $scope.selectionOverStay.splice(idx, 1);
	    }

	    // Is newly selected
	    else {
	      $scope.selectionOverStay.push(fruitName.id);
	    }
	    checkAnyOverstayblockItem($scope.selectionOverStay);
    };

    function checkAnyOverstayblockItem(selectionAppointment) {
    	var selectedCheckItems = [];
    	angular.forEach(selectionAppointment, function(value){
		      	angular.forEach($scope.overstayappointment, function(eachAppointment){
		      	if(eachAppointment.id === value){
		      		selectedCheckItems.push(eachAppointment);
		      	}
		      });
		   });
    	var disableBlock = selectedCheckItems.some(item => item.isblocked === 1);
    	$scope.disableOverstayBlock = disableBlock;
    	$scope.disableOverstayMarkExit = disableBlock;
    }

    $scope.unselectAllAppointmentOverstay = function() {
    	$scope.selectionOverStay = [];
    };

    $scope.selectAllAppointmentOverstay = function() {
		$scope.selectionOverStay = [];
		angular.forEach($scope.overstayappointment, function (overstayAppointment) {
             overstayAppointment.selected = true;
             $scope.toggleOverStaySelection(overstayAppointment);
        });
	}



	$scope.overstayView = function(seelectedOverstay) {
		$state.go('app.view', { 'id': seelectedOverstay[0] });
	}

	$scope.overstayEdit = function() {
		alert('Edit Functionality is not available');
	}

	$scope.overstayMarkExit = function(seelectedOverstay) {
		if($sessionStorage.userDetails.userrole==='role_company_building_gate')
		{
			angular.forEach(seelectedOverstay, function(value){
		      	angular.forEach($scope.overstayappointment, function(eachAppointment){
		      	if(eachAppointment.id === value){
		      		var markExitRequestData = {
		      			'tocompany' : eachAppointment.tocompany,
		      			'id' : eachAppointment.id,
		      			'year' : eachAppointment.year,
		      			'userid' : userId,
		      			'uuid' : uuid
		      		};
		      		var appointmentMarkexitRequest =  $appointmentServices.appointmentBuildingExit(markExitRequestData);
		      		appointmentMarkexitRequest.then(function(deleteReponse){
		      			$state.go($state.current, {}, {reload: true});
		      		});
		      	}
		      });
		   });
		}
		if($sessionStorage.userDetails.userrole==='role_company_reception') {
			angular.forEach(seelectedOverstay, function(value){
		      	angular.forEach($scope.overstayappointment, function(eachAppointment){
		      	if(eachAppointment.id === value){
		      		var markExitRequestData = {
		      			'tocompany' : eachAppointment.tocompany,
		      			'id' : eachAppointment.id,
		      			'year' : eachAppointment.year,
		      			'userid' : userId,
		      			'uuid' : uuid
		      		};
		      		var appointmentMarkexitRequest =  $appointmentServices.appointmentCompanyExit(markExitRequestData);
		      		appointmentMarkexitRequest.then(function(deleteReponse){
		      			$state.go($state.current, {}, {reload: true});
		      		});
		      	}
		      });
		   });
		}
		else {
			angular.forEach(seelectedOverstay, function(value){
		      	angular.forEach($scope.overstayappointment, function(eachAppointment){
		      	if(eachAppointment.id === value){
		      		var markExitRequestData = {
		      			'tocompany' : eachAppointment.tocompany,
		      			'id' : eachAppointment.id,
		      			'year' : eachAppointment.year,
		      			'userid' : userId,
		      			'uuid' : uuid
		      		};
		      		var appointmentMarkexitRequest =  $appointmentServices.appointmentGateExit(markExitRequestData);
		      		appointmentMarkexitRequest.then(function(deleteReponse){
		      			$state.go($state.current, {}, {reload: true});
		      		});
		      	}
		      });
		   });
		}
	}

	$scope.overstayExport = function (seelectedOverstay) {
		var exportedData = [];
		angular.forEach(seelectedOverstay, function(value){
		      	angular.forEach($scope.overstayappointment, function(eachAppointment){
		      	if(eachAppointment.id === value){
		      		console.log(eachAppointment);
		      		var tempArray = [];
		      		tempArray.push(eachAppointment.visitorname);
		      		tempArray.push(eachAppointment.visitormobile);
		      		tempArray.push(eachAppointment.visitoremail);
		      		tempArray.push(eachAppointment.sex);
		      		tempArray.push(eachAppointment.visiteemobile);
					tempArray.push(eachAppointment.visiteeemail);
					tempArray.push(eachAppointment.visitdate);
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
		var data = [];
	    var ws = XLSX.utils.json_to_sheet(exportedData);
	    //var wopts = { bookType:'xlsx', bookSST:false, type:'array' };

	      /* add to workbook */
	      var wb = XLSX.utils.book_new();
	      XLSX.utils.book_append_sheet(wb, ws);

	      /* write workbook (use type 'array' for ArrayBuffer) */
	      var wbout = XLSX.write(wb, {bookType:'xlsx', type:'array'});

	      /* generate a download */
	      FileSaver.saveAs(new Blob([wbout],{type:"application/octet-stream"}), "OverstayAppointment.xlsx");
	}

	$scope.overstayDelete = function(seelectedOverstay) {
		if(seelectedOverstay.length < 100) {
			angular.forEach(seelectedOverstay, function(value){
		      	angular.forEach($scope.overstayappointment, function(eachAppointment){
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
			$('#maxAppointmentDeleteModal').modal('show');
		}
	}

	$scope.overstayBlock = function(seelectedOverstay) {

		if(seelectedOverstay.length < 100) {
			$('#todayAppointmentBlockModal').modal('show');
			$('#blockReason').on("change", function () {
				angular.forEach(seelectedOverstay, function(value){
					angular.forEach($scope.overstayappointment, function(eachAppointment){
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
				      			$state.go($state.current, {}, {reload: true});
				      		});
						}
					});
				});
			});
			
		}
		else {
			$('#maxAppointmentBlockModal').modal('show');
		}
	}


	$scope.todayCheckboxchecked = function(){
		$('#todayAppointmentTable tbody tr').click(function(event) {
        if (event.target.type !== 'checkbox') {
            $(':checkbox', this).trigger('click');
            if($(':checkbox', this). prop("checked") == false){
            	$(this).removeClass('rv-selected-row');
            }
            else{
            	 $(this).addClass('rv-selected-row');
            }
              
        }

    	});
	}

	$scope.vipCheckboxchecked = function(){
		$('#vipAppointmentTable tbody tr').click(function(event) {
        if (event.target.type !== 'checkbox') {
            $(':checkbox', this).trigger('click');
            if($(':checkbox', this). prop("checked") == false){
            	$(this).removeClass('rv-selected-row');
            }
            else{
            	 $(this).addClass('rv-selected-row');
            }
              
        }

    	});
	}

	$scope.overstayCheckboxchecked = function(){
		$('#overstayTable tbody tr').click(function(event) {
        if (event.target.type !== 'checkbox') {
            $(':checkbox', this).trigger('click');
            if($(':checkbox', this). prop("checked") == false){
            	$(this).removeClass('rv-selected-row');
            }
            else{
            	 $(this).addClass('rv-selected-row');
            }
              
        }

    	});
	}



    $scope.$on('$destroy', function() {
      // Make sure that the interval is destroyed too
      $scope.stopFight();
    });

}

