'use strict';

/* jasmine specs for services go here */

describe('service', function() {
  beforeEach(module('myApp.services'));

  describe('StorableList', function() {
    var list, storage, StorableList, $rootScope;

    beforeEach(inject(function(_StorableList_, _$rootScope_, $window) {
      StorableList = _StorableList_;
		$rootScope = _$rootScope_;
      storage = $window.localStorage;
      storage.clear();
    }));

    describe('#new', function() {
      describe('保存されているデータがない場合', function() {
        beforeEach(function (){
            storage.clear();
            list = new StorableList('id');
        });

        it('空配列を返す', function() {
          expect(list.length).toEqual(0);
        });
      });

      describe('保存されているデータがある場合', function() {
        beforeEach(function (){
            storage.setItem('id', '["data"]');
            list = new StorableList('id');
        });

        it('保存された配列を返す', function() {
          expect(list.length).toEqual(1);
        });
      });
    });

    describe('autosave機能', function() {
      beforeEach(function() {
        list = new StorableList('id');
      });

      it('localStorageに保存する', function() {
        list[0] = {foo: 'bar'};
		  $rootScope.$digest();
        expect(storage.getItem('id')).toBe('[{"foo":"bar"}]');
      });
    });

  });
});
