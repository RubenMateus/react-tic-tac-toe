import { reducer } from '../reducer';
import { generateGrid } from '../../utils';

describe('reducer', () => {
  test('Should return state when status is success and type is not RESET', () => {
    const state = { status: 'success' };
    const action = { type: 'CLICK' };
    const result = reducer(state, action);

    expect(result).not.toBeNull();
    expect(result).toStrictEqual({ status: 'success' });
  });

  test('Should return state when type does not exist', () => {
    const state = { status: 'success' };
    const action = { type: 'TEST' };
    const result = reducer(state, action);

    expect(result).not.toBeNull();
    expect(result).toStrictEqual({ status: 'success' });
  });

  test('Should return initialState when type is RESET', () => {
    const action = { type: 'RESET' };
    const result = reducer({}, action);

    expect(result).not.toBeNull();
    expect(result).toStrictEqual({
      grid: generateGrid(3, 3, () => null),
      turn: 'X',
      status: 'inProgress',
    });
  });
});
