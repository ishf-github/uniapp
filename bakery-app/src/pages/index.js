import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import React,{useState} from 'react'
// TODO: Fix Zoom Issue
// TODO: Fix Image Sizing Issue


export default function Home() {
  const [imageList, setImageList] = useState([{caption:"",imageUrl:"/browncow.jpg"},{caption:"",imageUrl:"/redhat.jpg"},{caption:"",imageUrl:"/flags.jpg"},{caption:"",imageUrl:"/bluecloth.jpg"}])
  const [currentIndex, setCurrentIndex] = useState(0);

  // const inter = Inter({ subsets: ['latin'] })
  // const imageUrl = "/browncow.jpg"
  const deleteImage = ()=>{
    setImageList(imageList.slice(1)); 

  }
  
  const nextImage = ()=>{
    setCurrentIndex((currentIndex + 1) % imageList.length);
  }  

  const uploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const newImageList = [...imageList, reader.result];
      setImageList(newImageList);
    }
    reader.readAsDataURL(file);
  }

  const addCaption =()=>{
    const caption = window.prompt("addCaption");
    const newImageList = [...imageList];
    newImageList[currentIndex].caption = caption;
    setImageList(newImageList);
  }
  
  return (
    <>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <p class={styles.caption}>{imageList[currentIndex]?.caption}</p> 
      </div>     
      <div class={styles.backgroundImage} style={{backgroundImage: `url(${imageList[currentIndex]?.imageUrl}`}}>
        <div class={styles.box}></div>
        <div class={styles.box}>  
        </div>
        <div class={styles.box}>
        <button class={styles.addCaptionButton} onClick={addCaption}><img class={styles.captionImage} src="/Caption.svg"/></button>
        </div>
        <div class={styles.box}></div>
        <div class={styles.box}></div>
        <div class={styles.box}></div>
        <div class={styles.box}>
          <button class={styles.deletePhotoButton} onClick={deleteImage}><img class={styles.deleteImage} src="/Delete.svg"/></button>
        </div>
        <div class={styles.box}>
        <button class={styles.nextPhotoButton} onClick={nextImage}>Next Photo</button>
        </div>
        <div class={styles.box}>
        <label class={styles.uploadPhotoButton}>
          <input type="file" accept="image/*" onChange={uploadImage} hidden />
          <img class={styles.uploadImage} src="/Upload.svg"/>  
        </label>
        </div>
      </div>
    </> 
  )
}
