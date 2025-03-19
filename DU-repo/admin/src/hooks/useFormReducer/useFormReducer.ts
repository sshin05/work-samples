interface IAction {
  type: string;
  payload: any;
}

type IState = Record<string, any>;

export const useFormReducer = (state: IState, action: IAction) => {
  if (action.type === 'onChange') {
    return { ...state, [action.payload.key]: action.payload.value };
  }

  return state;
};
