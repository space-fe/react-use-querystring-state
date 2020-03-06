var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { useRef, useMemo, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
export var stringifyParams = function (params) {
    try {
        return JSON.stringify(params);
    }
    catch (error) {
        return '';
    }
};
var parseQueryString = function (qs) {
    try {
        return JSON.parse(qs);
    }
    catch (error) {
        return null;
    }
};
var getSearch = function (preSearch, key, qs) {
    var _a;
    var preSearchObj = queryString.parse(preSearch);
    var curSearchObj = __assign(__assign({}, preSearchObj), (_a = {}, _a[key] = qs, _a));
    var curSearchStr = queryString.stringify(curSearchObj);
    return "?" + curSearchStr;
};
var getLocation = function () { return window.location; };
function useQueryStringState(key, defaultParams) {
    var search = useLocation().search;
    var history = useHistory();
    var query = useMemo(function () { return queryString.parse(search)[key]; }, [key, search]);
    var defaultQueryString = stringifyParams(defaultParams);
    var queryStringState = useMemo(function () { return query ? parseQueryString(query) : parseQueryString(defaultQueryString); }, [defaultQueryString, query]);
    var queryStringStateRef = useRef(queryStringState);
    queryStringStateRef.current = queryStringState;
    var updateQueryString = useCallback(function (params) {
        var nextParams = params;
        if (typeof params === 'function') {
            nextParams = params(queryStringStateRef.current);
        }
        var _a = getLocation(), search = _a.search, pathname = _a.pathname;
        var curSearchStr = getSearch(search, key, stringifyParams(nextParams));
        var newPath = "" + pathname + curSearchStr;
        history.push(newPath);
    }, [key]);
    return [queryStringState, updateQueryString];
}
export default useQueryStringState;
//# sourceMappingURL=index.js.map