import generateSummary from '@/utils/generate-summary';

describe('utils - generateSummary', () => {
  it('should return the string as is, if it is not longer than the passed in length', () => {
    expect(generateSummary('Hello', 150)).toEqual('Hello');
  });
  it('should return 140 characters if length is omitted', () => {
    expect(
      generateSummary(
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu'
      )
    ).toEqual(
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ma...'
    );
  });
  it('should return 25 characters', () => {
    expect(
      generateSummary(
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu',
        25
      )
    ).toEqual('Lorem ipsum dolor sit ame...');
  });
});
