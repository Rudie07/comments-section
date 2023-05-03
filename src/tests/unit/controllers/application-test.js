import { module, test } from 'qunit';
import { setupTest } from 'src/tests/helpers';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import fetchMock from 'fetch-mock';
import { A } from '@ember/array';

module('Unit | Controller | application', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.controller = this.owner.lookup('controller:application');
    this.controller.set('comments', A([]));
  });

  hooks.afterEach(function () {
    fetchMock.reset();
  });

  test('it should fetch comments from the server', async function (assert) {
    fetchMock.get('http://localhost:3001/getComments', [
      {
        id: 1,
        name: 'test name',
        message: 'test message',
        created: '2022-05-03 12:30:00',
      },
    ]);
    await this.controller.fetchComments();
    assert.equal(this.controller.comments.length, 1);
    assert.deepEqual(this.controller.comments[0], {
      id: 1,
      name: 'test name',
      message: 'test message',
      created: '2022-05-03 12:30:00',
    });
  });

  test('it should get comment data', function (assert) {
    this.controller.set('currentName', 'test name');
    this.controller.set('currentMessage', 'test message');
    const result = this.controller.getCommentData();
    assert.deepEqual(result, {
      name: 'test name',
      message: 'test message',
    });
  });

  test('it should reset values', function (assert) {
    this.controller.set('currentName', 'test name');
    this.controller.set('currentMessage', 'test message');
    this.controller.resetValues();
    assert.equal(this.controller.currentName, '');
    assert.equal(this.controller.currentMessage, '');
  });

});
