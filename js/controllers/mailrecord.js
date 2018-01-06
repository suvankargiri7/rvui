//main.js
angular
.module('app')
.controller('mailrecordController', mailrecordController);

mailrecordController.$inject = [
  '$scope',
  'uuid',
  '$http',
  '$state',
  '$window',
  '$cookies',
  '$localStorage',
  '$sessionStorage'
];

function mailrecordController($scope, uuid, $http, $state, $window, $cookies, $localStorage, $sessionStorage) {
	var excludemobileapps = $sessionStorage.excludemobileapps;
	var companyId = $sessionStorage.userDetails.companyid;
	var userId = $sessionStorage.userDetails.userid;
	var uuid = $cookies.get('uuid');
	console.log('mailrecord');
}

