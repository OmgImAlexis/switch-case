import type { Cases, CaseTypes, SwitchResult } from './types';

export type { Cases, CaseTypes, SwitchResult };

/** Represents a functional switch statement. */
export type Switch<S extends Cases> = {
	/** Get the result of a specific case. */
	Case<C extends CaseTypes>(choice: C): SwitchResult<S, C>;
};

const PROPERTY_KEY_TYPES = [
	'string',
	'number',
	'symbol',
] as const satisfies readonly PropertyKey[];
function isPropertyKey(input: any): input is PropertyKey {
	return PROPERTY_KEY_TYPES.includes(typeof input as any);
}
function hasOwn(object: any, key: PropertyKey) {
	return Object.prototype.hasOwnProperty.call(object, key);
}

/** Create a reusable switch statement. */
export function Switch<S extends Cases>(cases: S): Switch<S> {
	const isArray = Array.isArray(cases);
	const map = isArray ? new Map(cases) : new Map();
	const returnValue = (value: any): any => {
		if (typeof value === 'function') {
			return value();
		}
		return value;
	};
	return {
		Case<C extends CaseTypes>(choice: C): SwitchResult<S, C> {
			if (isArray) {
				if (map.has(choice)) {
					return returnValue(map.get(choice));
				}
				return returnValue(map.get('default'));
			}
			if (isPropertyKey(choice) && hasOwn(cases, choice)) {
				return returnValue(cases[choice as any]);
			}
			return returnValue(cases['default' as any]);
		},
	};
}

/**
 * Original functional switch case API; creates a new switch on every method call.
 * @deprecated
 */
export function switchCase<S extends Cases, C extends CaseTypes>(
	cases: S,
	choice: C
): SwitchResult<S, C> {
	return Switch(cases).Case(choice);
}

export default switchCase;
