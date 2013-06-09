'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  factory('StorableList', function($rootScope, $window){
    var storage = $window.localStorage;
    return function(id){
      var list = storage.getItem(id);
      list = list == null ? [] : angular.fromJson(list);

		$rootScope.$watch(function(){
        storage.setItem(id, angular.toJson(list));
		});

      return list;
    };
  });
