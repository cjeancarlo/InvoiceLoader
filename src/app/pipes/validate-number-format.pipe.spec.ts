import { ValidateNumberFormatPipe } from './validate-number-format.pipe';

describe('ValidateNumberFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new ValidateNumberFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
