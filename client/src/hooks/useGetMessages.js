import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation";


const useGetMessages = () => {
 const [loading,setLoading] = useState();
 const {messages,setMessages,selectedConversation } = useConversation();

 useEffect(()=>{
    const getMessages = async ()=>{
        setLoading(true);
        try{
            const res = await fetch(`/api/messages/${selectedConversation._id}`);
            const data  = await res.json();

            if(data.error){
                throw new Error (data.error)
            }
            await setMessages(data);
        }
        catch(e){toast.error(e.message)}

        finally{
            setLoading(false)
        }
    }
     if(selectedConversation?._id) getMessages();

 },[selectedConversation?._id,setMessages])

 return {messages,loading}
}

export default useGetMessages