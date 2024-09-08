import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
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
  //2:20
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all the fields.");
    }
    try {
      setLoading(true);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Clear form data and error messages upon successful submission
        setFormData({});
        setErrorMessage(null);
        // Optionally redirect or show a success message
        navigate("/signin");
      } else {
        // Handle server-side errors
        setErrorMessage(data.message || "An error occurred. Please try again.");
      }
      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen mt-20 border ">
      <div className="flex p-3 max-w-3xl md:mx-auto  gap-7 flex-col md:flex-row md:items-center border mx-5">
        {/* left */}
        <div className="flex-1 ">
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
            This is a demo project. You can sign up or use "a@a.com" ,"1234" to
            explore my project.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                onChange={handleOnChange}
                placeholder="Username"
                id="username"
                value={formData.username || ""}
              />
            </div>
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
                placeholder="Password"
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
                "Sign Up"
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
