import { getWinners } from './generate-winners';

describe('generateWinners', () => {
  it('should work', () => {
    expect(getWinners()).toEqual('generate-winners');
  });
});
