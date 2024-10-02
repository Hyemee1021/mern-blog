import React, { useState, useRef, useEffect } from "react";
import { Alert, Avatar, Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { DashSidebar } from "./DashSidebar";
import { HiUser } from "react-icons/hi";

// firebase
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

// circularbar
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";

export const DashProfile = () => {
  const [imageFile, setImageFile] = useState(null);
  // making  a temporary URL
  const [imageFileUrl, setImageFileUrl] = useState(null);
  console.log(imageFileUrl);
  // upload file state
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [imageFileUploadSuccess, setImageFileUploadSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
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

  useEffect(() => {
    return () => {
      if (imageFileUrl) {
        URL.revokeObjectURL(imageFileUrl);
      }
    };
  }, [imageFileUrl]);

  const uploadImage = async () => {
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
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    if (Object.keys(formData).length === 0 && !imageFileUrl) {
      setUpdateUserError("No changes made");
      return;
    }

    if (imageFileUploading) {
      setUpdateUserError(" Please wait for image to upload");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, profilePicture: imageFileUrl }),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully.");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  console.log(formData);

  return (
    <div className=" flex flex-col md:flex-row">
      <DashSidebar className={sidebarBgClass} />
      <main className="mx-auto mt-8 w-full md:w-4/5">
        <h1 className="text-xl font-bold text-center">Profile</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 my-8 w-4/5  mx-auto md:w-3/6 items-center"
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={filePickerRef}
            className="hidden"
          />
          <div
            className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full  flex items-center justify-center"
            onClick={() => filePickerRef.current.click()}
          >
            {imageFileUploadProgress && (
              <CircularProgressbar
                value={imageFileUploadProgress || 0}
                text={`${imageFileUploadProgress}%`}
                strokeWidth={3}
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
                className="w-full h-full object-cover "
              />
            ) : (
              <HiUser size={80} className="border p-2 rounded-full  " /> // Placeholder icon if no image is set
            )}
          </div>
          {imageFileUploadError && (
            <Alert color="failure">{imageFileUploadError}</Alert>
          )}

          <input
            type="text"
            id="username"
            placeholder="name"
            className="rounded-md w-full"
            defaultValue={currentUser.username}
            onChange={handleChange}
          />
          <input
            type="email"
            id="email"
            placeholder="email"
            className="rounded-md w-full"
            defaultValue={currentUser.email}
            readOnly
          />
          <input
            type="password"
            id="password"
            className="w-full rounded-md"
            placeholder="****"
            onChange={handleChange}
          />
          <Button
            className="w-full rounded-md border p-2 text-lg"
            type="submit"
          >
            Update
          </Button>
        </form>
        <div className="text-red-500 w-4/5 flex justify-between mx-auto mb-5">
          <p className="hover:cursor-pointer">Delete Account</p>
          <p className="hover:cursor-pointer">Sign out</p>
        </div>

        {updateUserSuccess && (
          <Alert color="succcess" className="mt-5">
            {updateUserSuccess}
          </Alert>
        )}

        {updateUserError && (
          <Alert color="failure" className="mt-5">
            {updateUserError}
          </Alert>
        )}
      </main>
    </div>
  );
};
