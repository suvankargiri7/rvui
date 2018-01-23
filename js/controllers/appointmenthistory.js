//main.js
angular
.module('app')
.controller('appointmentHistoryController', appointmentHistoryController);

appointmentHistoryController.$inject = [
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

function appointmentHistoryController($scope, uuid, $http, $state, $window, $cookies, $localStorage, $sessionStorage,$appointmentServices) {
	var excludemobileapps = $sessionStorage.excludemobileapps;
	var companyId = $sessionStorage.userDetails.companyid;
	var userId = $sessionStorage.userDetails.userid;
	var uuid = $cookies.get('uuid');
	console.log('appointmentHistoryController');
  $scope.companyId = companyId;
  $scope.uuid = uuid;
  $scope.userid = userId;
  $scope.userrole = $sessionStorage.userDetails.userrole;

  var allappointRequestData = {
    "excludemobileapps": excludemobileapps,
    "companyid" : companyId,
    "userid" : userId,
    "uuid" : uuid
    };
    var todaysappointRequest = $appointmentServices.appointmentTodayListRequest(allappointRequestData);
    todaysappointRequest.then(function(todaysappointResponse){
      $localStorage.AllAppointments  = todaysappointResponse;
      var allAppointment = [];
      for (var key in todaysappointResponse)
      {
            allAppointment.push(todaysappointResponse[key]);
      }
      $scope.allAppointment = allAppointment;
    });


    $scope.getHistoryFrom = function(toDateString,fromDateString) {
      console.log(fromDateString);
      console.log(toDateString);
      if(!toDateString && fromDateString) {
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

        var appointmentHistoryRequest = $appointmentServices.appointmentHistoryRequest(historyRequestData);
        appointmentHistoryRequest.then(function(responseHistory) {
          $scope.allAppointment = responseHistory;
        });
      }
      else if(!fromDateString && toDateString){
        alert('Please select any from date');
      }
      else if(!fromDateString && !toDateString) {
        var allappointRequestData = {
        "excludemobileapps": excludemobileapps,
        "companyid" : companyId,
        "userid" : userId,
        "uuid" : uuid
        };
        var todaysappointRequest = $appointmentServices.appointmentTodayListRequest(allappointRequestData);
        todaysappointRequest.then(function(todaysappointResponse){
          $localStorage.AllAppointments  = todaysappointResponse;
          var allAppointment = [];
          for (var key in todaysappointResponse)
          {
                allAppointment.push(todaysappointResponse[key]);
          }
          $scope.allAppointment = allAppointment;
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

        var appointmentHistoryRequest = $appointmentServices.appointmentHistoryRequest(historyRequestData);
        appointmentHistoryRequest.then(function(responseHistory) {
          $scope.allAppointment = responseHistory;
        });
      }
    }

    $scope.getHistoryTo = function(toDateString,fromDateString) {
    console.log(toDateString);
    console.log(fromDateString);
    if(!fromDateString && toDateString) {
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

      var appointmentHistoryRequest = $appointmentServices.appointmentHistoryRequest(historyRequestData);
      appointmentHistoryRequest.then(function(responseHistory) {
        $scope.allAppointment = responseHistory;
      });
    }
    else if(!toDateString && fromDateString){
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

        var appointmentHistoryRequest = $appointmentServices.appointmentHistoryRequest(historyRequestData);
        appointmentHistoryRequest.then(function(responseHistory) {
          $scope.allAppointment = responseHistory;
        });
    }
    else if(!toDateString && !fromDateString){
      var allappointRequestData = {
        "excludemobileapps": excludemobileapps,
        "companyid" : companyId,
        "userid" : userId,
        "uuid" : uuid
        };
        var todaysappointRequest = $appointmentServices.appointmentTodayListRequest(allappointRequestData);
        todaysappointRequest.then(function(todaysappointResponse){
          $localStorage.AllAppointments  = todaysappointResponse;
          var allAppointment = [];
          for (var key in todaysappointResponse)
          {
                allAppointment.push(todaysappointResponse[key]);
          }
          $scope.allAppointment = allAppointment;
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
      var mailRecordHistoryRequest = $appointmentServices.appointmentHistoryRequest(historyRequestData);
      mailRecordHistoryRequest.then(function(responseHistory) {
        $scope.allAppointment = responseHistory;
      });
    }
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
    };

	$scope.unselectAllAppointment = function() {
    $scope.selectionAppointment = [];
  }

  $scope.selectAllAppointment = function() {
    $scope.selectionAppointment = [];
    angular.forEach($scope.allAppointment, function (appointment) {
             appointment.selected = true;
             $scope.toggleSelection(appointment);
        });
  }

  $scope.exportSelectedData = function(selectedAppointments) {
    var exportedData = [];
    angular.forEach(selectedAppointments, function(value){
            angular.forEach($scope.allAppointment, function(eachAppointment){
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


  $scope.appointmentDelete = function(selectedAppointments) {
    if(selectedAppointments.length < 100) {
      angular.forEach(selectedAppointments, function(value){
            angular.forEach($scope.allAppointment, function(eachAppointment){
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

  $scope.appointmentCheckboxchecked = function() {
    $('#appointmentHistory tbody tr').click(function(event) {
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
  $scope.appointmentView = function(selectedAppointment) {
    $state.go('app.view', { 'id': selectedAppointment[0] });
  }
}

