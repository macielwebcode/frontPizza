import logoImg from '/public/logo.png'
import styles from '../page.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '@/services/api'
import { redirect } from 'next/navigation'

export default function SignUp(){

    async function handleRegister(formData: FormData){
        "use server"
        const name = formData.get("name")
        const email = formData.get("email")
        const passwd = formData.get("password")

        if(name === "" || email === "" || passwd === ""){
            return
        }

        try {
            await api.post("/users",{
                name: name,
                email: email,
                pass: passwd
            })
        } catch (error) {
            console.log(error)
            return
        }
        redirect("/")
    }

    return(
        <>
            <main>
                <div className={styles.containerCenter}>
                    <Image
                        src={logoImg}
                        alt="logo aplicação"
                    />
                  
                    <section className={styles.login}>
                        <h3>Criando sua Conta</h3>
                        <form action={handleRegister}>
                            <input 
                                type="text"
                                required
                                name="name"
                                placeholder="Digite seu nome..."
                                className={styles.input}
                            />
                            <input 
                                type="email"
                                required
                                name="email"
                                placeholder="Digite seu email..."
                                className={styles.input}
                            />
                            <input 
                                type="password"
                                required
                                name="password"
                                placeholder="******"
                                className={styles.input}
                            />

                            <button type="submit" className={styles.button}>Acessar</button>
                        </form>
                        <Link href="/" className={styles.text}>Já possui conta? Faça Login.</Link>
                    </section>
                 </div>
            </main>
        </>
    )
}