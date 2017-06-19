angular.module('pairsApp', ['ui.router', 'ngResource', 'ngToast']);
angular.module('pairsApp')
.config(function ($stateProvider, $urlRouterProvider) {
  // $urlRouterProvider.otherwise('/pairs');
  $stateProvider
    .state('pairs', {
      url: '/pairs',
      templateUrl: 'pairs.html',
      controller: 'pairCtrl as vmPairs'
  })
    .state('newPair', {
      url: '/pairs/new',
      templateUrl: '../pairGroup/new_pair.html',
      controller: 'pairCtrl as vmPairs'
    })
    .state('developers', {
      url: '/developers',
      templateUrl: '../developer/developers.html',
      controller: 'developerCtrl as vmDevelopers'
    });

});
