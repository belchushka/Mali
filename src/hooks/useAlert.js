import {useCallback, useMemo, useState} from "react";
import AlertModal from "../components/Modals/AlertModal";

export const useAlert = ()=>{
    const [visible, setVisible] = useState(false)
    const [text, setText] = useState("")
    const [title, setTitle] = useState("")
    const close = useCallback(()=>{
        setVisible(false)
    }, [])
    const open = useCallback((title,text)=>{
        setText(text)
        setTitle(title)
        setVisible(true)
    }, [])

    const render = useCallback(()=>{
        return <AlertModal title={title} visible={visible} close={close} text={text}/>
    },[visible,close, text])

    return useMemo(()=>{
       return ({
            render,
            open,
            close
        })
    }, [render, open, close])
}