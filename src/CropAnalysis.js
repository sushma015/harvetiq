import './App.css';
import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';
function CropAnalysis()
{
    const Prediction = () => {
        const [selectedFile, setSelectedFile] = useState(null);
        const [imageUrl, setImageUrl] = useState('');
        const [analysisResult, setAnalysisResult] = useState(null);
        AWS.config.update({
          accessKeyId: 'AKIAVFIWJFLUZVBXJ2AS',
          secretAccessKey: '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',
          region: 'us-east-1',
        });
        const s3 = new AWS.S3();
        const params = {
          Bucket: 'crop-test-bucket',
          
        };
      
        useEffect(()=>{
          deleteAllFiles();
          // eslint-disable-next-line react-hooks/exhaustive-deps
        },[]);
        const deleteAllFiles = async () => {
          try {
            // List all objects in the bucket
            const listObjects = await s3.listObjectsV2(params).promise();
            if (listObjects.Contents.length === 0) return;
      
            // Create a list of objects to delete
            const deleteParams = {
              Bucket: params.Bucket,
              Delete: { Objects: [] },
            };
      
            listObjects.Contents.forEach(({ Key }) => {
              deleteParams.Delete.Objects.push({ Key });
            });
      
            // Delete all objects
            await s3.deleteObjects(deleteParams).promise();
            console.log('All files deleted successfully');
          } catch (error) {
            console.error('Error deleting files:', error);
          }
        };
      
      
        const handleFileChange = (event) => {
          setSelectedFile(event.target.files[0]);
        };
      
        const handleUpload = async () => {
          if (!selectedFile) return;
      
          // Configure AWS SDK
          AWS.config.update({
            accessKeyId: 'AKIAVFIWJFLUZVBXJ2AS',
            secretAccessKey: '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',
            region: 'us-east-1',
          });
      
          const s3 = new AWS.S3();
          const params = {
            Bucket: 'crop-test-bucket',
            Key: selectedFile.name,
            Body: selectedFile,
            ContentType: selectedFile.type,
          };
      
          try {
            // Upload image to S3
            const uploadResult = await s3.upload(params).promise();
            setImageUrl(uploadResult.Location);
            console.log(imageUrl)
            // Call Rekognition Custom Labels
            const rekognition = new AWS.Rekognition();
            const rekognitionParams = {
              Image: {
                S3Object: {
                  Bucket: params.Bucket,
                  Name: params.Key,
                },
              },
              ProjectVersionArn: 'arn:aws:rekognition:us-east-1:354918410985:project/crop-diseases/version/crop-diseases.2024-09-02T21.46.24/1725293783707',
            };
      
            const rekognitionResult = await rekognition.detectCustomLabels(rekognitionParams).promise();
            setAnalysisResult(rekognitionResult.CustomLabels);
          } catch (error) {
            console.error('Error uploading file or analyzing image:', error);
          }
        };
      
        return (<><div id="crop-pred">
            <div id="pred-img"><img alt="" id='img-png' src='https://media.istockphoto.com/vectors/smiling-man-watering-a-plant-with-watering-can-agriculture-flat-style-vector-id1309060088?k=20&m=1309060088&s=612x612&w=0&h=CuHYiEMiGHFlHB9NzbbXxhYKzK7YwK8zRIdTi6ogGRI='></img></div>
          <center><div id="pred">
            <h2 style={{marginTop:'50px', color:'#066906'}}>Upload and Analyze Disease</h2>
            <input type="file" onChange={handleFileChange} style={{marginTop:'50px'}}/><br></br><br></br>
            <button onClick={handleUpload} id="btn">Analyze</button>
          </div></center>
          {analysisResult && (
  <div id="output">
    <span id="close-btn" onClick={() => { setAnalysisResult(null); }}>❌</span>
    <h2 style={{ color: '#066906' }}>Result</h2>
    <pre>
    {JSON.stringify(analysisResult)}
    </pre>
  </div>
)}</div>
          </>
        );
      };
      
    return(<>
    <div id="cropHome">
        <div id="crop">
        <h1 id="crop-ttl">“Empowering farmers with instant crop disease detection through the power of a single picture”</h1>
        </div>
    </div>
    <Prediction></Prediction>
    </>);
}
export default CropAnalysis;