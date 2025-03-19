import { eventPreventDefaultOnReturn } from '@/utils/event-prevent-default-on-return';

const mockKey = jest.fn();
const mockPreventDefault = jest.fn();
const mockEvent = jest.fn(() => ({
  key: mockKey(),
  preventDefault: mockPreventDefault
}));

describe('checkKeyDown', () => {
  mockKey.mockImplementationOnce(() => 'f');
  it('should not call event.preventDefault when anything but return is hit', () => {
    eventPreventDefaultOnReturn(mockEvent());

    expect(mockPreventDefault).not.toHaveBeenCalled();
  });

  it('should call event.preventDefault when anything but return is hit', () => {
    mockKey.mockImplementationOnce(() => 'Enter');
    eventPreventDefaultOnReturn(mockEvent());

    expect(mockPreventDefault).toHaveBeenCalled();
  });
});
