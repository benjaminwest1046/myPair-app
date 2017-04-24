(function () {
  'use strict';

  angular
    .module('pairsApp')
    .controller('pairCtrl', pairCtrl);
    
    function pairCtrl(_pairService_, $http, $state) {
        var pairService = _pairService_;
        var vmPairs = this;
        vmPairs.developers = [
            {name: "Benjamin"},
            {name: "Ryan"},
            {name: "Chad"},
            {name: "Patrick"},
            {name: "Matt"},
            {name: "Joe"},
            {name: "Yash"},
            {name: "Paige"},
            {name: "Francisco"},
        
        ];
        vmPairs.day = {
          date: '',
          pairs: []
        };        
        vmPairs.selectedPairs = [];
        vmPairs.confirmVisible = false;
        vmPairs.handleClick = handleClick;
        vmPairs.confirmPair = confirmPair;
        vmPairs.currentSelectedPair;

        init();

        function init() {
          getPairs().then(function(pairGroups) {
            vmPairs.pairGroups = pairGroups;
          });
        }

        //Data calls
        function getPairs() {
          return pairService.getPairs()
          .then(res => {
            return res.data;
          })
        }

        function handleClick(developer) {
            developer.selected = !developer.selected;
            vmPairs.currentSelectedPair = _.filter(vmPairs.developers, {'selected': true});
            console.log(vmPairs.currentSelectedPair);
        }
        
        function confirmPair() {
            console.log(vmPairs.currentSelectedPair)
            vmPairs.selectedPairs.push(vmPairs.currentSelectedPair);
            vmPairs.currentSelectedPair.length = 0;
            vmPairs.developers.forEach(function(developer) {
                developer.selected = false;
            })
        }
        
    
    }
})();
