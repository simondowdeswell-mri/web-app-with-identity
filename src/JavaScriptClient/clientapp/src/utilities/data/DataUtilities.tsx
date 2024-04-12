import {useEffect, useState} from "react";
import axios from "axios";


export interface DataResult<T> {
    kind: 'data';
    result: T;
}
export interface EmptyResult {
    kind: 'empty';
}
export const EmptyDataResult = {kind: 'empty'} as const;

export type DataFetchResult<T> = DataResult<T> | EmptyResult;

export function useData<T>(url:string): DataFetchResult<T> {
    const [data, setData] = useState<DataFetchResult<T>>(EmptyDataResult);
    useEffect(() => {
        if (url) {
            let ignore = false;
            axios.get(url, {
                    headers: {"X-CSRF": "1"},
                }
            )
                .then(json => {
                    if (!ignore) {
                        setData({kind: 'data', result: json.data as T});
                    }
                });
            return () => {
                ignore = true;
            };
        }
    }, [url]);
    return data;
}