import { switchCase } from './index';
import { strictEqual } from 'node:assert';

describe('Legacy switchCase', () => {
	it("uses default when param can't be found in cases", async () => {
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

	it('returns correct case', async (t) => {
		// Non-function case
		{
			const cases = {
				a: 1 as const,
				b: 2 as const,
				default: 1000 as const,
			};

			const result = switchCase(cases, 'a');
			strictEqual(result, 1);
		}

		// Function case
		{
			const cases = {
				a: () => 1 as const,
				b: 2 as const,
				default: () => 1000 as const,
			};

			const result = switchCase(cases, 'a');
			strictEqual(result, 1);
		}

		// Async function case
		{
			const cases = {
				a: async () => 1 as const,
				b: 2 as const,
				default: async () => 1000 as const,
			};

			const result = await switchCase(cases, 'a');
			strictEqual(result, 1);
		}
	});
});
