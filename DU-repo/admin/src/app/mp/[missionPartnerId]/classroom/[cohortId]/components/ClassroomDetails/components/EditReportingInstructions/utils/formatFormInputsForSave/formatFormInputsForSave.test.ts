import { FORM_INPUTS } from '../../EditReportingInstructions.types';
import { formatFormInputsForSave } from '.';
import type { FormatFormDataForSave } from './formatFormInputsForSave';

describe('formatFormInputsForSave', () => {
  const getMockFormData = (): FormatFormDataForSave => ({
    formData: {
      [FORM_INPUTS.START_DATE]: '2024-11-29',
      [FORM_INPUTS.END_DATE]: '2024-11-30',
      [FORM_INPUTS.MEETING_DETAILS]: 'Mock Meeting Details',
      [FORM_INPUTS.MEETING_LOCATION]: 'Mock Meeting Location'
    }
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('formats the form data as expected', () => {
    // Override offset for CI (given the date inputs, T = 00:00:00)
    const mockTimezoneOffset = 120;
    jest
      .spyOn(Date.prototype, 'getTimezoneOffset')
      .mockReturnValue(mockTimezoneOffset);

    const formData = getMockFormData();
    const actual = formatFormInputsForSave(formData);
    const expected = {
      location: 'Mock Meeting Location',
      meetingDetails: 'Mock Meeting Details',
      meetingEndDate: '2024-11-30T02:00:00.000Z',
      meetingStartDate: '2024-11-29T02:00:00.000Z'
    };

    expect(actual).toEqual(expected);
  });
});
