(function () {
  'use strict';

  angular
  .module('pairsApp')
  .factory('pairService', pairService);

  function pairService($http) {
    return {
      getPairs:   getPairs,
      getPair:    getPair,
      createPair: createPair,
      updatePair: updatePair,
      deletePair: deletePair
    };

    function getPairs() {
      return $http.get('/pairs');
    }

    function getPair(id) {
      return $http.get('/pairs'/ + id);
    }

    function createPair(pair) {
      return $http.post('/pairs', pair);
    }

    function updatePair(pair) {
      return $http.put('/pairs/' + goal._id, goal)
    }

    function deletePair(pair) {
      return $http.delete('/pairs/' + pair._id)
    }
      
    function getDevelopers() {
        return $http.get('')
    }
  }
})();
