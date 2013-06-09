'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('myApp'));

  describe('MainCtrl', function($controller){
    var MainCtrl, StorableListMock, scope;

    StorableListMock = function() {
      var list = [{done: true}, {done: false}, {done: true}];
      list.constructorName = 'StorableList';
      list.save = function() {};
      return list;
    };

    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      MainCtrl = $controller('MainCtrl', {
        StorableList: StorableListMock,
        $scope: scope
      });
    }));

    it('todoListにStorableListを代入する', function(){
      expect(scope.todoList.constructorName).toBe('StorableList');
    });

    it('todo.doneの要素を削除する', function() {
      expect(scope.todoList.length).toBe(1);
    });

    it('addTodoメソッドを代入する', function() {
      expect(typeof scope.addTodo).toBe('function');
    });

    describe('scope.addTodo', function() {
      beforeEach(function() {
        scope.todoList = [];
      });

      it('新しいtodoを追加する', function() {
        scope.text = 'foo';
        scope.addTodo();
        expect(scope.todoList).toEqual([{text: 'foo'}]);
      });

      it('scope.textをクリアする', function() {
        scope.text = 'foo';
        scope.addTodo();
        expect(scope.text).toBe('');
      });

    });
  });
});
