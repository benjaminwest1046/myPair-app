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
    vmDevelopers.avatarUpload = avatarUpload;

    vmDevelopers.developers = [];
    var developerModel = {
      name: null,
      slack_name: null,
      avatar_url: '',
      avatar: '',
      avatarCropped: ''
    };

    init();

    function init() {
      getDevelopers();
    }

    function getDevelopers() {
      return developerService.getDevelopers()
      .then(function(res) {
        return vmDevelopers.developers = _.sortBy(res.data, function(o) {
          if (o.name !== undefined || o.name !== null || o.name !== "") {
            return o.name;
          }
        })
        })
        .then(function(developers) {
          var noNameDeveloper = _.filter(developers, function(d) {
            return d.name === 'None';
          });
          if(noNameDeveloper.length === 0) {
            developerService.updateDeveloper({
                name: 'None',
                slack_name: 'None',
                avatar_url: 'https://pbs.twimg.com/profile_images/1594918277/image_400x400.jpg'
              }).then(function(developer) {
                vmDevelopers.developers.push(developer);
                return vmDevelopers.developers;
              });
          }
        })

    }

    function newDeveloper() {
      var newDeveloper = angular.copy(developerModel)
      vmDevelopers.developers.push(newDeveloper);
    }

    function saveDevelopers() {
      var promises = [];
      var incompleteDevelopers = _.filter(vmDevelopers.developers, function(o) {
        return o.name === null || o.slack_name === null
      });
      if (incompleteDevelopers.length > 1) {
        console.log('no');
      } else {
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

    }

    function deleteDeveloper(id) {
      console.log('going', id)
      return developerService.deleteDeveloper(id)
      .then(res => {
        return getDevelopers();
      });
    }

    function determineIfNewDeveloperNeeded() {
      var lastDeveloper = vmDevelopers.developers.slice(-1)[0];
      if (lastDeveloper.name && lastDeveloper.slack_name) {
        newDeveloper();
      }
    }

    var client = filestack.init('A8OZDrGQeqMiPGVr7wNAwz');

    function avatarUpload(index) {
        client.pick({
        }).then(function(result) {
          vmDevelopers.developers[index].avatar_url = result.filesUploaded[0].url;
          $scope.$apply();
          console.log(result.filesUploaded)
          console.log(vmDevelopers.developers[index]);
        });
    }

  }
})();
