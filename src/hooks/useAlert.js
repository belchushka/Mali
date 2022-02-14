import {useCallback, useMemo, useState} from "react";
import AlertModal from "../components/Modals/AlertModal";

export const useAlert = ()=>{
    const [visible, setVisible] = useState(false)
    const [text, setText] = useState("")
    const [callback, setCallBack] = useState(()=>{})
    const [title, setTitle] = useState("")
    const close = useCallback(()=>{
        setVisible(false)
    }, [])
    const open = useCallback((title,text, callback)=>{
        setText(text)
        setTitle(title)
        setCallBack(callback)
        setVisible(true)
    }, [])

    const render = useCallback(()=>{
        return <AlertModal title={title} visible={visible} callback={callback} close={close} text={text}/>
    },[visible,close, text, callback])

    return useMemo(()=>{
       return ({
            render,
            open,
            close
        })
    }, [render, open, close])
}