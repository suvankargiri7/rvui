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
	console.log($scope.appointmentToday);
	if($scope.appointmentToday) {
		var todaysappointRequestData = {
		"excludemobileapps": excludemobileapps,
		"companyid" : companyId,
		"userid" : userId,
		"uuid" : uuid
		};
		var todaysappointRequest = $appointmentServices.appointmentTodayListRequest(todaysappointRequestData);
		todaysappointRequest.then(function(todaysappointResponse){
			console.log(todaysappointResponse);
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
			console.log($scope.todaysAppointment);
			$scope.vipappointment = vipappointment;
			console.log($scope.vipappointment);
		});
	}
	
}

