import { OrdemItemProps } from "@/providers/order";

export function calculateTotal(orders: OrdemItemProps[]){
    return orders.reduce((total, item) => {
        const itemTotal = parseInt(item.product.price) * item.amount
        return total + itemTotal
    }, 0)//conta começa em zero
}