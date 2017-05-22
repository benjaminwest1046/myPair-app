angular.module('pairsApp', ['ui.router', 'ngResource', 'xeditable']);
angular.module('pairsApp')
.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/pairs');
  $stateProvider
    .state('pairs', {
      url: '/pairs',
      templateUrl: 'views/pairs.html',
      controller: 'pairCtrl as vmPairs'
  })
    .state('newPair', {
      url: '/pairs/new',
      templateUrl: 'views/new_pair.html',
      controller: 'pairCtrl as vmPairs'
    })
    .state('developers', {
      url: '/developers',
      templateUrl: 'views/developers.html',
      controller: 'developerCtrl as vmDevelopers'
    });

});
