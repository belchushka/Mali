import {useCallback, useState} from "react";

export const useRefresh = ()=>{
    const [refresh, setRefresh] = useState(true)
    const startRefresh = useCallback(()=>{
        setRefresh(!refresh)
    },[refresh])

    return {
        refresh:startRefresh
    }
}