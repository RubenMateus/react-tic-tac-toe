import {checkForWin, checkForDraw} from '../conditions';
import {generateGrid} from '../../utils';
import {describe, expect, test} from 'vitest';

describe('CheckForWin', () => {
	test('Should return false with empty grid', () => {
		const flatGrid = generateGrid(3, 3, () => null).flat();

		const result = checkForWin(flatGrid);

		expect(result).toBe(false);
	});

	test('Should return true when row wins', () => {
		const flatGrid = ['X', 'X', 'X', 'O', 'X', 'O', 'O', null, 'X'];

		const result = checkForWin(flatGrid);

		expect(result).toBe(true);
	});
});

describe('CheckFor Draw', () => {
	test('Should return false with empty grid', () => {
		const flatGrid = generateGrid(3, 3, () => null).flat();

		const result = checkForDraw(flatGrid);

		expect(result).toBe(false);
	});

	test('Should return false when grid inst all filled', () => {
		const flatGrid = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', null];

		const result = checkForDraw(flatGrid);

		expect(result).toBe(false);
	});

	test('Should return true with grid is draw', () => {
		const flatGrid = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];

		const result = checkForDraw(flatGrid);

		expect(result).toBe(true);
	});
});
