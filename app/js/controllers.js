'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MainCtrl', function($scope, StorableList) {
    $scope.todoList = new StorableList('todoList');

    for(var i = $scope.todoList.length - 1; i >= 0; i--){
      if($scope.todoList[i].done){
        $scope.todoList.splice(i, 1);
      }
    }

    $scope.addTodo = function(){
      $scope.todoList.push({
        text: $scope.text
      });
      $scope.text = '';
    };
  });
