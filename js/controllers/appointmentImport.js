//main.js
angular
.module('app')
.controller('appointmentImportController', appointmentImportController);

appointmentImportController.$inject = [
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

function appointmentImportController($scope, uuid, $http, $state, $window, $cookies, $localStorage, $sessionStorage,$appointmentServices) {
	var excludemobileapps = $sessionStorage.excludemobileapps;
	var companyId = $sessionStorage.userDetails.companyid;
	var userId = $sessionStorage.userDetails.userid;
	var uuid = $cookies.get('uuid');
	var allCompanyDetails = $sessionStorage.companyDetails;
	$scope.companyPurpose = [];
	$scope.allIdTypes = [];
	$scope.listOfCompany = [];
	$scope.importedAppointmentData = [];
	$scope.displayNxtImportForm = false;
	$scope.displayInvalildData = false; 
	$scope.companyPreference = $sessionStorage.companyPreferenceDetails;
	$scope.visitdateavilable = true;
	$scope.visitexpiredateavilable = true;
	$scope.tocompanyavailable = true;
	$scope.purposeavailable = true;
	$scope.idcardavailable = true;
	$scope.maxrowtoimport = true;
	$scope.datainfile = true;
	$scope.$on('notification', function (evt,value) {
        if (value) {
        	var allGood = checkAllGood(value);
        	if(allGood){
        		$scope.displayInvalildData = false;
        		$scope.importedAppointmentData = value;
	        	$scope.displayNxtImportForm = true;
	            $scope.$apply();
        	}
        	else {
        		$scope.displayInvalildData = true;
        		$scope.$apply();
        	}
        	
        }
    });

	function checkAllGood(value)
	{
		var companyPreferenceSetting = $sessionStorage.companyPreferenceDetails;
		var nameVisitorAvailableArray = [];
		var numberAvailableArray = [];
		var hostNameAvailableArray = [];
		var hostContactAvailableArray = [];
		var hostEmailAvailableArray = [];
		var fromCompanyAvailableArray = [];
		var addressAvailableArray = [];
		var deviceAvailableArray = [];
		var genderAvailableArray = [];
		var IdCardAvailableArray = [];
		var vipAvailableArray = [];

	    if(companyPreferenceSetting.usevipstatus > 1) {
	      
	    }
	    angular.forEach(value, function(perValue) {
	    	if(perValue.hasOwnProperty('Name')) {
	    		nameVisitorAvailableArray.push(true);
	    	}
	    	if(!perValue.hasOwnProperty('Name')) {
	    		nameVisitorAvailableArray.push(false);
	    	}
	    	if(perValue.hasOwnProperty('Number')) {
	    		numberAvailableArray.push(true);
	    	}
	    	if(!perValue.hasOwnProperty('Number')) {
	    		numberAvailableArray.push(false);
	    	}
	    	if(perValue.hasOwnProperty('Host Name')) {
	    		hostNameAvailableArray.push(true);
	    	}
	    	if(!perValue.hasOwnProperty('Host Name')) {
	    		hostNameAvailableArray.push(false);
	    	}
	    	if(perValue.hasOwnProperty('Host Contact')) {
	    		hostContactAvailableArray.push(true);
	    	}
	    	if(!perValue.hasOwnProperty('Host Contact')) {
	    		hostContactAvailableArray.push(false);
	    	}
	    	if(perValue.hasOwnProperty('Host Email')) {
	    		hostEmailAvailableArray.push(true);
	    	}
	    	if(!perValue.hasOwnProperty('Host Email')) {
	    		hostEmailAvailableArray.push(false);
	    	}
		    if(companyPreferenceSetting.usefromcompany > 0) {
		    	if(perValue.hasOwnProperty('From Company')) {
		    		fromCompanyAvailableArray.push(true);
		    	}
		    	if(!perValue.hasOwnProperty('From Company')) {
		    		fromCompanyAvailableArray.push(false);
		    	}
		    }
		    if(companyPreferenceSetting.useaddress > 0){
		    	if(perValue.hasOwnProperty('Address')) {
		    		addressAvailableArray.push(true);
		    	}
		    	if(!perValue.hasOwnProperty('Address')) {
		    		addressAvailableArray.push(false);
		    	}
		    }
		    if(companyPreferenceSetting.useelectronicdevices > 0) {
		    	if(perValue.hasOwnProperty('Device')) {
		    		deviceAvailableArray.push(true);
		    	}
		    	if(!perValue.hasOwnProperty('Device')) {
		    		deviceAvailableArray.push(false);
		    	}
		    }
		    if(companyPreferenceSetting.usegender > 0) {
		    	if(perValue.hasOwnProperty('Gender')) {
		    		genderAvailableArray.push(true);
		    	}
		    	if(!perValue.hasOwnProperty('Gender')) {
		    		genderAvailableArray.push(false);
		    	}
		    }
		    if(companyPreferenceSetting.useidcard > 0) {
		    	if(perValue.hasOwnProperty('Id card')) {
		    		IdCardAvailableArray.push(true);
		    	}
		    	if(!perValue.hasOwnProperty('Id card')) {
		    		IdCardAvailableArray.push(false);
		    	}
	    	}
	    	if(companyPreferenceSetting.usevipstatus > 1) {
		    	if(perValue.hasOwnProperty('Vip')) {
		    		vipAvailableArray.push(true);
		    	}
		    	if(!perValue.hasOwnProperty('Vip')) {
		    		vipAvailableArray.push(false);
		    	}
	    	}

	    });
	    var finalArray = [];
	    finalArray.push(nameVisitorAvailableArray.every(checkAlltrue));
		finalArray.push(hostEmailAvailableArray.every(checkAlltrue));
		finalArray.push(hostContactAvailableArray.every(checkAlltrue));
		finalArray.push(numberAvailableArray.every(checkAlltrue));
		finalArray.push(fromCompanyAvailableArray.every(checkAlltrue));
		finalArray.push(addressAvailableArray.every(checkAlltrue));
		finalArray.push(deviceAvailableArray.every(checkAlltrue));
		finalArray.push(genderAvailableArray.every(checkAlltrue));
		finalArray.push(IdCardAvailableArray.every(checkAlltrue));
		finalArray.push(vipAvailableArray.every(checkAlltrue));
		if(finalArray.every(checkAlltrue)) {
			return true;
		}
		else {
			return false;
		}
		
	}

	function checkAlltrue(currentValue) {
	  return currentValue === true;
	}
	if($sessionStorage.companyPurposeStringDetail) {
		$scope.companyPurpose = $sessionStorage.companyPurposeStringDetail;
	}

	if($sessionStorage.visitorCardTypes) {
		$scope.allIdTypes = $sessionStorage.visitorCardTypes;
	}


	if(allCompanyDetails.length > 1) {
		var tempArray = [];
		angular.forEach(allCompanyDetails, function(value){
			if($sessionStorage.userDetails.userrole !=='role_company_building_gate' || $sessionStorage.userDetails.userrole!=='role_company_reception')
			{
				var tempJson = {
					'companyid' : value.companyid,
					'displaylabel' : value.companyname + ' - ' + value.companydisplayaddress
				};	
			}
			else {
				var tempJson = {
					'companyid' : value.companyid,
					'displaylabel' : value.companyname
				};	
			}
			tempArray.push(tempJson);
				
		});
		$scope.listOfCompany = tempArray;
	}

    $scope.importData = function(importdata,visitdate,visitexpireDate, tocompany, purpose, idcard){
    	var year='';
    	var completeArray = [];
    	if(importdata.length > 400) {
    		$scope.maxrowtoimport = false;
    	}
    	else if (importdata.length===0){
    		$scope.datainfile = false;

    	}
    	else if(!visitdate ||  visitdate===''){
    		$scope.visitdateavilable = false;

    	}
    	else if(!visitexpireDate || visitexpireDate===''){
    		$scope.visitexpiredateavilable = false;
    	}
    	else if(!tocompany){
    		$scope.tocompanyavailable = false;
    	}
    	else if(!purpose) {
    		$scope.purposeavailable = false;
    	}
    	else if($scope.companyPreference.useidcard > 0 && !idcard) {
    		$scope.idcardavailable = false;
    	}
    	else {

    		var requestData = {};
    		requestData['userid'] = userId;
    		requestData['uuid'] = uuid;
    		requestData['tocompany'] = tocompany.companyid;
    		requestData['purpose'] = purpose;
    		if($scope.companyPreference.useidcard > 0 && idcard) {
    			requestData['idtype'] = idcard;
    		}

			var visitdatesplited = visitdate.split("-");
			var visitexpireDateSplited = visitexpireDate.split("-");

			if(visitdatesplited[0] === visitexpireDateSplited[0]) { 
					year = visitdatesplited[0];
					requestData['visitdate'] = visitdate;
					requestData['validtill'] = visitexpireDate;
					requestData['year'] = year;
					requestData['appdata'] = [];

					var i,j,temparray,chunk = 2;
					for (i=0,j=importdata.length; i<j; i+=chunk) {
					    temparray = importdata.slice(i,i+chunk);
					    requestData['appdata'] = temparray ;
					    var appointmentBulkRequest = $appointmentServices.appointmentBulk(requestData);
					    completeArray.push(appointmentBulkRequest);
					}
			}
			else {
				var year1 = visitdatesplited[0];
				var visitdate1 = visitdate;
				var visitexpireDate1 = year1+'-12-31';
				var requestData1 = angular.copy(requestData);
				requestData1['visitdate'] = visitdate1;
				requestData1['validtill'] = visitexpireDate1;
				requestData1['year'] = year1;
				requestData1['appdata'] = [];


				var year2 = visitexpireDateSplited[0];
				var visitdate2 = year2+'-01-01';
				var visitexpireDate2 = visitexpireDate;
				var requestData2 = angular.copy(requestData);
				requestData2['visitdate'] = visitdate2;
				requestData2['validtill'] = visitexpireDate2;
				requestData2['year'] = year2;
				requestData2['appdata'] = [];

				var i,j,temparray,chunk = 2;
				for (i=0,j=importdata.length; i<j; i+=chunk) {
				    temparray = importdata.slice(i,i+chunk);
				    requestData1['appdata'] = temparray ;
				    requestData2['appdata'] = temparray ;

				    var appointmentBulkRequest = $appointmentServices.appointmentBulk(requestData1);
				    var appointmentBulkRequest2 = $appointmentServices.appointmentBulk(requestData2);
				    completeArray.push(appointmentBulkRequest);
				    completeArray.push(appointmentBulkRequest2);
					    
				}
			}

    		Promise.all(completeArray).then(function(values) {
		  		$state.go('app.main');
			});
    	}
    	
    }

    $scope.checkVisitDate = function(visitdate) {
    	if(visitdate) {
    		$scope.visitdateavilable = true;
    	}
    	else{
    		$scope.visitdateavilable = false;
    	}
    }
    $scope.checkExpireVisitDate = function(date) {
    	if(date) {
    		$scope.visitexpiredateavilable = true;
    	}
    	else{
    		$scope.visitexpiredateavilable = false;
    	}
    }
    $scope.checkToCompany = function(tocompany) {
    	if(tocompany) {
    		$scope.tocompanyavailable = true;
    	}
    	else{
    		$scope.tocompanyavailable = false;
    	}
    }
    $scope.checkPurpose = function(purpose) {
    	if(purpose) {
    		$scope.purposeavailable = true;
    	}
    	else{
    		$scope.purposeavailable = false;
    	}
    }
    $scope.checkIdCard = function(idCard) {
    	if(idCard) {
    		$scope.idcardavailable = true;
    	}
    	else{
    		$scope.idcardavailable = false;
    	}
    }

}

