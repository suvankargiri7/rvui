angular
	.module('app')
	.factory('$appointmentServices', appointmentServices);


appointmentServices.$inject = [
	'uuid',
	'$http',
	'$state',
	'$window',
	'$localStorage',
    '$sessionStorage',
    '$cookies'
];

function appointmentServices( uuid, $http, $state, $window,$localStorage, $sessionStorage,$cookies) {

	var appointmentApproveStatus = null;

	var appointmentServices = {
		appointmentApproveStatus : appointmentApproveStatus,
		appointmentApproveRequest: appointmentApproveRequest,
		appointmentTodayListRequest : appointmentTodayListRequest,
	};

	return appointmentServices;

	function appointmentApproveRequest(requestData){
		return $http.get('https://cppjs.com/api/appointment/approve/status/user/'+requestData.userid+'/uuid/'+requestData.uuid).then(function(response){
			if(response.data.error){
				return "Error";
			}
			else {
				return response.data;
			}
		});
	}

	function appointmentTodayListRequest(requestData) {
		return $http.get('https://cppjs.com/api/appointment/today/excludemobileapps/'+requestData.excludemobileapps+'/company/'+ requestData.companyid + '/user/'+ requestData.userid + "/uuid/" + requestData.uuid).then(function(response){
			if(response.data.error){
				return "Error";
			}
			else {
				return response.data;
			}
		});
	}

}
