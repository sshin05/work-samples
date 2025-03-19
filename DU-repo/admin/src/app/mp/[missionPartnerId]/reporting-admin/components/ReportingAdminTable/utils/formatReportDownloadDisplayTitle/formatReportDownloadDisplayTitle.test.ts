import { formatReportDownloadDisplayTitle } from '.';

describe('formatReportDownloadDisplayTitle', () => {
  it('formats the title as expected', () => {
    const actual = formatReportDownloadDisplayTitle(
      'MP',
      'MOCK REPORT DOWNLOAD'
    );
    const expected = 'MP - MOCK REPORT DOWNLOAD';

    expect(actual).toBe(expected);
  });
});
