(function () {
  'use strict';

  angular
    .module('pairsApp')
    .controller('pairCtrl', pairCtrl);

    function pairCtrl(_pairService_, $http, $state) {
        var pairService = _pairService_;
        var vmPairs = this;
        vmPairs.newPair = newPair;
        vmPairs.handleClick = handleClick;
        vmPairs.developers = [
         "Benjamin", "Chad"
        ]
        
        vmPairs.pair = {
          date: '',
          pairs: []
        }
        vmPairs.pairs = [];

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

        function newPair() {
            vmPairs.pair.pairs.push(vmPairs.pairs)  
            console.log(vmPairs.pair)

          pairService.createPair(vmPairs.pair).then(function(res) {
            $state.go('pair')
          })
        }

        function handleClick(developer) {
            developer.selected = !developer.selected;
            console.log(vmPairs.developers);
        }
    }
})();
