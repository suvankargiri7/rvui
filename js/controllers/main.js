//main.js
angular
.module('app')
.controller('mainController', mainController);

mainController.$inject = [
  '$scope',
  'uuid',
  '$http',
  '$state',
  '$sessionStorage',
  '$window',
  '$cookies',
  '$userServices',
  '$companyServices',
  '$visitorServices',
  '$appointmentServices'
];

function mainController($scope, uuid, $http, $state,$sessionStorage, $window, $cookies, $userServices, $companyServices, $visitorServices,$appointmentServices) {

  

  function init(){
    $scope.appointmentToday = true;
    $scope.appointmentOverstay = false;
    $scope.appointmentVip = false;
    $scope.displayMailRecords = false;
    $scope.useOverstay = false;
    $scope.useVip = false;
    $scope.mailRecord = true;
    $scope.allMailreord = false;
    var excludemobileapps = null;
    var uuidCookie = $cookies.get('uuid');

    console.log($sessionStorage.userDetails);

    var companyRequestData = {
      "userid": $sessionStorage.userDetails.userid,
      "uuid": uuidCookie
    }
    var companyDetailsRequest = $companyServices.companyDetailsRequest(companyRequestData);
    companyDetailsRequest.then(function(Response){
      $companyServices.companyDetails = Response;
      $sessionStorage.companyDetails = Response;
        var visitorIdCardRequestData = {
          "userid": $sessionStorage.userDetails.userid,
          "uuid": uuidCookie
        }
        var visitorCardRequest = $visitorServices.visitorCardTypeRequest(visitorIdCardRequestData);
        visitorCardRequest.then(function(visitorresponse1){
          $visitorServices.visitorCardTypes = visitorresponse1;
          $sessionStorage.visitorCardTypes = visitorresponse1;
            var visitorSexRequestData = {
              "userid": $sessionStorage.userDetails.userid,
              "uuid": uuidCookie
            }
            var visitorSexTypesRequest = $visitorServices.visitorSexTypeRequest(visitorSexRequestData);
            visitorSexTypesRequest.then(function(visitorreponse2){
              $visitorServices.visitorSexTypes = visitorreponse2;
              $sessionStorage.visitorSexTypes = visitorreponse2;
              var companyPreferenceRequestData = {
                "companyid": $sessionStorage.userDetails.companyid,
                "userid": $sessionStorage.userDetails.userid,
                "uuid": uuidCookie
              }
              var companyPreferenceRequest = $companyServices.companyPreferenceRequest(companyPreferenceRequestData);
              companyPreferenceRequest.then(function(companyPreferenceresponse){
                $companyServices.companyPreferenceDetails = companyPreferenceresponse;
                $sessionStorage.companyPreferenceDetails = companyPreferenceresponse;
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
                  if ($companyServices.companyPreferenceDetails.excludemobileapps > 1)
                  {
                    $sessionStorage.excludemobileapps = 1;
                  }
                  else{
                    $sessionStorage.excludemobileapps = 0;
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
                  var companypurposeStringrequestData = {
                    "companyid": $sessionStorage.userDetails.companyid,
                    "userid": $sessionStorage.userDetails.userid,
                    "uuid": uuidCookie
                  }
                  var companyPurposeStringRequest = $companyServices.companyPurposeStringRequest(companypurposeStringrequestData);
                  companyPurposeStringRequest.then(function(compantpurposeStringresponse){
                    $companyServices.companyPurposeStringDetail = compantpurposeStringresponse;
                    $sessionStorage.companyPurposeStringDetail = compantpurposeStringresponse;
                    var appointmentStatusRequestData = {
                      "userid":$sessionStorage.userDetails.userid,
                      "uuid": uuidCookie
                    }
                    var appointstatusrequest = $appointmentServices.appointmentApproveRequest(appointmentStatusRequestData);
                    appointstatusrequest.then(function(appointmentApproveStatusresponse){
                        $appointmentServices.appointmentApproveStatus = appointmentApproveStatusresponse;
                        $sessionStorage.appointmentApproveStatus = compantpurposeStringresponse;
                    });
                  });
              });
            });
        });
    });

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


