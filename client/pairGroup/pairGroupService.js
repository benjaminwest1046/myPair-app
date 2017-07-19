(function () {
  'use strict';

  angular
  .module('pairsApp')
  .factory('pairGroupService', pairGroupService);

  function pairGroupService($http) {
    return {
      getPairGroups:   getPairGroups,
      getPairGroup:    getPairGroup,
      createPairGroup: createPairGroup,
      updatePairGroup: updatePairGroup,
      deletePairGroup: deletePairGroup
    };

    function getPairGroups() {
      return $http.get('/pairs');
    }

    function getPairGroup(id) {
      return $http.get('/pairs'/ + id);
    }

    function createPairGroup(pairGroup) {
      return $http.post('/pairs', pairGroup);
    }

    function updatePairGroup(pair) {
      return $http.put('/pairs/' + goal._id, goal)
    }

    function deletePairGroup(pair) {
      return $http.delete('/pairs/' + pair._id)
    }

  }
})();
