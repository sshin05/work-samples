import { useFormReducer } from '@/hooks/useFormReducer/useFormReducer';

it('should handle onChange type', () => {
  const action = {
    type: 'onChange',
    payload: {
      key: 'key1',
      value: 'newValue'
    }
  };

  const response = useFormReducer({ key1: 'value1' }, action);
  expect(response).toEqual({ key1: 'newValue' });
});

it('should return state on any other type', () => {
  const action = {
    type: 'notHandledType',
    payload: {
      key: 'key1',
      value: 'newValue'
    }
  };

  expect(useFormReducer({ key1: 'value1' }, action)).toEqual({
    key1: 'value1'
  });
});
