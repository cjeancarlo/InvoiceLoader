import { PadZerosPipe } from './pad-zeros.pipe';

describe('PadZerosPipe', () => {
  it('create an instance', () => {
    const pipe = new PadZerosPipe();
    expect(pipe).toBeTruthy();
  });
});
