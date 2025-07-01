"use client"

import { ChangeEvent, useState } from 'react'
import styles from './styles.module.scss'
import { UploadCloud } from 'lucide-react'
import Image from 'next/image'
import Button from '@/app/dashboard/components/button'
import { api } from '@/services/api'
import { getCookieClient } from '@/lib/cookieClient'
import { toast } from 'sonner'
import { useRouter } from "next/navigation"

interface Categoryprops{
    id: string,
    name: string
}
interface Props{
    categories: Categoryprops[]
}

export default function FormRegisterProduct({ categories }: Props){

    const router = useRouter()
    const [image, setImage] = useState<File>()
    const [previewImage, setPreviewImage] = useState("")

    async function handleRegisterProduct(formData: FormData){
        const categoryIndex = formData.get("category")
        const name = formData.get("name")
        const price = formData.get("price")
        const description = formData.get("description")

        if(!name || !price || !description || !image){
            toast.warning("Preencha todos os campos")
           
            return
        }
        

        const categoryId = categories[Number(categoryIndex)]

        const data = new FormData()

        console.log(data)

        data.append("name", name)
        data.append("price", price)
        data.append("description", description)
        data.append("category_id", categoryId.id)
        data.append("file", image)

        const token = getCookieClient()

        await api.post("/product", data, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .catch((err) => {
            console.log("erro ao cadastrar", err)
            toast.warning("Erro ao cadastrar Produto")
            return
        })

        console.log("cadastrou com sucesso")

        toast.success("Produto Cadastrado com Sucesso")
        router.push("/dashboard")
    }

    function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(e.target.files && e.target.files[0]){
            const image = e.target.files[0]

            if(image.type !== "image/jpeg" && image.type !== "image/png"){
                console.log("formato não permitido")
                toast.warning("formato de imagem não permitido")
                return
            }
            setImage(image)
            setPreviewImage(URL.createObjectURL(image))
            
        }

        
    }

    return(
        <>
        <main className={styles.container}>
        <h1>Novo Produto</h1>
        <form className={styles.form} action={handleRegisterProduct}>
            <label className={styles.labelImage}>
                <span>
                    <UploadCloud size={30} color="#fff" />
                </span>

                <input 
                    type="file"
                    accept="image/png, image/jpeg"
                    required
                    onChange={handleFile}
                />

                {previewImage && (
                    <Image 
                        alt="imagem do produto"
                        src={previewImage}
                        className={styles.preview}
                        fill={true}
                        quality={100}
                        priority={true}
                    />
                )}

            </label>

            <select name='cateogry'>
                {categories.map( (item: any, index: any) => (
                    <option key={item.id} value={index}>
                        {item.name}
                    </option>
                ))}
            </select>

            <input 
                type="text"
                name="name"
                placeholder='Digite nome do produto'
                required
                className={styles.input}
            />

            <input 
                type="text"
                name="price"
                placeholder='Digite preço do produto'
                required
                className={styles.input}
            />

            <textarea
                className={styles.textarea}
                placeholder='digitar descrição do produto'
                required
                name="description"
            >

            </textarea>
            <Button name="Cadastrar Produto" />

        </form>
        </main>
        </>
    )
}