(function () {
  'use strict';

  angular
  .module('pairsApp')
  .controller('developerCtrl', developerCtrl);

  function developerCtrl(_developerService_) {
    var developerService = _developerService_;
    var vmDevelopers = this;

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






  }
})();
