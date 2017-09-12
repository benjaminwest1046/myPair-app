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
              date: moment(),
              pairs: []
            };

        vmCreatePairGroups.handleClick = handleClick;
        vmCreatePairGroups.removePair = removePair;
        vmCreatePairGroups.savePairGroup = savePairGroup;
        vmCreatePairGroups.dayOfWeek = vmCreatePairGroups.pairGroup.date.format('dddd');
        vmCreatePairGroups.noNameDeveloper;

        init();

        function init() {
            setup();
        }

        function setup() {
          //get all pairGroupService
          //filter to see if there is one with the same date
          //if so, load in the pairs and make sure that available developers is empty
          pairGroupService.getPairGroups()
          .then(function(pairGroups) {
            console.log(pairGroups);
          });

          developerService.getDevelopers().then(function(response) {
            vmCreatePairGroups.developers = response.data;
            var noNameArray = _.filter(vmCreatePairGroups.developers, function(d) {
              return d.name === 'None';
            });
            vmCreatePairGroups.noNameDeveloper = noNameArray[0];
            _.remove(vmCreatePairGroups.developers, function(d) {
              return d.name === null || d.name === 'None';
            })
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
              developer: selectedDevelopers[1]
            }
            vmCreatePairGroups.pairGroup.pairs.push(pair);
            _.remove(vmCreatePairGroups.developers, function(developer) {
              return developer.selected;
            });
            checkForLastDeveloper();
          }
        }

        function checkForLastDeveloper() {
          if(vmCreatePairGroups.developers.length == 1) {
            var pair = {
              anchor: vmCreatePairGroups.developers[0],
              developer: vmCreatePairGroups.noNameDeveloper
            }
            vmCreatePairGroups.pairGroup.pairs.push(pair);
            console.log(pair);
            console.log(vmCreatePairGroups.pairGroup.pairs);
            _.remove(vmCreatePairGroups.developers, function(developer) {
              return developer;
            })
          }
        }

        function removePair(pair) {
          pair.anchor.selected = false;
          vmCreatePairGroups.developers.push(pair.anchor);

          pair.developer.selected = false;
          vmCreatePairGroups.developers.push(pair.developer);

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
