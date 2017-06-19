(function () {
  'use strict';

  angular
    .module('pairsApp')
    .controller('pairCtrl', pairCtrl);

    function pairCtrl(_pairService_, $http, $state) {
        var pairService = _pairService_;
        var vmPairs = this;
        vmPairs.availableDevelopers = [
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

        function getPairs() {
          return pairService.getPairs()
          .then(res => {
            return res.data;
          })
        }

        function handleClick(developer) {
            developer.selected = !developer.selected;
            vmPairs.currentSelectedPair = _.filter(vmPairs.availableDevelopers, {'selected': true});
        }

        function confirmPair() {
            vmPairs.selectedPairs.push(vmPairs.currentSelectedPair);
            vmPairs.availableDevelopers.forEach(function(developer) {
                developer.selected = false;
            })
            vmPairs.selectedPairs
        }



    }
})();








//when I select a developer queue an animation and mark them as selected
//when I select another developer show a confirm button
//when I click the confirm button then unselecte those two developers
//remove them from the available developer list
//add them to a selecte developer list as a pair
