'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {
  var elm, scope;

  beforeEach(module('myApp.directives'));

  beforeEach(inject(function($rootScope, $compile) {
    elm = angular.element('<span contenteditable="true" ng-model="text"></span>');
    scope = $rootScope;
    $compile(elm)(scope);
  }));

  describe('contenteditable', function() {
    it('モデルにバインドする', function() {
      scope.$apply(function() {
        scope.text = '<b>文字列</b>';
      });

      expect(elm.html()).toBe('<b>文字列</b>');
    });

    it('blurイベント時、モデルの内容をアップデートする', function() {
      elm.html('<i>変更</i>');
      elm.triggerHandler('blur');
      expect(scope.text).toBe('<i>変更</i>');
    });
  });
});
