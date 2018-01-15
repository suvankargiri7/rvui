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
		mailrecordDetailsRequest : mailrecordDetailsRequest
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

}
