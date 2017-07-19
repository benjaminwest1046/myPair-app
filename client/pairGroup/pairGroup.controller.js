(function () {
  'use strict';

  angular
    .module('pairsApp')
    .controller('pairGroupCtrl', pairGroupCtrl);

    function pairGroupCtrl(_pairGroupService_) {
        var pairGroupService = _pairGroupService_,

        vmPairGroups = this;
        vmPairGroups.pairGroups = [];

        init();

        function init() {
          getPairGroups().then(function(res) {
            console.log(vmPairGroups.pairGroups);
          })
        }

        function getPairGroups() {
          return pairGroupService.getPairGroups()
          .then(res => {
            return vmPairGroups.pairGroups = res.data;
          });
        }

}

})();
