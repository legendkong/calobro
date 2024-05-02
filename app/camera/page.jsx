'use client';
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

export default function CameraPage() {
  const videoRef = useRef(null);
  const [image, setImage] = useState('');

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const constraints = {
        video: {
          facingMode: 'environment',
        },
      };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => console.error('Error accessing camera:', error));
    }
  }, []);

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/png');
      setImage(imageData); // Save the captured image's data URL
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: '100%' }}
        className="rounded-3xl"
      ></video>
      <button onClick={captureImage}>Capture Image</button>
      {image && (
        <>
          <p>Image Captured:</p>
          <Image
            className="rounded-3xl"
            src={image}
            width={300}
            height={300}
            alt="Captured from camera"
            style={{ width: '100%' }}
          />
        </>
      )}
    </div>
  );
}
