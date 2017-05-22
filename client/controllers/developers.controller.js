(function () {
  'use strict';

  angular
  .module('pairsApp')
  .controller('developerCtrl', developerCtrl);

  function developerCtrl(_developerService_) {
    var developerService = _developerService_;
    var vmDevelopers = this;

    vmDevelopers.saveDevelopers = saveDevelopers;

    vmDevelopers.developers = [];
    vmDevelopers.developer = {
      name: '',
      slack_name: '',
      avatar_url: ''
    };

    init();

    function init() {
      getDevelopers().then(function(developers) {
        vmDevelopers.developers = developers;
      });
    }

    function getDevelopers() {
      return developerService.getDevelopers()
      .then(res => {
        return res.data;
      });
    }

    function toggleEdit(row) {
      console.log(row);
      vmDevelopers.developers[row].editing = !vmDevelopers.developers[row].editing;
    }

    function saveDevelopers() {
      vmDevelopers.developers.forEach(function(developer) {
        developerService.updateDeveloper(developer);
      })
    }


//have listener that can tell if an edit has been made
//pop a save button when changes have been made
//submit with a a put for the changed element




  }
})();
