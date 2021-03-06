angular
	.module('app')
	.factory('$companyServices', companyServices);


companyServices.$inject = [
	'uuid',
	'$http',
	'$state',
	'$window',
	'$localStorage',
    '$sessionStorage',
    '$cookies'
];

function companyServices( uuid, $http, $state, $window,$localStorage, $sessionStorage,$cookies) {

	var companyDetails = null;
	var companyBuildingsDetails = null;
	var companyPreferenceDetails = null;
	var companyPurposeStringDetail = null;

	var companyServices = {
		companyDetails : companyDetails,
		companyDetailsRequest:companyDetailsRequest,
		companyBuildingsDetails: companyBuildingsDetails,
		companyPreferenceDetails:companyPreferenceDetails,
		companyPurposeStringDetail: companyPurposeStringDetail,
		companyPreferenceRequest: companyPreferenceRequest,
		companyPurposeStringRequest: companyPurposeStringRequest
	};

	return companyServices;

	function companyDetailsRequest(requestData){
		return $http.get('https://cppjs.com/api/company/user/'+requestData.userid+'/uuid/'+requestData.uuid).then(function(response){
			if(response.data.error){
				return "Error";
			}
			else {
				return response.data;
			}
		});
	}

	function companyPreferenceRequest(requestData) {
		return $http.get('https://cppjs.com/api/company/preference/company/' + requestData.companyid + '/user/' + requestData.userid + '/uuid/' + requestData.uuid).then(function(response){
			if(response.data.error){
				return "Error";
			}
			else {
				return response.data;
			}
		});
	}

	function companyPurposeStringRequest(requestData) {
		return $http.get('https://cppjs.com/api/company/purpose-strings/company/' + requestData.companyid + '/user/' + requestData.userid + '/uuid/' + requestData.uuid).then(function(response){
			if(response.data.error){
				return "Error";
			}
			else {
				return response.data;
			}
		});
	}

}
