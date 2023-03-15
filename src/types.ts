// Helper types
type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

// Global types
type CaseFunction = () => any | Promise<any>;
type CaseResult = string | number | bigint | boolean | CaseFunction;

// Array/Map-like types
type CaseEntryType = bigint | number | string | symbol | boolean;
type CaseEntry<T extends CaseEntryType = CaseEntryType> = readonly [
	T,
	CaseResult
];
type CaseEntries = readonly CaseEntry[];
type SwitchEntryResult<
	T extends CaseEntries,
	A extends CaseEntryType
> = A extends T[number][0]
	? Extract<ArrayElement<T>, readonly [A, any]>[1] extends CaseFunction
		? ReturnType<Extract<ArrayElement<T>, readonly [A, any]>[1]>
		: Extract<ArrayElement<T>, readonly [A, any]>[1]
	: 'default' extends T[number][0]
	? Extract<ArrayElement<T>, readonly ['default', any]>[1] extends CaseFunction
		? ReturnType<Extract<ArrayElement<T>, readonly ['default', any]>[1]>
		: Extract<ArrayElement<T>, readonly ['default', any]>[1]
	: undefined;

// Object-like types
type CaseObjectType = string | number | symbol;
type CaseObject = {
	[key: CaseObjectType]: CaseResult;
} & {
	default?: CaseResult;
};
type SwitchObjectResult<
	T extends CaseObject,
	A extends CaseObjectType
> = A extends keyof T
	? T[A] extends CaseFunction
		? ReturnType<T[A]>
		: T[A]
	: T['default'] extends CaseFunction
	? ReturnType<T['default']>
	: T['default'];

// Exported types
export type Cases = CaseEntries | CaseObject;
export type CaseTypes = CaseObjectType | CaseEntryType;
export type SwitchResult<
	T extends Cases,
	A extends CaseTypes
> = T extends CaseEntries
	? SwitchEntryResult<T, A>
	: T extends CaseObject
	? A extends CaseObjectType
		? SwitchObjectResult<T, A>
		: undefined
	: undefined;
