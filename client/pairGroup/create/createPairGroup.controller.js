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
          console.log('its being called');
          if(vmCreatePairGroups.developers.length == 1 ) {
            var pair = {
              anchor: vmCreatePairGroups.developers[0],
              developer: {name: 'None', avatar_url: 'https://pbs.twimg.com/profile_images/1594918277/image_400x400.jpg' }
            }
            vmCreatePairGroups.pairGroup.pairs.push(pair);
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

// TODO: Name everything correctly
// TODO: Automatically assign the last pair
// TODO: write a function to determine image
