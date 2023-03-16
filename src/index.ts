/* eslint-disable new-cap,@typescript-eslint/naming-convention,@typescript-eslint/no-redeclare,@typescript-eslint/no-unsafe-return,import/extensions */
import type {Cases, CaseTypes, SwitchResult} from './types';

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

function hasOwn(object: any, key: PropertyKey): boolean {
	return Object.prototype.hasOwnProperty.call(object, key) as boolean;
}

/** Create a reusable switch statement. */
export function Switch<S extends Cases>(cases: S): Switch<S> {
	const isArray = Array.isArray(cases);
	const map = isArray ? new Map(cases) : new Map();
	const returnValue = <C extends CaseTypes>(value: unknown): SwitchResult<S, C> => {
		if (typeof value === 'function') {
			return value() as SwitchResult<S, C>;
		}

		return value as SwitchResult<S, C>;
	};

	return {
		/** Get the result of a specific case. */
		Case<C extends CaseTypes>(choice: C): SwitchResult<S, C> {
			if (isArray) {
				if (map.has(choice)) {
					return returnValue<C>(map.get(choice));
				}

				return returnValue<C>(map.get('default'));
			}

			if (isPropertyKey(choice) && hasOwn(cases, choice)) {
				return returnValue<C>(cases[choice as number]);
			}

			return returnValue<C>(cases['default' as unknown as number]);
		},
	};
}

/**
 * Original functional switch case API; creates a new switch on every method call.
 * @deprecated
 */
export function switchCase<S extends Cases, C extends CaseTypes>(
	cases: S,
	choice: C,
): SwitchResult<S, C> {
	return Switch(cases).Case(choice);
}

export default switchCase;

export {type CaseTypes, type Cases, type SwitchResult} from './types';
