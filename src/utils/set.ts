import { merge } from './merge';

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof object !== 'object' || object === null) {
        return object;
    }

    const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
        [key]: acc,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }), value as any);
    return merge(object as Indexed, result);
}
