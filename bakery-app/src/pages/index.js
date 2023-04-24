import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div class={styles.backgroundImage}>
        <div class={styles.box}></div>
        <div class={styles.box}></div>
        <div class={styles.box}>
        <button class={styles.addCaptionButton}><img class={styles.captionImage} src="/Caption.svg"/></button>
        </div>
        <div class={styles.box}></div>
        <div class={styles.box}></div>
        <div class={styles.box}></div>
        <div class={styles.box}>
          <button class={styles.deletePhotoButton}><img class={styles.deleteImage} src="/Delete.svg"/></button>
        </div>
        <div class={styles.box}>
        <button class={styles.nextPhotoButton}>Next Photo</button>
        </div>
        <div class={styles.box}>
        <button class={styles.uploadPhotoButton}><img class={styles.uploadImage} src="/Upload.svg"/></button>
        </div>
      </div>
    </> 
  )
}
