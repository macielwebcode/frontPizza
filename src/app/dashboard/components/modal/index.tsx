"use client"

import styles from './style.module.scss'
import { X } from 'lucide-react'
import { use } from 'react'
import { OrderContext } from '@/providers/order'
import { calculateTotal } from '@/lib/helpers'

export default function ModalOrder(){

    const { onRequestClose, order, finishOrder } = use(OrderContext)
   

   async function hanldeFinishOrder(){
    await finishOrder(order[0].order.id)
   }


    return(
        <dialog className={styles.dailogContainer}>
            <section className={styles.dialogContent}>
                <button className={styles.dialogBack} onClick={onRequestClose}>
                    <X size={40} color="#ff3f4b" />
                </button>
                <article className={styles.container}>
                    <h2>
                        Detalhes do Pedido
                    </h2>
                    <span className={styles.table}>
                        Mesa<b>{order[0].product.name}</b>
                    </span>
                    {order.map(item => (
                        <section key={item.id} className={styles.detailOrder}>
                            <span> {item.amount} - <b>{item.product.name}</b> - R$ {parseFloat(item.product.price)}</span>
                            
                            <span className={styles.descriptionItem}>{item.product.description}</span>
                        </section>
                    ))}

                    <h4>Total: {}</h4>
                    
                    <button className={styles.btnOrder} onClick={hanldeFinishOrder}>
                        Concluir Pedido
                    </button>
                </article>
            </section>
        </dialog>
    )
}