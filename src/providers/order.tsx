"use client"

import { createContext, ReactNode, useState } from "react"
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "sonner";

export interface OrdemItemProps{
    id: string;
    amount: number;
    created_at: string;
    order_id: string;
    product_id: string;
    product:{
        id: string;
        name: string;
        price: string;
        description: string;
        banner: string;
        category_id: string;
    };
    order:{
        id: string;
        table: number;
        status: boolean;
        draft: boolean;
        name: string | null;
        

    }

}

type OrderContextData = {
    isOpen: boolean;
    onRequestOpen: (order_id: string) => Promise<void>;
    onRequestClose: () => void;
    order: OrdemItemProps[];
    finishOrder: (order_id: string) => Promise<void>;
}

type  OrderProviderProps = {
    children: ReactNode
}

export const OrderContext = createContext({} as OrderContextData)

export function OrderProvider({ children }: OrderProviderProps){

    const [isOpen, setOpen] = useState(false)
    const [order, setOrder] = useState<OrdemItemProps[]>([])

    async function onRequestOpen(order_id: string){


        const token = getCookieClient()

        const response = await api.get("/orders/detail", {
            headers:{
                Authorization: `Bearer ${token}`
            },
            params:{
                order_id: order_id
            }
        })

        setOrder(response.data)

        setOpen(true)
    }

    function onRequestClose(){
        setOpen(false)
    }

    async function finishOrder(order_id: string){
        const token = getCookieClient()

        const data = {
            ordr_id: order_id
        }
        try {
            await api.put("/order/end", data, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            
            console.log(error)
            toast.error("Pedido com falha!!")
            return
        }

        toast.success("Pedido concluído com sucesso")
    }


    return(
        <OrderContext.Provider 
            value={{  
                isOpen,
                onRequestOpen,
                onRequestClose,
                order,
                finishOrder
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}