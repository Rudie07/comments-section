'use strict';

define("src/tests/helpers/index", ["exports", "ember-qunit"], function (_exports, _emberQunit) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.setupApplicationTest = setupApplicationTest;
  _exports.setupRenderingTest = setupRenderingTest;
  _exports.setupTest = setupTest;
  0; //eaimeta@70e063a35619d71f0,"ember-qunit"eaimeta@70e063a35619d71f
  // This file exists to provide wrappers around ember-qunit's / ember-mocha's
  // test setup functions. This way, you can easily extend the setup that is
  // needed per test type.
  function setupApplicationTest(hooks, options) {
    (0, _emberQunit.setupApplicationTest)(hooks, options);

    // Additional setup for application tests can be done here.
    //
    // For example, if you need an authenticated session for each
    // application test, you could do:
    //
    // hooks.beforeEach(async function () {
    //   await authenticateSession(); // ember-simple-auth
    // });
    //
    // This is also a good place to call test setup functions coming
    // from other addons:
    //
    // setupIntl(hooks); // ember-intl
    // setupMirage(hooks); // ember-cli-mirage
  }

  function setupRenderingTest(hooks, options) {
    (0, _emberQunit.setupRenderingTest)(hooks, options);

    // Additional setup for rendering tests can be done here.
  }

  function setupTest(hooks, options) {
    (0, _emberQunit.setupTest)(hooks, options);

    // Additional setup for unit tests can be done here.
  }
});
define("src/tests/integration/helpers/date-converter-test", ["@ember/template-factory", "qunit", "src/tests/helpers", "@ember/test-helpers"], function (_templateFactory, _qunit, _helpers, _testHelpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"src/tests/helpers",0,"@ember/test-helpers",0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Helper | date-converter', function (hooks) {
    (0, _helpers.setupRenderingTest)(hooks);

    // TODO: Replace this with your real tests.
    (0, _qunit.test)('it renders', async function (assert) {
      this.set('inputValue', '1234');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{date-converter this.inputValue}}
      */
      {
        "id": "AQqp7yXn",
        "block": "[[[1,[28,[35,0],[[30,0,[\"inputValue\"]]],null]]],[],false,[\"date-converter\"]]",
        "moduleName": "C:\\Users\\rudhr\\OneDrive\\Documents\\Comments-section\\src\\src\\tests\\integration\\helpers\\date-converter-test.js",
        "isStrictMode": false
      }));
      assert.dom(this.element).hasText('1234');
    });
  });
});
define("src/tests/test-helper", ["src/app", "src/config/environment", "qunit", "@ember/test-helpers", "qunit-dom", "ember-qunit"], function (_app, _environment, QUnit, _testHelpers, _qunitDom, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"src/app",0,"src/config/environment",0,"qunit",0,"@ember/test-helpers",0,"qunit-dom",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _qunitDom.setup)(QUnit.assert);
  (0, _emberQunit.start)();
});
define("src/tests/unit/controllers/application-test", ["qunit", "src/tests/helpers", "@ember/test-helpers", "ember-qunit", "fetch-mock", "@ember/array"], function (_qunit, _helpers, _testHelpers, _emberQunit, _fetchMock, _array) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"src/tests/helpers",0,"@ember/test-helpers",0,"ember-qunit",0,"ember-cli-htmlbars",0,"fetch-mock",0,"@ember/array"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Controller | application', function (hooks) {
    (0, _helpers.setupTest)(hooks);
    hooks.beforeEach(function () {
      this.controller = this.owner.lookup('controller:application');
      this.controller.set('comments', (0, _array.A)([]));
    });
    hooks.afterEach(function () {
      _fetchMock.default.reset();
    });
    (0, _qunit.test)('it should fetch comments from the server', async function (assert) {
      _fetchMock.default.get('http://localhost:3001/getComments', [{
        id: 1,
        name: 'test name',
        message: 'test message',
        created: '2022-05-03 12:30:00'
      }]);
      await this.controller.fetchComments();
      assert.equal(this.controller.comments.length, 1);
      assert.deepEqual(this.controller.comments[0], {
        id: 1,
        name: 'test name',
        message: 'test message',
        created: '2022-05-03 12:30:00'
      });
    });
    (0, _qunit.test)('it should get comment data', function (assert) {
      this.controller.set('currentName', 'test name');
      this.controller.set('currentMessage', 'test message');
      const result = this.controller.getCommentData();
      assert.deepEqual(result, {
        name: 'test name',
        message: 'test message'
      });
    });
    (0, _qunit.test)('it should reset values', function (assert) {
      this.controller.set('currentName', 'test name');
      this.controller.set('currentMessage', 'test message');
      this.controller.resetValues();
      assert.equal(this.controller.currentName, '');
      assert.equal(this.controller.currentMessage, '');
    });
  });
});
define('src/config/environment', [], function() {
  var prefix = 'src';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('src/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
