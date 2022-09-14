import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import "./App.css";
import { storage } from "./firebase";
function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "post_images/");

  const uploadImage = () => {
    if (imageUpload == null) return;
    console.log(imageUpload);
    const imageRef = ref(storage, `post_images/${v4()}`);
    for (let i = 0; i < imageUpload.length; i++) {
      console.log(imageUpload[i]);
      uploadBytes(imageRef, imageUpload[i]).then((snapShot) => {
        console.log(snapShot);
        getDownloadURL(snapShot.ref).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    }
  };
  useEffect(() => {
    console.log(imageList);
    /*  listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    }); */
  }, [imageList]);
  return (
    <div className="App">
      <input
        type="file"
        multiple={true}
        accept="image/*,image/jpeg"
        onChange={(event) => setImageUpload(event.target.files)}
      />
      <button onClick={uploadImage}>Upload Image</button>
      {imageList.map((url) => {
        return <img src={url} style={{ width: "200px" }} key={v4()} />;
      })}
    </div>
  );
}

export default App;
