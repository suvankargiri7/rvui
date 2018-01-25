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
		appointmentDetails: appointmentDetails,
		appointmentGateEntry : appointmentGateEntry,
		appointmentDelete: appointmentDelete,
		appointmentBlock: appointmentBlock,
		appointmentBuildingEntry: appointmentBuildingEntry,
		appointmentCompanyEntry: appointmentCompanyEntry,
		appointmentGateExit: appointmentGateExit,
		appointmentBuildingExit: appointmentBuildingExit,
		appointmentCompanyExit: appointmentCompanyExit,
		appointmentUnblock : appointmentUnblock,
		appointmentHistoryRequest: appointmentHistoryRequest,
		appointmentBulk: appointmentBulk
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
		console.log(requestData);
		return $http.get('https://cppjs.com/api/appointment/today/excludemobileapps/'+requestData.excludemobileapps+'/company/'+ requestData.companyid + '/user/'+ requestData.userid + "/uuid/" + requestData.uuid).then(function(response){
			if(response.data.error){
				return "Error";
			}
			else {
				return response.data;
			}
		});
	}

	function appointmentDetails(requestData) {
		return $http.get('https://cppjs.com/api/appointment/id/'+requestData.appointmentId+'/company/'+requestData.companyid+'/year/'+requestData.year+'/user/'+requestData.userId+'/uuid/'+requestData.uuid).then(function(response){
			if(response.data.error){
				return "Error";
			}
			else {
				return response.data;
			}
		}); 
	}

	function appointmentGateEntry(requestData) {
		return $http.post('https://cppjs.com/api/appointment/update/entrytime/gate', requestData).then(function(response){
			if(response.data.error){
				return "Error";
			}
			else {
				return response.data;
			}
		});
	}

	function appointmentDelete(requestData) {
		return $http.delete('https://cppjs.com/api/appointment/id/' + requestData.appointmentid+ '/company/' + requestData.companyid + '/year/' + requestData.year + '/user/' + requestData.userid + '/uuid/' + requestData.uuid).then(function(response){
			if(response.data.error){
				return "Error";
			}
			else {
				return response.data;
			}
		});
	}

	function appointmentBlock(requestData) {
		return $http.post('https://cppjs.com/api/appointment/block', requestData).then(function(response){
			if(response.data.error){
				return "Error";
			}
			else {
				return response.data;
			}
		});
	}

	function appointmentBuildingEntry(requestData) {
		return $http.post('https://cppjs.com/api/appointment/update/entrytime/building', requestData).then(function(response){
			if(response.data.error){
				return "Error";
			}
			else {
				return response.data;
			}
		});
	}

	function appointmentCompanyEntry(requestData) {
		return $http.post('https://cppjs.com/api/appointment/update/entrytime/reception', requestData).then(function(response){
			if(response.data.error){
				return "Error";
			}
			else {
				return response.data;
			}
		});
	}

	function appointmentGateExit(requestData) {
		return $http.post('https://cppjs.com/api/appointment/update/exittime/gate', requestData).then(function(response){
			if(response.data.error){
				return "Error";
			}
			else {
				return response.data;
			}
		});
	}

	function appointmentBuildingExit(requestData) {
		return $http.post('https://cppjs.com/api/appointment/update/exittime/building', requestData).then(function(response){
			if(response.data.error){
				return "Error";
			}
			else {
				return response.data;
			}
		});
	}

	function appointmentCompanyExit(requestData) {
		return $http.post('https://cppjs.com/api/appointment/update/exittime/reception', requestData).then(function(response){
			if(response.data.error){
				return "Error";
			}
			else {
				return response.data;
			}
		});
	}

	function appointmentUnblock(requestData) {
		return $http.post('https://cppjs.com/api/appointment/unblock', requestData).then(function(response){
			if(response.data.error){
				return "Error";
			}
			else {
				return response.data;
			}
		});
	}

	function appointmentHistoryRequest(requestData){
		return $http.get('https://cppjs.com/api/appointment/from/'+requestData.fromDate+'/to/'+requestData.toDate+'/company/'+requestData.companyId+'/user/'+requestData.userId+'/uuid/'+requestData.uuid+'/limit/500/offset/0').then(function(response){
			if(response.data.error){
				return "Error";
			}
			else {
				return response.data;
			}
		});
	}

	function appointmentBulk(requestData) {
		return $http.post('https://cppjs.com/api/appointment/create/advance/bulk',requestData).then(function(response){
			if(response.data.error){
				return "Error";
			}
			else {
				return response.data;
			}
		});
	} 
}
