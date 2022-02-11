import {useCallback, useMemo, useState} from "react";
import AlertModal from "../components/Modals/AlertModal";

export const useAlert = ()=>{
    const [visible, setVisible] = useState(false)
    const [text, setText] = useState("")
    const close = useCallback(()=>{
        setVisible(false)
    }, [])
    const open = useCallback((text)=>{
        setText(text)
        setVisible(true)

    }, [])

    const render = useCallback(()=>{
        return <AlertModal visible={visible} close={close} text={text}/>
    },[visible,close, text])

    return useMemo(()=>{
       return ({
            render,
            open,
            close
        })
    }, [render, open, close])
}