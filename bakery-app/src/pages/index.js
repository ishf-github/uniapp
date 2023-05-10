// Import required modules and packages
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import React,{useEffect, useState} from 'react'
import axios from 'axios';

// Define the Home function component
export default function Home() {

  // Define state variables using the useState hook
  const [imageList, setImageList] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0);

  // Define a side effect using the useEffect hook
  useEffect (()=>{
    // Send a GET request to the specified API endpoint to retrieve the list of images
    axios.get("https://mfrccsui2h.execute-api.eu-west-1.amazonaws.com/default/getDDBObjects")
    .then((response) => {
      console.log('Response data: ', response.data);
      // Update the imageList state variable with the response data
      setImageList(response.data);
    })
    .catch((error) => {
      console.error('Error: ', error);
    });
  },[])

  // Define a function to delete the currently displayed image
  const deleteImage = async () => {
    // Get the ID of the current image from the imageList state variable
    const imageID = imageList[currentIndex]?.imageID;
    try {
      // Send a DELETE request to the specified API endpoint to delete the image with the specified ID
      const response = await axios.delete(`https://mfrccsui2h.execute-api.eu-west-1.amazonaws.com/default/deleteImage/${imageID}`);
      console.log(response.data);
      // Update the imageList state variable to remove the deleted image
      setImageList(imageList.filter(image => image.imageID !== imageID));
    } catch (error) {
      console.error(error);
    }  
  }
  
  // Define a function to display the next image in the list
  const nextImage = ()=>{
    setCurrentIndex((currentIndex + 1) % imageList.length);
  }  

  // Define a function to upload a new image
  const uploadImage = (e) => {
    // Get the file object from the file input element
    const file = e.target.files[0];
    // Create a new FileReader object to read the file
    const reader = new FileReader();
    reader.onload = () => {
      // Update the imageList state variable with the new image data
      const newImageList = [...imageList, reader.result];
      setImageList(newImageList);
    }
    // Read the file as a data URL
    reader.readAsDataURL(file);
  }

  // Define a function to edit the caption of the currently displayed image
  const editCaption =async()=>{
    // Display a prompt to allow the user to enter a new caption
    const caption = window.prompt("editCaption");
    // Get the ID of the current image from the imageList state variable
    const imageID=imageList[currentIndex]?.imageID;
    try {
      // Sends a put request to the specified API endpoint to update the caption of the image with the specified image ID
      const response = await axios.put(`https://mfrccsui2h.execute-api.eu-west-1.amazonaws.com/default/editCaption/${imageID}`, {caption:caption});
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }    
  }
  
  // Return the JSX to render the component - Caption, Background Image and Edit Caption, Delete Image, Next Image buttons 
  return (
    <>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 
        <p class={styles.caption}>{imageList[currentIndex]?.caption}</p> 
      </div>     
      <div class={styles.backgroundImage} style={{backgroundImage: `url(${imageList[currentIndex]?.imageUrl})`}}>
        <div class={styles.box}></div>
        <div class={styles.box}>  
        </div>
        <div class={styles.box}>
        <button class={styles.addCaptionButton} onClick={editCaption}><img class={styles.captionImage} src="/Caption.svg"/></button>
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
