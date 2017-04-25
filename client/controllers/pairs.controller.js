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
            {name: "Chad", img: "/assets/chad.jpeg"},
            {name: "Patrick", img: "/assets/patrick.jpg"},
            {name: "Matt", img: "/assets/matt.jpg"},
            {name: "Joe", img: "/assets/joe.jpg"},
            {name: "Yash", img: "/assets/yash.jpg"},
            {name: "Paige", img: "/assets/paige.png"},
            {name: "Francisco", img: "/assets/francisco.jpg"},
        
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
