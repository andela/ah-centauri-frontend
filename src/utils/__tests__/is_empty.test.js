import expect from 'expect';
import isEmpty from '../is_empty';

describe('Testing is_Empty file::', () => {
  it(' isEmpty function is called', () => {
    const emptyObject = isEmpty({});
    const emptyList = isEmpty([]);
    const notEmptyList = isEmpty(['test', 'test2']);

    expect(emptyObject)
      .toBe(true);
    expect(emptyList)
      .toBe(true);
    expect(notEmptyList)
      .toBe(false);
  });
});
