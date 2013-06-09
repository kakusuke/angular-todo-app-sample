'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
    localStorage.clear();
  });

  it('location hash/fragment が空だった場合、自動的に / にリダイレクトする', function() {
    expect(browser().location().url()).toBe("/");
  });

  describe('mainページ', function() {

    beforeEach(function() {
      browser().navigateTo('#/');
    });

    describe('初期表示の場合', function() {
      it('Todo List は空', function() {
        expect(repeater('ul li', 'todo list').count()).toBe(0);
      });
    });

    describe('Todoを追加した場合', function() {
      beforeEach(function() {
        input('text').enter('todo');
        element('form').query(function(form, done) {
          // jQuery().submit では ng-submit のイベントリスナーが動かないため、submit ボタンの click イベントを発火するようにする
          form.append('<button type="submit" id="__submit_button">');
          var button = form.find('#__submit_button');
          button.click();
          button.remove();
          done();
        });
      });

      it('Todoリストが増える', function() {
        expect(repeater('ul li', 'todo list').count()).toBe(1);
      });

      it('入力したテキストが表示される', function() {
        expect(element('ul li span', 'todo text').text()).toBe('todo');
      });

      describe('画面を再度表示した場合', function() {
        beforeEach(function() {
          browser().reload();
        });

        it('Todoの数は同じ', function() {
          expect(repeater('ul li', 'todo list').count()).toBe(1);
        });
      });

      describe('Todoにチェックを入れた場合', function() {
        beforeEach(function() {
          input('todo.done').check();
        });

        it('doneクラスが追加される', function() {
          expect(element('ul li', 'todo list').attr('class')).toContain('done');
        });

        it('リロードすると、削除が実行される', function() {
          browser().reload();
          expect(repeater('ul li', 'todo list').count()).toBe(0);
        });
      });

      describe('Todoを編集した場合', function() {
        beforeEach(function() {
          element('ul li span').query(function(elm, done) {
            elm.html('modified');
            elm.trigger('blur');
            done();
          });
        });

        it('変更が反映される', function() {
          expect(element('ul li span').text()).toBe('modified');
        });

        it('リロードすると、変更が保存される', function() {
          browser().reload();
          expect(element('ul li span').text()).toBe('modified');
        });
      });
    });

  });
});
