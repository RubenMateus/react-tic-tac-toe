import { reducer } from '../reducer';
import { generateGrid } from '../../utils';
import { checkForWin, checkForDraw } from '../conditions';

jest.mock('../conditions');

describe('reducer', () => {
  test('should return state when status is success and type is not RESET', () => {
    const state = { status: 'success' };
    const action = { type: 'CLICK' };
    const result = reducer(state, action);

    expect(result).not.toBeNull();
    expect(result).toStrictEqual({ status: 'success' });
  });

  test('should return state when type does not exist', () => {
    const action = { type: 'TEST' };
    const result = reducer({}, action);

    expect(result).not.toBeNull();
    expect(result).toStrictEqual({});
  });

  test('should return initialState when type is RESET', () => {
    const action = { type: 'RESET' };
    const result = reducer({}, action);

    expect(result).not.toBeNull();
    expect(result).toStrictEqual({
      grid: generateGrid(3, 3, () => null),
      turn: 'X',
      status: 'inProgress',
    });
  });

  test('should return state when grid position is filled', () => {
    const state = { status: 'inProgress', grid: generateGrid(1, 1, () => 'X') };
    const action = { type: 'CLICK', payload: { x: 0, y: 0 } };
    const result = reducer(state, action);

    expect(result).not.toBeNull();
    expect(result).toStrictEqual(state);
  });

  test('should return state nextState with success when checkForWin is true', () => {
    const state = {
      status: 'inProgress',
      turn: 'O',
      grid: generateGrid(1, 1, () => null),
    };
    const action = { type: 'CLICK', payload: { x: 0, y: 0 } };
    checkForWin.mockImplementation(() => true);

    const result = reducer(state, action);

    expect(result).not.toBeNull();
    expect(result.status).toBe('success');
  });

  test('should return state initialState when checkForDraw is true', () => {
    const state = {
      status: 'inProgress',
      turn: 'O',
      grid: generateGrid(1, 1, () => null),
    };
    const action = { type: 'CLICK', payload: { x: 0, y: 0 } };
    checkForWin.mockImplementation(() => false);
    checkForDraw.mockImplementation(() => true);

    const result = reducer(state, action);

    expect(result).not.toBeNull();
    expect(result).toStrictEqual({
      grid: generateGrid(3, 3, () => null),
      turn: 'X',
      status: 'inProgress',
    });
  });
});
