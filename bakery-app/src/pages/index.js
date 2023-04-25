import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import React,{useState} from 'react'
// TODO: Fix Zoom Issue
// TODO: Fix Image Sizing Issue


export default function Home() {
  const [imageList, setImageList] = useState(["/browncow.jpg","/redhat.jpg","/flags.jpg","/bluecloth.jpg"])

  // const inter = Inter({ subsets: ['latin'] })
  // const imageUrl = "/browncow.jpg"
  const deleteImage = ()=>{
    setImageList(imageList.slice(1)) 
  }
  return (
    <>
      <div class={styles.backgroundImage} style={{backgroundImage: `url(${imageList[0]}`}}>
        <div class={styles.box}></div>
        <div class={styles.box}></div>
        <div class={styles.box}>
        <button class={styles.addCaptionButton}><img class={styles.captionImage} src="/Caption.svg"/></button>
        </div>
        <div class={styles.box}></div>
        <div class={styles.box}></div>
        <div class={styles.box}></div>
        <div class={styles.box}>
          <button class={styles.deletePhotoButton} onClick={deleteImage}><img class={styles.deleteImage} src="/Delete.svg"/></button>
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
