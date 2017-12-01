import api from '../../src/api/index';
import expect from 'expect';
import { removeSync, outputFileSync } from 'fs-extra';
import { join, dirname } from 'path';

describe('api/models', () => {

  const filePath = './tmp/a.js';
  const absFilePath = join(__dirname, filePath);

  afterEach(() => {
     removeSync(dirname(absFilePath));
  });

  it('models.create', () => {
    const result = api('models.create', {
      filePath: filePath,
      sourcePath: __dirname,
      namespace: 'a',
    });
    expect(result).toEqual(
      {"models":{"data":[{"reducers":[],"effects":[],"subscriptions":[],"namespace":"a","state":{},"id":"Model^^./tmp/a.js^^a","filePath":"./tmp/a.js"}],"reducerByIds":{},"effectByIds":{},"subscriptionByIds":{}},"router":null,"routeComponents":[],"dispatches":{}}
    );
  });

  it('models.updateNamespace', () => {
    const source = `
      export default {
        namespace: 'count',
        state: 0,
      };
    `;
    outputFileSync(absFilePath, source, 'utf-8');
    const result = api('models.updateNamespace', {
      filePath,
      sourcePath: __dirname,
      namespace: 'count',
      newNamespace: 'newCount',
    });
    expect(result).toEqual(
      {"models":{"data":[{"reducers":[],"effects":[],"subscriptions":[],"namespace":"newCount","state":0,"id":"Model^^./tmp/a.js^^newCount","filePath":"./tmp/a.js"}],"reducerByIds":{},"effectByIds":{},"subscriptionByIds":{}},"router":null,"routeComponents":[],"dispatches":{}}
    );
  });

  it('models.updateState', () => {
    const source = `
      export default {
        namespace: 'count',
        state: 0,
      };
    `;
    outputFileSync(absFilePath, source, 'utf-8');
    const result = api('models.updateState', {
      filePath,
      sourcePath: __dirname,
      namespace: 'count',
      source: '{ a: 1 }',
    });
    expect(result).toEqual(
      {"models":{"data":[{"reducers":[],"effects":[],"subscriptions":[],"namespace":"count","state":{"a":1},"id":"Model^^./tmp/a.js^^count","filePath":"./tmp/a.js"}],"reducerByIds":{},"effectByIds":{},"subscriptionByIds":{}},"router":null,"routeComponents":[],"dispatches":{}}
    );
  });

  it('models.addReducer', () => {
    const source = `
      export default {
        namespace: 'count',
        state: 0,
      };
    `;
    outputFileSync(absFilePath, source, 'utf-8');
    const result = api('models.addReducer', {
      filePath,
      sourcePath: __dirname,
      namespace: 'count',
      name: 'add',
      source: '1',
    });
    expect(result).toEqual(
      { dispatches: { 'count/add': { input: [], output: [ 'Reducer^^./tmp/a.js^^add' ] } }, models: { data: [ { effects: [], filePath: './tmp/a.js', id: 'Model^^./tmp/a.js^^count', namespace: 'count', reducers: [ 'Reducer^^./tmp/a.js^^add' ], state: 0, subscriptions: [] } ], effectByIds: {}, reducerByIds: { 'Reducer^^./tmp/a.js^^add': { filePath: './tmp/a.js', id: 'Reducer^^./tmp/a.js^^add', modelId: 'Model^^./tmp/a.js^^count', name: 'add', source: '1' } }, subscriptionByIds: {} }, routeComponents: [], router: null }
    );
  });

  it('models.addEffect', () => {
    const source = `
      export default {
        namespace: 'count',
        state: 0,
      };
    `;
    outputFileSync(absFilePath, source, 'utf-8');
    const result = api('models.addEffect', {
      filePath,
      sourcePath: __dirname,
      namespace: 'count',
      name: 'addRemote',
      source: '1',
    });
    expect(result).toEqual(
      { dispatches: { 'count/addRemote': { input: [], output: [ 'Effect^^./tmp/a.js^^addRemote' ] } }, models: { data: [ { effects: [ 'Effect^^./tmp/a.js^^addRemote' ], filePath: './tmp/a.js', id: 'Model^^./tmp/a.js^^count', namespace: 'count', reducers: [], state: 0, subscriptions: [] } ], effectByIds: { 'Effect^^./tmp/a.js^^addRemote': { dispatches: [], filePath: './tmp/a.js', id: 'Effect^^./tmp/a.js^^addRemote', modelId: 'Model^^./tmp/a.js^^count', name: 'addRemote', source: '1' } }, reducerByIds: {}, subscriptionByIds: {} }, routeComponents: [], router: null }
    );
  });

  it('models.addSubscription', () => {
    const source = `
      export default {
        namespace: 'count',
        state: 0,
      };
    `;
    outputFileSync(absFilePath, source, 'utf-8');
    const result = api('models.addSubscription', {
      filePath,
      sourcePath: __dirname,
      namespace: 'count',
      name: 'setup',
      source: '1',
    });
    expect(result).toEqual(
      { dispatches: {}, models: { data: [ { effects: [], filePath: './tmp/a.js', id: 'Model^^./tmp/a.js^^count', namespace: 'count', reducers: [], state: 0, subscriptions: [ 'Subscription^^./tmp/a.js^^setup' ] } ], effectByIds: {}, reducerByIds: {}, subscriptionByIds: { 'Subscription^^./tmp/a.js^^setup': { dispatches: [], filePath: './tmp/a.js', id: 'Subscription^^./tmp/a.js^^setup', modelId: 'Model^^./tmp/a.js^^count', name: 'setup', source: '1' } } }, routeComponents: [], router: null }
    );
  });

  it('models.updateReducer', () => {
    const source = `
      export default {
        namespace: 'count',
        state: 0,
        reducers: { a: 1 }
      };
    `;
    outputFileSync(absFilePath, source, 'utf-8');
    const result = api('models.updateReducer', {
      filePath,
      sourcePath: __dirname,
      namespace: 'count',
      name: 'a',
      source: '2',
    });
    expect(result).toEqual(
      { dispatches: { 'count/a': { input: [], output: [ 'Reducer^^./tmp/a.js^^a' ] } }, models: { data: [ { effects: [], filePath: './tmp/a.js', id: 'Model^^./tmp/a.js^^count', namespace: 'count', reducers: [ 'Reducer^^./tmp/a.js^^a' ], state: 0, subscriptions: [] } ], effectByIds: {}, reducerByIds: { 'Reducer^^./tmp/a.js^^a': { filePath: './tmp/a.js', id: 'Reducer^^./tmp/a.js^^a', modelId: 'Model^^./tmp/a.js^^count', name: 'a', source: '2' } }, subscriptionByIds: {} }, routeComponents: [], router: null }
    );
  });

  it('models.removeReducer', () => {
    const source = `
      export default {
        namespace: 'count',
        state: 0,
        reducers: { a: 1 }
      };
    `;
    outputFileSync(absFilePath, source, 'utf-8');
    const result = api('models.removeReducer', {
      filePath,
      sourcePath: __dirname,
      namespace: 'count',
      name: 'a',
    });
    expect(result).toEqual(
      {"models":{"data":[{"reducers":[],"effects":[],"subscriptions":[],"namespace":"count","state":0,"id":"Model^^./tmp/a.js^^count","filePath":"./tmp/a.js"}],"reducerByIds":{},"effectByIds":{},"subscriptionByIds":{}},"router":null,"routeComponents":[],"dispatches":{}}
    );
  });
});
