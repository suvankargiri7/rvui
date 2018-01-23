angular
	.module('app')
	.factory('$mailrecordServices', mailrecordServices);


mailrecordServices.$inject = [
	'uuid',
	'$http',
	'$state',
	'$window',
	'$localStorage',
    '$sessionStorage',
    '$cookies'
];

function mailrecordServices( uuid, $http, $state, $window,$localStorage, $sessionStorage,$cookies) {


	var mailrecordServices = {
		mailrecordTodayRequest : mailrecordTodayRequest,
		mailrecordHistoryRequest : mailrecordHistoryRequest,
		mailrecordDetailsRequest : mailrecordDetailsRequest,
		mailrecordDeleteRequest : mailrecordDeleteRequest
	};

	return mailrecordServices;

	function mailrecordTodayRequest(requestData){
		return $http.get('https://cppjs.com/api/mailrecord/today/company/'+ requestData.companyId +'/user/'+requestData.userId+'/uuid/'+requestData.uuid).then(function(response){
			if(response.data.error){
				return "Error";
			}
			else {
				return response.data;
			}
		});
	}

	function mailrecordHistoryRequest(requestData){

		return $http.get('https://cppjs.com/api/mailrecord/from/'+requestData.fromDate+'/to/'+requestData.toDate+'/company/'+requestData.companyId+'/user/'+requestData.userId+'/uuid/'+requestData.uuid+'/limit/500/offset/0').then(function(response){
			if(response.data.error){
				return "Error";
			}
			else {
				return response.data;
			}
		});
	}

	function mailrecordDetailsRequest(requestData){
		return $http.get('https://cppjs.com/api/mailrecord/id/'+requestData.id+'/company/'+requestData.companyId+'/year/'+requestData.year+'/user/'+requestData.userId+'/uuid/'+requestData.uuid).then(function(response){
			if(response.data.error){
				return "Error";
			}
			else {
				return response.data;
			}
		});
	}

	function mailrecordDeleteRequest(requestData) {
		return $http.delete('https://cppjs.com/api/mailrecord/id/'+requestData.mailrecordid+'/company/'+requestData.companyid+'/year/'+requestData.year+'/user/'+requestData.userid+'/uuid/'+requestData.uuid).then(function(response){
			if(response.data.error){
				return "Error";
			}
			else {
				return response.data;
			}
		});
	}

}
