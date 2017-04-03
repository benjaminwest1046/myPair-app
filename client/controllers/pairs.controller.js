(function () {
  'use strict';

  angular
    .module('pairsApp')
    .controller('pairCtrl', pairCtrl);

    function pairCtrl(_pairService_, $http) {
      var pairService = _pairService_;
      var vmPairs = this;



    init();
    function init() {
    getPairs().then(function(pairs) {
      vmPairs.pairs = pairs;
    })
    }

    function getPairs() {
      return pairService.getPairs()
      .then(res => {
        return res.data;
      })
    }

    }
})();
