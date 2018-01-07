//main.js
angular
.module('app')
.controller('appointmentHistoryController', appointmentHistoryController);

appointmentHistoryController.$inject = [
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

function appointmentHistoryController($scope, uuid, $http, $state, $window, $cookies, $localStorage, $sessionStorage,$appointmentServices) {
	var excludemobileapps = $sessionStorage.excludemobileapps;
	var companyId = $sessionStorage.userDetails.companyid;
	var userId = $sessionStorage.userDetails.userid;
	var uuid = $cookies.get('uuid');
	console.log('appointmentHistoryController');
	
}

