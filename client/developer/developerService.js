(function() {
  'use strict';

  angular
  .module('pairsApp')
  .factory('developerService', developerService);

  function developerService($http) {
    return {
      getDevelopers:   getDevelopers,
      createDeveloper: createDeveloper,
      updateDeveloper: updateDeveloper,
      deleteDeveloper: deleteDeveloper
    }

    function getDevelopers() {
      return $http.get('/developers');
    }

    function createDeveloper(developer) {
      return $http.post('/developers', developer);
    }

    function updateDeveloper(developer) {
      return $http.put('/developers/' + developer._id, developer);
    }

    function deleteDeveloper(id) {
      return $http.delete('/developers/' + id);
    }

  }

})();
