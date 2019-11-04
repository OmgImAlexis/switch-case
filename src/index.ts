interface Cases {
	[key: string]: String | Function | Promise<any>,
	default: String | Function | Promise<any>
}

/**
 * Get the case or fallback to default
 *
 */
const getCase = async (cases: Cases, choice: string) => {
	// Return default if case is missing
	if (!Object.keys(cases).includes(choice)) {
		const result = await cases.default;
		return result;
	}

	// Return the selected choice
	const result = await cases[choice];
	return result;
};

/**
 * Switch case
 */
const switchCase = async (cases: any, choice: string) => {
	const result = await getCase(cases, choice);

	// If it returns a function run it
	if (typeof result === 'function') {
		return result();
	}

	// If it returns an async function await it
	if (result.constructor.name === 'AsyncFunction') {
		const actualResult = await result();
		return actualResult;
	}

	return result;
};

export default switchCase;
