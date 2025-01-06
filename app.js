const { S3Client, PutObjectCommand, ListObjectsCommand } = require("@aws-sdk/client-s3");
const fs = require('fs');

const s3Client = new S3Client({
  endpoint: "http://localhost:9000", // MinIO server address
  region: "eu-north-1", // MinIO doesn't require a specific region
  credentials: {
    accessKeyId: "ojvind.otterbjork", // Replace with your access key
    secretAccessKey: "Pp30s3n56dl" // Replace with your secret key
  },
  forcePathStyle: true // Required for MinIO
});

async function uploadFile(bucketName, key, filePath) {
  const fileContent = fs.readFileSync(filePath);
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: fileContent
  });

  try {
    const response = await s3Client.send(command);
    console.log("File uploaded successfully", response);
  } catch (err) {
    console.error("Error uploading file", err);
  }
}

async function listObjects(bucketName) {
  const command = new ListObjectsCommand({
    Bucket: bucketName
  });

  try {
    const response = await s3Client.send(command);
    console.log("Objects in bucket:", response.Contents);
  } catch (err) {
    console.error("Error listing objects", err);
  }
}

// Usage
const bucketName = "ojvind.otterbjork.minio";
uploadFile(bucketName, "alps2.jpg", "alps.jpg");
listObjects(bucketName);