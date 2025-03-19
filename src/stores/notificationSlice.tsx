//SLICE NOTIFICATION
import { StateCreator } from "zustand"
import type { Notification } from "../types"

//Type
export type NotificaionSliceType = {
    notification: Notification,
    showNotification: (payload : Omit<Notification, 'show'> ) => void,
    closeNotification: () => void;
}

//Constantes
const initialState = {
    text: '',
    error: false,
    show: false
}

//Store
export const createNotificaionSlice : StateCreator<NotificaionSliceType> = (set, get) => ({
    notification: initialState,

    showNotification: (payload) => {
        set({
            notification: {
                text: payload.text,
                error: payload.error,
                show: true
            }
        });

        setTimeout(() => {
            get().closeNotification();
        }, 3000)
    },

    closeNotification: () => {
        set({
            notification: initialState
        })
    }
});