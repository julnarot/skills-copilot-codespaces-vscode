function skillsMember() {
  return {
    restrict: 'E',
    scope: {
      member: '='
    },
    templateUrl: 'app/views/members/member.html',
    controller: function($scope) {
      $scope.skills = $scope.member.skills;
    }
  };
}