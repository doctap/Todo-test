import { Primitive, PrimitiveKeys } from "../../types";

type SearchParamsType = Record<string, string | number | boolean | undefined>

export const getSearchParamsObj = (searchString: string) => {
    if (searchString[0] === '?') {
        searchString = searchString.slice(1);
    }
    const params = searchString.split('&');
    const searchParams: SearchParamsType = {};

    for (const param of params) {
        const [key, value] = param.split('=');

        if (value === 'true') {
            searchParams[key] = true;
        } else if (value === 'false') {
            searchParams[key] = false;
        } else if (!isNaN(Number(value))) {
            searchParams[key] = Number(value);
        } else {
            searchParams[key] = value;
        }
        
    }

    return searchParams;
}

export const normalazeSearchParamsObj = (searchParams: Record<string, PrimitiveKeys>) => {
    const result: Record<string, Primitive> = {};
    const data = {
        'true': true,
        'false': false,
        'undefined': undefined,
        'null': null
    };

    for (const [key, value] of Object.entries(searchParams)) result[key] = data[value];

    return result;
}
