import getParams from './getParams';
import { isPlainObject } from './isPlainObject';

function queryString(data: PlainObject) {
    if (!isPlainObject(data)) {
        throw new Error('input must be an object');
    }

    return getParams(data)
        .map((arr) => arr.join('='))
        .join('&');
}

export default queryString;
