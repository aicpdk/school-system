export type PromiseResolvedType<T> = T extends Promise<infer R> ? R : never;
export type ReturnedPromiseResolvedType<Type> = PromiseResolvedType<ReturnType<Type>>;
