'use client';
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

export default function CameraPage() {
  const videoRef = useRef(null);
  const [image, setImage] = useState('');
  const [foodInfo, setFoodInfo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Set up the video stream
  useEffect(() => {
    const enableStream = async () => {
      try {
        const constraints = { video: { facingMode: 'environment' } };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing the camera:', error);
      }
    };

    enableStream();
  }, []);

  // Capture the image from the video stream
  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = canvas
        .toDataURL('image/png')
        .replace('data:image/png;base64,', '');
      setImage(imageData);
      identifyFood(imageData);
    }
  };

  // Send the captured image to OpenAI's API for analysis
  const identifyFood = (base64Image) => {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY; // Replace this with your actual OpenAI API key
    console.log(apiKey + 'This is the api key');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    };
    const payload = {
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Your job is to decipher the food object in the image, describe the food object and state whether it is healthy or not. Then, leave two lines of blank space and output strictly this format: "Total estimated calories: xx <skip a line here> Total estimated carbohydrates: <skip a line here> Total estimated protein: <skip a line here> Total estimated fat: ". If the image is not decipherable or if there is no food object, just state "Cannot detect food object". ',
            },
            {
              type: 'image_url',
              image_url: { url: `data:image/jpeg;base64,${base64Image}` },
            },
          ],
        },
      ],
      max_tokens: 300,
    };

    setIsLoading(true); // Set loading to true before the request

    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false); // Set loading to false after getting the response
        console.log(data); // Log the response data from OpenAI
        // Check if the necessary data exists in the response
        if (
          data.choices &&
          data.choices.length > 0 &&
          data.choices[0].message
        ) {
          let content = data.choices[0].message.content; // Extract content
          // Enhancing string formatting with additional line breaks and gaps
          if (content.includes('Total estimated calories')) {
            content = content.replace(
              'Total estimated calories',
              'Nutritional Information:\nTotal estimated calories',
            );
            content = content.replace(
              'Total estimated calories',
              'Total estimated calories',
            );
            content = content.replace(
              'Total estimated carbohydrates',
              'Total estimated carbohydrates',
            );
            content = content.replace(
              'Total estimated protein',
              'Total estimated protein',
            );
            content = content.replace(
              'Total estimated fat',
              'Total estimated fat',
            );
          }
          setFoodInfo(content); // Store the formatted food information
          setModalOpen(true); // Open the modal
        } else {
          throw new Error('Invalid data structure');
        }
      })
      .catch((error) => {
        console.error('Error processing image:', error);
        setIsLoading(false);
      });
  };

  // Render the component UI
  return (
    <div className="mb-100 justify-center items-center flex flex-col items-center">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full rounded-3xl"
      ></video>
      <button
        onClick={captureImage}
        className="m-2 bg-blue-500 hover:bg-blue-700 items-center text-white font-bold py-2 px-4 rounded"
      >
        📸 Capture Image
      </button>
      {isLoading && (
        <div className="text-center">
          <p>Analyzing Image...</p>
        </div>
      )}
      {image && (
        <div className="mb-20">
          <div className="flex flex-col items-center font-bold">
            Image Captured:
          </div>
          <Image
            src={`data:image/jpeg;base64,${image}`}
            width={300}
            height={200}
            alt="Captured from camera"
            className="w-full"
          />
          {/* Button to reopen the modal */}
          <button
            onClick={() => setModalOpen(true)}
            className="mt-2 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded block mx-auto"
          >
            View Analysis
          </button>
        </div>
      )}
      {modalOpen && foodInfo && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm mx-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              🥦Calo<span className="text-orange-500">bro.</span> Food Analysis
            </h3>
            <div className="text-gray-600 mb-5 whitespace-pre-line">
              {foodInfo}
            </div>
            <div className="flex justify-around">
              <button
                onClick={() => console.log('Add to daily intake')}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Add to Daily Intake
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
