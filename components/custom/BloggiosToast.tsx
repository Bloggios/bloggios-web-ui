"use client";

import {toast, Toaster} from "sonner";
import {useDispatch, useSelector} from "react-redux";
import {clearSnackbar, SnackbarState} from "@/state/snackbarSlice";
import {RootState} from "@/state/store";
import {useRouter} from "next/navigation";
import {useCallback, useEffect} from "react";
import useMediaQuery from "@/hooks/useMediaQuery";

export default function BloggiosToast() {

    const isBreakPoint = useMediaQuery(640);
    const router = useRouter();
    const dispatch = useDispatch();
    const { snackbarType, message, isSnackbar, path } = useSelector((state: RootState) => state.snackbar);

    const handleSnackbarAction = () => {
        if (path) {
            router.push(path);
        }
    }

    const getToast = useCallback(() => {
        switch (snackbarType && snackbarType.toLowerCase()) {
            case "success":
                toast.success(message);
                break;
            case "error":
                toast.error(message);
                break;
            case "warning":
                toast.warning(message)
                break;
            case "Info":
                toast.info(message);
                break;
            case "notification":
                toast(message, {
                    action: path && {
                        label: 'View',
                        onClick: handleSnackbarAction
                    }
                });
                break;
            default:
                toast(message);
        }
    }, [snackbarType, message, path]);

    const handleSnackbar = useCallback(() => {
        if (isSnackbar) {
            getToast();
            dispatch(clearSnackbar());
        }
    }, [isSnackbar, dispatch, getToast]);

    useEffect(() => {
        handleSnackbar();
    }, [handleSnackbar]);

    return (
        <Toaster
            position={isBreakPoint ? "bottom-center" : "top-right"}
            richColors={true}
        />
    )
}