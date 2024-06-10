import {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {dispatchError} from "@/utils/DispatchFunctions";
import {blogsList} from "@/rest/BlogProviderApplication";

const useBlogsList = (pageNum = 0, userId: string | null, topics: string[] | null) => {
    const [data, setData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState({});
    const [hasNextPage, setHasNextPage] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=> {
        setIsLoading(true);
        setIsError(false);
        setError({});

        const controller = new AbortController();
        const {signal} = controller;

        blogsList(pageNum, userId, topics, signal)
            .then(data => {
                setData((prev: any) => [...prev, ...data.object]);
                setHasNextPage(Boolean(data?.object.length));
                setIsLoading(false);
            }).catch(e => {
                setIsLoading(false);
                if (signal.aborted) return;
                setIsError(true);
                dispatchError(dispatch, e);
                setError({message : e?.response?.data?.message})
        })
        return ()=> controller.abort();
    }, [pageNum])

    return {isLoading, isError, error, data, hasNextPage};
};

export default useBlogsList;