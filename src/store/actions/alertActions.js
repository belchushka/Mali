import {SET_ALERT_MESSAGE, SET_ALERT_TITLE, SET_ALERT_VISIBLE} from "../consts";

export const setAlertTitleAndMessage = (title, message) => async (dispatch) => {
    dispatch({
        type: SET_ALERT_TITLE,
        payload: title
    })
    dispatch({
        type: SET_ALERT_MESSAGE,
        payload: message
    })
}

export const setAlertVisible = (visible) => async (dispatch) => {
    dispatch({
        type: SET_ALERT_VISIBLE,
        payload: visible
    })
}



