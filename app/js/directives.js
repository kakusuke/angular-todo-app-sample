'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('contenteditable', function() {
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        ctrl.$render = function(){
          elm.html(ctrl.$modelValue);
        };

        elm.bind('blur', function(){
          scope.$apply(function(){
            ctrl.$setViewValue(elm.html());
          });
        });
      }
    };
  });
