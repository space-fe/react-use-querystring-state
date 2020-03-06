export declare const stringifyParams: (params: any) => string;
declare function useQueryStringState<T>(key: string, defaultParams: T): [T, (qs: T | ((preQS: T) => T)) => void];
export default useQueryStringState;
