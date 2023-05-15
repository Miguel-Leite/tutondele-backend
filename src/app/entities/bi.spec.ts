import { Bi } from './bi';

describe('BI', () => {
  it('should be able to create person bi', () => {
    const bi = new Bi('009899308LA049');
    expect(bi).toBeTruthy();
  });

  it('should be able to create person bi with bi invalid', () => {
    expect(() => new Bi('009899308LA04')).toBeTruthy();
  });
});
