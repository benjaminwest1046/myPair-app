(function () {
  'use strict';

  angular
  .module('pairsApp')
  .controller('developerCtrl', developerCtrl);

  function developerCtrl(_developerService_, $q, ngToast, $scope) {
    var developerService = _developerService_;
    var vmDevelopers = this;

    vmDevelopers.saveDevelopers = saveDevelopers;
    vmDevelopers.newDeveloper = newDeveloper;
    vmDevelopers.deleteDeveloper = deleteDeveloper;
    vmDevelopers.determineIfNewDeveloperNeeded = determineIfNewDeveloperNeeded;

    vmDevelopers.developers = [];
    var developerModel = {
      name: '',
      slack_name: '',
      avatar_url: '',
      avatar: ''
    };

    init();

    function init() {
      getDevelopers();
    }

    function getDevelopers() {
      return developerService.getDevelopers()
      .then(res => {
        return vmDevelopers.developers = _.sortBy(res.data, ['name', 'slack_name']);
      });
    }

    function newDeveloper() {
      var newDeveloper = angular.copy(developerModel)
      vmDevelopers.developers.push(newDeveloper);
    }

    function saveDevelopers() {
      var promises = [];
      vmDevelopers.developers.forEach(function(developer) {
        var promise = developerService.updateDeveloper(developer);
        promises.push(promise);
      });
      return $q.all(promises).then(function() {
        ngToast.create({
          className: 'warning',
          content: '<a href="#" class="">a message</a>'
        });
        return getDevelopers()
      });
    }

    function deleteDeveloper(id) {
      return developerService.deleteDeveloper(id)
      .then(res => {
        return getDevelopers();
      });
    }

    function determineIfNewDeveloperNeeded() {
      var lastDeveloper = vmDevelopers.developers.slice(-1)[0];
      console.log(lastDeveloper);
      if (lastDeveloper.name && lastDeveloper.slack_name) {
        newDeveloper();
      }
    }


//DONE: Have a button to add a new developer at the end
//TODO: Only call save if the required fields are poplulated
//TODO: Highlight in red if fields are not poplulated
//TODO: Hook up the image upload
//TODO: Have the save button pop when changes are made
//TODO: display placeholder if no picture is present
//TODO: Automatically add the new space





  }
})();
