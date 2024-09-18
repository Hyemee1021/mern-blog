import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signinService } from "../../../api/services/signinService";
export const Signin = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };
  //
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return setErrorMessage("Please fill out all the fields.");
    }
    try {
      setLoading(true);
      const data = await signinService(formData);

      if (data.success === false) {
        return setErrorMessage(data.message);
      } else {
        // succecss=== true
        // Clear form data and error messages upon successful submission
        setFormData({});
        setErrorMessage(null);

        // Ensure loading state is turned off before navigation
        setLoading(false);

        // Optionally redirect or show a success message
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen mt-20 border ">
      <div className="flex p-3 max-w-3xl md:mx-auto  gap-7 flex-col md:flex-row md:items-center border mx-5">
        {/* left */}
        <div className="flex-1  flex-col flex items-center mt-5 md:mt-0">
          <Link
            to="/"
            className="self-center text-3xl font-bold dark:text-white"
          >
            <span className="px-3 py-1  rounded-full text-white   drop-shadow bg-gradient-to-r from-pink-500 via-yello-500 to-orange-500">
              HyeMee
            </span>
            's Blog
          </Link>

          <p className="text-sm mt-5">
            {" "}
            This is a demo project. You can sign in with "a@a.com" ,"1234" or
            sign up with your own.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div>
              <Label value="Your email" />
              <TextInput
                onChange={handleOnChange}
                type="email"
                placeholder="name@company.com"
                id="email"
                value={formData.email || ""}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                onChange={handleOnChange}
                placeholder="******"
                id="password"
                value={formData.password || ""}
              />
            </div>
            <Button
              type="submit"
              gradientDuoTone="pinkToOrange"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="flex gap-2 text-sm mt-2">
            <span>Have an account?</span>
            <Link to="/signin" className=" font-semibold text-blue-600">
              here
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};
