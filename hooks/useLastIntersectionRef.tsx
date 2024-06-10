import React, {useCallback, useRef} from "react";

interface IntersectionRefProps {
    isLoading: boolean;
    hasNextPage: boolean;
    setPageNum: React.Dispatch<React.SetStateAction<number>>;
}


const useLastIntersectionRef = ({ isLoading, hasNextPage, setPageNum }: IntersectionRefProps) => {
    const intObserver = useRef<IntersectionObserver | null>(null);

    return useCallback((blog: HTMLElement | null) => {
        if (isLoading) return;

        if (intObserver.current) intObserver.current.disconnect();

        intObserver.current = new IntersectionObserver(posts => {
            if (posts[0].isIntersecting && hasNextPage) {
                setPageNum(prevState => prevState + 1);
            }
        });

        if (blog) intObserver.current.observe(blog);
    }, [isLoading, hasNextPage, setPageNum]);
};

export default useLastIntersectionRef;
