import imageCompression from "browser-image-compression";

const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 800,
  useWebWorker: true,
};

function imageCompressor(originalImage, setImage) {
  imageCompression(originalImage, options).then(compressed_img => {
    setImage(URL.createObjectURL(compressed_img));
  });
}

export default imageCompressor;
