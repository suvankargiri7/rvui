angular
.module('app')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/login');

  $stateProvider
  .state('app', {
    abstract:true,
    templateUrl: 'views/common/layouts/full.html',
    controller: 'mainController'
    //page title goes here
  })
  .state('app.main', {
    url: '/appointment',
    templateUrl: 'views/appointment.html',
    params: { subtitle: 'Appointment Dashboard' },
    controller: 'appointmentController'
  })
  .state('app.history', {
    url: '/appointment/history',
    templateUrl: 'views/appointmenthistory.html',
    params: { subtitle: 'Appointment History' },
    controller: 'appointmentHistoryController'
  })
  .state('app.mail', {
    url: '/mailrecord',
    templateUrl: 'views/mailrecord.html',
    params: { subtitle: 'MailRecord Dashboard' },
    controller: 'mailrecordController'
  })
  .state('appSimple', {
    abstract: true,
    templateUrl: 'views/common/layouts/simple.html'
  })

  // Additional Pages
  .state('appSimple.login', {
    url: '/login',
    templateUrl: 'views/pages/login.html',
    controller: 'loginController'
  })
  .state('appSimple.register', {
    url: '/register',
    templateUrl: 'views/pages/register.html'
  })
  .state('appSimple.404', {
    url: '/404',
    templateUrl: 'views/pages/404.html'
  })
  .state('appSimple.500', {
    url: '/500',
    templateUrl: 'views/pages/500.html'
  })
}]);
