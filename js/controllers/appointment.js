//main.js
angular
.module('app')
.controller('appointmentController', appointmentController);

appointmentController.$inject = [
  '$scope',
  'uuid',
  '$http',
  '$state',
  '$window',

];

function appointmentController($scope, uuid, $http, $state, $window) {

  console.log('appointmentController');
}


