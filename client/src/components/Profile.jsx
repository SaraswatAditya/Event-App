import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../helper/validate";
import { logout } from "../store/authSlice";
import extend from "../styles/Profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../features/api/apiSlice";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, apiData, serverError } = useSelector((state) => state.api);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [reload, setReload] = useState(false);
  const username = useSelector((state) => state.auth.auth.username);
  // console.log(`${import.meta.env.VITE_SERVER_DOMAIN}${apiData?.image}`);

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || "",
      lastName: apiData?.lastName || "",
      email: apiData?.email || "",
      mobile: apiData?.mobile || "",
      address: apiData?.address || "",
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      if (file) {
        formData.append("image", file);
      }
      // console.log("Username is ", username);
      const token = localStorage.getItem("token");
      try {
        await axios.put("/api/updateuser", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setReload(true);
        toast.success("Update Successfully");
      } catch (error) {
        toast.error("Could Not Update!");
      }
    },
  });

  useEffect(() => {
    if (reload) {
      dispatch(fetchUserData(username));
    }
  }, [reload]);

  const onUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (uploadedFile) {
      reader.readAsDataURL(uploadedFile);
    }
  };

  const userLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div
          className={`${styles.glass} ${extend.glass}`}
          style={{ width: "40%", padding: "3em" }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              You can update the details.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={
                    preview ||
                    file ||
                    `${import.meta.env.VITE_SERVER_DOMAIN}${apiData?.image}` ||
                    avatar
                  }
                  className={`${styles.profile_img} ${extend.profile_img}`}
                  alt="avatar"
                />
              </label>
              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("firstName")}
                  type="text"
                  className={`${styles.textbox} ${extend.textbox}`}
                  placeholder=" FirstName"
                />
                <input
                  {...formik.getFieldProps("lastName")}
                  type="text"
                  className={`${styles.textbox} ${extend.textbox}`}
                  placeholder=" LastName"
                />
              </div>

              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("mobile")}
                  type="text"
                  className={`${styles.textbox} ${extend.textbox}`}
                  placeholder=" Mobile No."
                />
                <input
                  {...formik.getFieldProps("email")}
                  type="text"
                  className={`${styles.textbox} ${extend.textbox}`}
                  placeholder=" Email"
                />
              </div>

              <input
                {...formik.getFieldProps("address")}
                type="text"
                className={`${styles.textbox} ${extend.textbox}`}
                placeholder=" Address"
              />
              <button className={styles.btn} type="submit">
                Update
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Come back later?
                <button onClick={userLogout} className="text-red-500" to="/">
                  Logout
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
