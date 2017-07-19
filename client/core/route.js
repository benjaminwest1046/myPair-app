angular.module('pairsApp', ['ui.router', 'ngResource', 'ngToast']);
angular.module('pairsApp')
.config(function ($stateProvider, $urlRouterProvider) {
  // $urlRouterProvider.otherwise('/pairs');
  $stateProvider
    .state('pairs', {
      url: '/pairs',
      templateUrl: '../pairGroup/pairs.html',
      controller: 'pairGroupCtrl as vmPairGroups'
  })
    .state('createPairGroup', {
      url: '/pairs/new',
      templateUrl: '../pairGroup/create/createPairGroup.html',
      controller: 'createPairGroupCtrl as vmCreatePairGroups'
    })
    .state('developers', {
      url: '/developers',
      templateUrl: '../developer/developers.html',
      controller: 'developerCtrl as vmDevelopers'
    });

});
