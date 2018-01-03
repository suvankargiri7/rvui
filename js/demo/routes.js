angular
.module('app')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('app.icons', {
    url: "/icons",
    abstract: true,
    template: '<ui-view></ui-view>'
  })
  .state('app.icons.fontawesome', {
    url: '/font-awesome',
    templateUrl: 'views/icons/font-awesome.html',
  })
  .state('app.icons.simplelineicons', {
    url: '/simple-line-icons',
    templateUrl: 'views/icons/simple-line-icons.html',

  })
  .state('app.components', {
    url: "/components",
    abstract: true,
    template: '<ui-view></ui-view>'

  })
  .state('app.components.buttons', {
    url: '/buttons',
    templateUrl: 'views/components/buttons.html'

  })
  .state('app.components.social-buttons', {
    url: '/social-buttons',
    templateUrl: 'views/components/social-buttons.html'

  })
  .state('app.components.cards', {
    url: '/cards',
    templateUrl: 'views/components/cards.html'

  })
  .state('app.components.forms', {
    url: '/forms',
    templateUrl: 'views/components/forms.html'

  })
  .state('app.components.switches', {
    url: '/switches',
    templateUrl: 'views/components/switches.html',
  })
  .state('app.components.tables', {
    url: '/tables',
    templateUrl: 'views/components/tables.html',
  })
  .state('app.forms', {
    url: '/forms',
    templateUrl: 'views/forms.html',
  })
  .state('app.widgets', {
    url: '/widgets',
    templateUrl: 'views/widgets.html',
  })
  .state('app.charts', {
    url: '/charts',
    templateUrl: 'views/charts.html',
    ncyBreadcrumb: {
      label: 'Charts'
    }
  })
}]);
