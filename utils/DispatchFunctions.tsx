import {setSnackbar} from "@/state/snackbarSlice";
import {Dispatch} from "redux";

export const dispatchSuccessMessage = (dispatch: Dispatch, message: string) => {
    const snackBarData = {
        isSnackbar: true,
        message: message,
        snackbarType: 'Success',
    };
    dispatch(setSnackbar(snackBarData));
}

export const dispatchError = (dispatch: Dispatch, error: any) => {
    if (error.response.status === 400 || error.response.status === 401) {
        const message = error?.response?.data?.message || 'Something went wrong. Please try again later';
        const snackBarData = {
            isSnackbar: true,
            message: message,
            snackbarType: 'Error',
        };
        dispatch(setSnackbar(snackBarData));
    } else {
        const message = 'Something went wrong. Please try again later';
        const snackBarData = {
            isSnackbar: true,
            message: message,
            snackbarType: 'Error',
        };
        dispatch(setSnackbar(snackBarData));
    }
}