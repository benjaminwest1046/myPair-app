(function () {
  'use strict';

  angular
    .module('pairsApp')
    .controller('createPairGroupCtrl', createPairGroupCtrl);

    function createPairGroupCtrl(_pairGroupService_, $http, $state, _developerService_) {
        var pairGroupService = _pairGroupService_,
            developerService = _developerService_,
            vmCreatePairGroups = this;
            vmCreatePairGroups.pairGroup = {
              date: '1/1/2012',
              pairs: []
            };

        vmCreatePairGroups.handleClick = handleClick;
        vmCreatePairGroups.removePair = removePair;
        vmCreatePairGroups.savePairGroup = savePairGroup;

        init();

        function init() {
            setup();
        }

        function setup() {
          developerService.getDevelopers().then(function(response){
            vmCreatePairGroups.developers = response.data;
            vmCreatePairGroups.developers = _.filter(vmCreatePairGroups.developers, function(o) {
              return o.name !== null;
            });
            vmCreatePairGroups.developers.sort();
          });
        }

        function handleClick(index) {
          vmCreatePairGroups.developers[index].selected = !vmCreatePairGroups.developers[index].selected;
          var selectedDevelopers = _.filter(vmCreatePairGroups.developers, function(developer){
            return developer.selected === true;
          });

          if(selectedDevelopers.length >= 2) {
            var pair = {
              anchor: selectedDevelopers[0],
              developer: selectedDevelopers[1],
            }
            vmCreatePairGroups.pairGroup.pairs.push(pair);
            _.remove(vmCreatePairGroups.developers, function(developer) {
              return developer.selected;
            });
            if (vmCreatePairGroups.developers.length === 1) {

              vmCreatePairGroups.developers[0].selected === !vmCreatePairGroups.developers[0].selected;
                console.log(vmCreatePairGroups.developers[0]);
              var selectedDevelopers = _.filter(vmCreatePairGroups.developers, function(developer){
                return developer.selected === true;
              });
              var pair = {
                anchor: selectedDevelopers[0],
                developer: {name: "All alone"}
              }
              vmCreatePairGroups.pairGroup.pairs.push(pair);
              _.remove(vmCreatePairGroups.developers, function(developer) {
                return developer.selected;
              });
            }
          }
        }

        function removePair(pair) {
          pair.forEach(function(developer) {
            developer.selected = false;
            vmCreatePairGroups.developers.push(developer)
          });
          var pairIndex = vmCreatePairGroups.pairGroup.pairs.indexOf(pair);
          vmCreatePairGroups.pairGroup.pairs.splice(pairIndex, 1);
        }

        function assignLastPair() {
          if (vmCreatePairGroups.developers.length < 3) {
              vmCreatePairGroups.developers.forEach(function(developer) {
                developer.selected = true;
              });
          }
        }

        function savePairGroup() {
          pairGroupService.createPairGroup(vmCreatePairGroups.pairGroup).then(function(response) {
            $state.go('pairs');
          })
        }
    }
})();

// TODO: Name everything correctly
// TODO: Automatically assign the last pair
// TODO: write a function to determine image