//main.js
angular
.module('app')
.controller('mainController', mainController);

mainController.$inject = [
  '$scope',
  'uuid',
  '$http',
  '$state',
  '$window',
  '$userServices',
];

function mainController($scope, uuid, $http, $state, $window, $userServices) {

  

  function init(){
    $scope.appointmentToday = true;
    $scope.appointmentOverstay = false;
    $scope.appointmentVip = false;
    $scope.displayMailRecords = false;
    $scope.useOverstay = false;
    $scope.useVip = false;
    var excludemobileapps = null;

    /*var companyBuildingData = {
      'companyid' : $userServices.userLoginDetail.companyid,
      'userid' : $userServices.userLoginDetail.userid
    };

    var companyBuildingRequest = $companyServices.companyBuildingsRequest(companyBuildingData);
    companyBuildingRequest.then(function(companyBuildingResponse){
      $companyServices.companyBuildingsDetails = companyBuildingResponse;
    });

    var companyPreferenceData = {
      'companyid' : $userServices.userLoginDetail.companyid,
      'userid' : $userServices.userLoginDetail.userid
    };

    var companyPreferenceRequest = $companyServices.companyPreferenceRequest(companyPreferenceData);
    companyPreferenceRequest.then(function(companyPreferenceResponse){
      $companyServices.companyPreferenceDetails = companyPreferenceResponse;
      console.log($companyServices.companyPreferenceDetails);
      if ($companyServices.companyPreferenceDetails.excludemobileapps > 1)
      {
        excludemobileapps = 1;
      }
      else{
        excludemobileapps = 0;
      }
      if($companyServices.companyPreferenceDetails.usemaildelivery > 0) {
        $scope.displayMailRecords = true;
      }

      if($companyServices.companyPreferenceDetails.useoverstay > 0) {
        $scope.useOverstay = true;
      }

      if($companyServices.companyPreferenceDetails.useoverstay > 0) {
        $scope.useVip = true;
      }
    });


    var companyPurposeStringData = {
      'companyid' : $userServices.userLoginDetail.companyid,
      'userid' : $userServices.userLoginDetail.userid
    };

    var companyPurposeStringRequest = $companyServices.companyPurposeStringRequest(companyPurposeStringData);
    companyPurposeStringRequest.then(function(companyPurposeStringResponse){
      $companyServices.companyPurposeStringDetail = companyPurposeStringResponse;
    });

    var visitorIdCardTypesData = {
      'userid' : $userServices.userLoginDetail.userid
    };

    var visitorIdCardTypesRequest = $visitorServices.visitorIdCardTypesRequest(visitorIdCardTypesData);
    visitorIdCardTypesRequest.then(function(visitorIdCardTypesResponse){
      $visitorServices.visitorIdCardTypesDetail = visitorIdCardTypesResponse;
    });

    var visitorSextypesReqData = {
      'userid' : $userServices.userLoginDetail.userid
    };

    var visitorSexTypesRequest = $visitorServices.visitorSexTypesRequest(visitorSextypesReqData);
    visitorSexTypesRequest.then(function(visitorSexTypesResponse){
      $visitorServices.visitorSexTypesDetails = visitorSexTypesResponse;
    });


      var appointmentRequestData = {
        'excludemobileapps' : 1,
        'companyid' : $userServices.userLoginDetail.companyid,
        'userid' : $userServices.userLoginDetail.userid
      };

      var appointmentTodayRequest = $appointmentServices.appointmentTodayRequest(appointmentRequestData);
      appointmentTodayRequest.then(function(appointmenttodayResponse){
        $appointmentServices.appointmentTodayData = appointmenttodayResponse;
      });

      var appointmentApprovedRequestData = {
        'userid' : $userServices.userLoginDetail.userid
      };

      var appointmentApprovedRequest = $appointmentServices.appointmentApprovedRequest(appointmentApprovedRequestData);
      appointmentApprovedRequest.then(function(appointmentApprovedResponse){
        $appointmentServices.appointmentApprovedDetails = appointmentApprovedResponse;
      });*/

  }

  init();

  $scope.showOverstay = function(){
    $scope.appointmentToday = false;
    $scope.appointmentOverstay = true;
    $scope.appointmentVip = false;
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

}


