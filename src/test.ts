/* eslint-disable new-cap,@typescript-eslint/naming-convention,@typescript-eslint/no-confusing-void-expression,import/extensions */
import {strictEqual} from 'node:assert';
import switchCase2, {Cases, Switch, switchCase} from './index';

type AssertType<Actual extends Expected, Expected> = Actual extends Expected
	? true
	: never;
/** Assert that two primitive types are equivalent and strictly equal at runtime. */
function assertType<A extends E, E>(actual: A, expected: E): AssertType<A, E> {
	return strictEqual(actual, expected) as unknown as AssertType<A, E>;
}

describe('Switch', () => {
	const objectLike = {
		a: 1,
		100: () => 'hello' as const,
		[200n as unknown as 200]: async () => 'world' as const,
		[true as unknown as 'true']: 'NCC-1701-D',
		default: async () => 42n as const,
	} as const satisfies Cases;
	const mapLike = [
		['a', 1],
		[100, () => 'hello' as const],
		[200n, async () => 'world' as const],
		[true, 'NCC-1701-D'],
		['default', async () => 42n as const],
	] as const satisfies Cases;

	it('creates functional switch from object', () => {
		const {Case} = Switch(objectLike);
		strictEqual(typeof Case, 'function');
	});

	it('creates functional switch from entries', () => {
		const {Case} = Switch(mapLike);
		strictEqual(typeof Case, 'function');
	});

	it('matches by case object keys', async () => {
		const {Case} = Switch(objectLike);

		{
			const result = Case('a');
			assertType(result, 1 as const);
		}

		{
			const result = Case(100);
			assertType(result, 'hello' as const);
		}

		{
			const result = await Case(200);
			assertType(result, 'world' as const);
		}

		{
			const result = Case('true');
			assertType(result, 'NCC-1701-D' as const);
		}
	});

	it('matches by case entries', async () => {
		const {Case} = Switch(mapLike);

		{
			const result = Case('a');
			assertType(result, 1 as const);
		}

		{
			const result = Case(100);
			assertType(result, 'hello' as const);
		}

		{
			const result = await Case(200n);
			assertType(result, 'world' as const);
		}

		{
			const result = Case(true);
			assertType(result, 'NCC-1701-D' as const);
		}
	});

	it('non-matching values fallback to default', async () => {
		const {Case: objectCase} = Switch(objectLike);
		const {Case: mapCase} = Switch(mapLike);

		{
			const result = await objectCase(false);
			assertType(result, 42n as const);
		}

		{
			const result = await mapCase(false);
			assertType(result, 42n as const);
		}
	});

	it('can\'t match boolean/bigint by case object keys', async () => {
		const {Case} = Switch(objectLike);

		{
			const result = await Case(200n);
			assertType(result, 42n as const);
		}

		{
			const result = await Case(true);
			assertType(result, 42n as const);
		}
	});
});

describe('Legacy switchCase', () => {
	it('uses default when param can\'t be found in cases', async () => {
		// Non-function case
		{
			const cases = {
				a: 1 as const,
				b: 2 as const,
				default: 1000 as const,
			};

			const result = switchCase(cases, 'z');
			strictEqual(result, 1000);
		}

		// Function case
		{
			const cases = {
				a: 1 as const,
				b: 2 as const,
				default: () => 1000 as const,
			};

			const result = switchCase(cases, 'z');
			strictEqual(result, 1000);
		}

		// Async function case
		{
			const cases = {
				a: 1 as const,
				b: 2 as const,
				default: async () => 1000 as const,
			};

			const result = await switchCase(cases, 'z');
			strictEqual(result, 1000);
		}
	});

	it('returns correct case', async () => {
		// Non-function case
		{
			const cases = {
				a: 1 as const,
				b: 2 as const,
				default: 1000 as const,
			};

			const result = switchCase2(cases, 'a');
			strictEqual(result, 1);
		}

		// Function case
		{
			const cases = {
				a: () => 1 as const,
				b: 2 as const,
				default: () => 1000 as const,
			};

			const result = switchCase2(cases, 'a');
			strictEqual(result, 1);
		}

		// Async function case
		{
			const cases = {
				a: async () => 1 as const,
				b: 2 as const,
				default: async () => 1000 as const,
			};

			const result = await switchCase2(cases, 'a');
			strictEqual(result, 1);
		}
	});
});
