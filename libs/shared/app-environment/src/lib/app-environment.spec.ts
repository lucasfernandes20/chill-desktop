import { appEnvironment } from './app-environment';

describe('appEnvironment', () => {
  it('should work', () => {
    expect(appEnvironment()).toEqual('app-environment');
  });
});
