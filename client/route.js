angular.module('pairsApp', ['ui.router', 'ngResource']);
console.log('router');
angular.module('pairsApp')
.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('pair', {
      url: '/pairs',
      templateUrl: 'views/pairs.html',
      controller: 'pairCtrl as vmPairs'
  });
});
