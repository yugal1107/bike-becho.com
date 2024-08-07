import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function SellPage() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const saveFile = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "myCloud");
    data.append("cloud_name", "dtzjzuoud");

    try {
      if (file === null) {
        return toast.error("Please Upload a file");
      }

      // Determine the upload URL based on file type
      const isImage = file.type.startsWith("image/");
      const uploadUrl = isImage
        ? "https://api.cloudinary.com/v1_1/dtzjzuoud/image/upload"
        : "https://api.cloudinary.com/v1_1/dtzjzuoud/video/upload";

      const res = await fetch(uploadUrl, {
        method: "POST",
        body: data,
      });

      const cloudData = await res.json();
      console.log(cloudData);
      setUrl(cloudData.url);

      toast.success("File Uploaded Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(url);
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-[#2C3A47] p-10 rounded-xl">
        <div className="input flex justify-center mb-5">
          <label htmlFor="file-upload" className="custom-file-upload">
            {file ? (
              file.type.startsWith("image/") ? (
                <img
                  className="w-72 lg:w-96 rounded-xl"
                  src={URL.createObjectURL(file)}
                  alt="preview"
                />
              ) : (
                <video
                  className="w-72 lg:w-96 rounded-xl"
                  controls
                  src={URL.createObjectURL(file)}
                  alt="preview"
                />
              )
            ) : (
              <img
                src="https://cdn-icons-png.flaticon.com/128/1665/1665680.png"
                className="h-20 w-20"
                alt="upload-icon"
              />
            )}
          </label>
          <input
            id="file-upload"
            className="text-white"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="">
          <Button className="w-72 lg:w-96 bg-[#FC427B]" onClick={saveFile}>
            Upload
          </Button>
          <Toaster />
        </div>
      </div>
    </div>
  );
}

export default SellPage;
