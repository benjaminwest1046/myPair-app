(function () {
  'use strict';

  angular
    .module('pairsApp')
    .controller('pairCtrl', pairCtrl);

    function pairCtrl(_pairService_, $http, $state) {
      var pairService = _pairService_;
      var vmPairs = this;
      vmPairs.newPair = newPair;
    vmPairs.pair = {
      date: '',
      pairs: []
    }

    init();
    function init() {
      getPairs().then(function(pairs) {
        vmPairs.pairs = pairs;
      });
    }

    function getPairs() {
      return pairService.getPairs()
      .then(res => {
        return res.data;
      })
    }

    function newPair(pair) {
      console.log('newPair function')
      pairService.createPair(pair).then(function(res) {
        $state.go('pairs')
      })
    }


    }
})();
