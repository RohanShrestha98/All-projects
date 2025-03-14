// ***Here is the code for converting "image source" (url) to "Base64".***

import { toast } from "react-toastify";

const toDataURL = url =>
  fetch(url)
    .then(response => response.blob())
    .then(
      blob =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }),
    )
    .catch(error => {
      toast.error(error);
    });

// // ***Here is code for converting "Base64" to javascript "File Object".***

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

// // *** Calling both above function ***

const urlToImage = (url, fileName) => {
  var fileArr = [];
  toDataURL(url).then(dataUrl => {
    var fileData = dataURLtoFile(dataUrl, fileName);
    fileArr.push(fileData);
  });
  return fileArr;
};

export default urlToImage;
