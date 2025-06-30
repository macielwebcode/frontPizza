"use client"

import styles from './styles.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import logoImg from '/public/logo.png'
import { LogOut } from 'lucide-react'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

export default function Header(){

    const router = useRouter()

    async function handleLogout(){
        deleteCookie("session", { path: "/" })
        router.replace("/")
    }
    return(
        <>
            <header className={styles.headerContainer}>
                <div className={styles.headerContent}>
                    <Link href="/dashboard">
                        <Image
                            alt="logo" 
                            src={logoImg}
                            width={150}
                            height={60}
                            priority={true}
                            quality={100}
                        />
                    </Link>
                    <nav>
                        <Link href="/dashboard/category">
                            Categoria
                        </Link>
                        <Link href="/dashboard/product">
                            Produto
                        </Link>
                        <form action={handleLogout}>
                            <button type='submit'>
                                < LogOut size={24} color="#fff"/>
                            </button>
                        </form>
                    </nav>
                </div>
            </header>
        </>
    )
}