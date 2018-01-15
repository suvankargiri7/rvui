//main.js
angular
.module('app')
.controller('appointmentDetailController', appointmentDetailController);

appointmentDetailController.$inject = [
  '$stateParams',
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

function appointmentDetailController($stateParams, $scope, uuid, $http, $state, $window, $cookies, $localStorage, $sessionStorage,$appointmentServices) {
	var excludemobileapps = $sessionStorage.excludemobileapps;
	var companyId = $sessionStorage.userDetails.companyid;
	var userId = $sessionStorage.userDetails.userid;
	var uuid = $cookies.get('uuid');
	$scope.uuid = uuid;
	$scope.userid = userId;
	$scope.tocompany = $sessionStorage.companyDetails[0].companyname;
	$scope.backToAppointment = function() {
		$scope.appointmentToday = true;
		$state.go('app.main');
	}


	var appointments = $localStorage.todayAppointments;

	angular.forEach(appointments, function (appointment) {
         if(appointment.id==$stateParams.id){
         	$scope.viewAppointmentObject = appointment;
         }
    });

    var appointmentDetailsRequestData = {
    	'appointmentId': $scope.viewAppointmentObject.id,
    	'year': $scope.viewAppointmentObject.year,
    	'uuid': uuid,
    	'companyid': $scope.viewAppointmentObject.tocompany,
    	'userId': userId
    }

    console.log('Apppointment Request Data->>>>>', appointmentDetailsRequestData);

    var appointmentDetailRequest = $appointmentServices.appointmentDetails(appointmentDetailsRequestData);
    appointmentDetailRequest.then(function(appointmentDetailResponse){
    	console.log('appointment detail response---->>>>', appointmentDetailResponse);
    	$scope.appointmentDetails = appointmentDetailResponse;
    });

}

