const test = require('ava');
const switchCase = require('./dist').default;

test('uses default when param can\'t be found in cases', async t => {
	// Non-function case
	{
		const cases = {
			a: 1,
			b: 2,
			default: 1000
		};

		const result = await switchCase(cases, 'z');
		t.is(result, 1000);
	}

	// Function case
	{
		const cases = {
			a: 1,
			b: 2,
			default: () => 1000
		};

		const result = await switchCase(cases, 'z');
		t.is(result, 1000);
	}

	// Async function case
	{
		const cases = {
			a: 1,
			b: 2,
			default: async () => 1000
		};

		const result = await switchCase(cases, 'z');
		t.is(result, 1000);
	}
});

test('returns correct case', async t => {
	// Non-function case
	{
		const cases = {
			a: 1,
			b: 2,
			default: 1000
		};

		const result = await switchCase(cases, 'a');
		t.is(result, 1);
	}

	// Function case
	{
		const cases = {
			a: () => 1,
			b: 2,
			default: () => 1000
		};

		const result = await switchCase(cases, 'a');
		t.is(result, 1);
	}

	// Async function case
	{
		const cases = {
			a: async () => 1,
			b: 2,
			default: async () => 1000
		};

		const result = await switchCase(cases, 'a');
		t.is(result, 1);
	}
});
