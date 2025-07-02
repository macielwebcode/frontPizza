"use client"

import styles from './styles.module.scss'
import { RefreshCw } from 'lucide-react'
import { OrderProps } from '@/lib/order.type'
import ModalOrder from '../modal'
import { use } from 'react'
import { OrderContext } from '@/providers/order'

interface Props{
    orders: OrderProps[]
}

export default function Orders({ orders }: Props){
    const { isOpen, onRequestOpen } = use(OrderContext)

    async function handleDetails(order_id: string){
       await onRequestOpen(order_id)
    }

    return(
        <>
            <main className={styles.container}>
                <section className={styles.containerHeader}>
                    <h1>Últimos pedidos</h1>
                    <button>
                        <RefreshCw size={24} color="#3fffa3" />
                    </button>
                </section>

                <section className={styles.listOrders}>
                    {orders.map(item => (
                        <button key={item.id} className={styles.orderItem} onClick={ () => handleDetails(item.id)}>
                            <div className={styles.tag}></div>
                            <span>Mesa {item.table}</span>
                        </button>
                    ))}
                    
                </section>
            </main>
            { isOpen && <ModalOrder /> }
            
        </>
    )
}