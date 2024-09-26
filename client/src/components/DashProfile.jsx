import React, { useState, useRef, useEffect } from "react";
import { Alert, Avatar, Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { DashSidebar } from "./DashSidebar";
import { HiUser } from "react-icons/hi";

// firebase
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";

// circularbar
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const DashProfile = () => {
  const [imageFile, setImageFile] = useState(null);
  // making  a temporary URL
  const [imageFileUrl, setImageFileUrl] = useState(null);
  console.log(imageFileUrl);
  // upload file state
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);

  const filePickerRef = useRef();
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  const theme = useSelector((state) => state.theme.theme);

  const sidebarBgClass = theme === "dark" ? "bg-slate-800" : "bg-slate-200";

  // image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  return (
    <div className=" flex flex-col md:flex-row">
      <DashSidebar className={sidebarBgClass} />
      <main className="mx-auto mt-8 w-full md:w-4/5">
        <h1 className="text-xl font-bold text-center">Profile</h1>

        <form className="flex flex-col gap-3 my-8 w-4/5  mx-auto md:w-3/6 items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={filePickerRef}
            className="hidden"
          />
          <div
            className="my-5 w-24 h-24 rounded-full border-2 border-lightgray flex items-center justify-center"
            onClick={() => filePickerRef.current.click()}
          >
            {imageFileUploadProgress && (
              <CircularProgressbar
                value={imageFileUploadProgress || 0}
                text={`${imageFileUploadProgress}%`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  },
                  path: {
                    stroke: `rgba(62, 152, 199, ${
                      imageFileUploadProgress / 100
                    })`,
                  },
                }}
              />
            )}
            {imageFileUrl || currentUser.profilepicture ? (
              <img
                alt="profile-picture"
                src={imageFileUrl || currentUser.profilepicture}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <HiUser size={80} className="    rounded-full" /> // Placeholder icon if no image is set
            )}
          </div>
          {imageFileUploadError && (
            <Alert color="failure">{imageFileUploadError}</Alert>
          )}

          <input
            type="text"
            placeholder="name"
            className="rounded-md w-full"
            value={currentUser.username}
            readOnly
          />
          <input
            type="email"
            placeholder="email"
            className="rounded-md w-full"
            value={currentUser.email}
            readOnly
          />
          <input
            type="password"
            className="w-full rounded-md"
            placeholder="****"
          />
          <Button className="w-full rounded-md border p-2 text-lg">
            Update
          </Button>
        </form>
        <div className="text-red-500 w-4/5 flex justify-between mx-auto mb-5">
          <p className="hover:cursor-pointer">Delete Account</p>
          <p className="hover:cursor-pointer">Sign out</p>
        </div>
      </main>
    </div>
  );
};
