type SearchParamsType = Record<string, string | number | boolean | undefined>

export const getSearchParams = (searchString: string) => {
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

export const setSearchParams = (searchParams: SearchParamsType) => {
    let searchString = '?';

    for (const [key, value] of Object.entries(searchParams)) {
        searchString += searchString.at(-1) === '?' ? `${key}=${value}` : `&${key}=${value}`
    } 

    return searchString;
}
