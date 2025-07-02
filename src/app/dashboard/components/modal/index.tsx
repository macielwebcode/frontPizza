"use client"

import styles from './style.module.scss'
import { X } from 'lucide-react'
import { use } from 'react'
import { OrderContext } from '@/providers/order'

export default function ModalOrder(){

    const { onRequestClose, order } = use(OrderContext)
   

    function handleCloseModal(){
        onRequestClose()
    }


    return(
        <dialog className={styles.dailogContainer}>
            <section className={styles.dialogContent}>
                <button className={styles.dialogBack} onClick={handleCloseModal}>
                    <X size={40} color="#ff3f4b" />
                </button>
                <article className={styles.container}>
                    <h2>
                        Detalhes do Pedido
                    </h2>
                    <span className={styles.table}>
                        {/* Mesa<b>{order[0].product.name}</b> */}
                    </span>
                    {order.map(item => (
                        <section key={item.id} className={styles.detailOrder}>
                            <span> {item.amount} - <b>{item.product.name}</b></span>
                            <span className={styles.descriptionItem}>{item.product.description}</span>
                        </section>
                    ))}
                    
                    <button className={styles.btnOrder}>
                        Concluir Pedido
                    </button>
                </article>
            </section>
        </dialog>
    )
}