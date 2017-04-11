angular.module('pairsApp', ['ui.router', 'ngResource']);
angular.module('pairsApp')
.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/pairs');
  $stateProvider
    .state('pair', {
      url: '/pairs',
      templateUrl: 'views/pairs.html',
      controller: 'pairCtrl as vmPairs'
  })
    .state('new', {
      url: '/pairs/new',
      templateUrl: 'views/new_pair.html',
      controller: 'pairCtrl as vmPairs'
    });

});
