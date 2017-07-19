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
              anchor: selectedDevelopers[0].name,
              developer: selectedDevelopers[1].name,
            }
            vmCreatePairGroups.pairGroup.pairs.push(pair);
            _.remove(vmCreatePairGroups.developers, function(developer) {
              return developer.selected;
            });
          }
            console.log(vmCreatePairGroups.pairGroup.pairs);
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
          console.log("calling controller");
          pairGroupService.createPairGroup(vmCreatePairGroups.pairGroup).then(function(response) {
            console.log(response);
            $state.go('pairs');
          })
        }
    }
})();

// TODO: Name everything correctly
// TODO: Automatically assign the last pair
