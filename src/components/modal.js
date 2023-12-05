import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Box, Modal } from "@material-ui/core";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../UserContext";
const emailRegex = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short")
    .max(30, "Too Long")
    .required("Required"),
  username: Yup.string()
    .min(3, "Too Short")
    .max(30, "Too Long")
    .required("Required"),
  email: Yup.string()
    .email("Invalid Email")
    .required("Required")
    .matches(emailRegex, "Invalid Email"),
  phone: Yup.number().required("Required"),
  website: Yup.string().required("Required"),
});
const UserModal = () => {
  const {
    id,
    open,
    setOpen,
    submit,
    setSubmit,
    isUpdate,
    setUsers,
    initialState,
    setInitialState,
  } = useContext(UserContext);
  const handleClose = () => {
    setOpen(false);
  };
  const AddUsers = async (values) => {
    var data = JSON.stringify({
      name: values.name,
      username: values.username,
      email: values.email,
      phone: values.phone,
      website: values.website,
    });

    var config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: "http://localhost:5001/users/",
      headers: { "Content-Type": "application/json" },
      data: data,
    };

    try {
      await axios.request(config);
      await GetUsers();
      handleClose();
    } catch (error) {
      alert(error);
    }
  };
  const createProfile = async (values) => {
    var data = JSON.stringify({
      type: "profile",
      attributes: {
      first_name: values.name,
      email: values.email,
      phone_number: values.phone,
      }
      
    });
  }
  const GetUsers = async () => {
    var requestOptions = {
      method: "GET",
    };

    const response = await fetch(
      "http://localhost:5001/users/",
      requestOptions
    );
    const data = await response.json();
    setUsers(data);
  };
  const UpdateUser = async (values) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: values.name,
      username: values.username,
      email: values.email,
      phone: values.phone,
      website: values.website,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(`http://localhost:5001/users/${id}`, requestOptions);
    await GetUsers();
    handleClose();
    clear();
  };
  const clear = () => {
    handleClose();
    setInitialState({
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
    });
    setSubmit(true);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        className="flex justify-center items-center bg-white"
      >
        <Box className="bg-white rounded-lg w-auto p-5">
          <Formik
            initialValues={initialState}
            validationSchema={FormSchema}
            onSubmit={(values) => {
              if (submit) {
                AddUsers(values);
              }
            }}
          >
            {({
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              values,
            }) => {
              return (
                <form className="ml-2" onSubmit={handleSubmit}>
                  <label className="text-lg">Name</label>
                  <br />
                  <input
                    value={values.name}
                    onBlur={handleBlur}
                    name="name"
                    className="border border-gray-700 text-lg p-1 rounded-lg"
                    onChange={handleChange}
                  ></input>
                  {errors.name && touched.name ? (
                    <div style={{ color: "red" }}>{errors.name}</div>
                  ) : null}
                  <br />
                  <label className="text-lg">Username</label>
                  <br />
                  <input
                    value={values.username}
                    onBlur={handleBlur}
                    name="username"
                    className="border border-gray-700  text-lg p-1 rounded-lg"
                    onChange={handleChange}
                  ></input>
                  {errors.username && touched.username ? (
                    <div style={{ color: "red" }}>{errors.username}</div>
                  ) : null}
                  <br />
                  <label className="text-lg">Email</label>
                  <br />
                  <input
                    value={values.email}
                    onBlur={handleBlur}
                    name="email"
                    type="email"
                    className="border border-gray-700  text-lg p-1 rounded-lg"
                    onChange={handleChange}
                  ></input>
                  {errors.email && touched.email ? (
                    <div style={{ color: "red" }}>{errors.email}</div>
                  ) : null}
                  <br />
                  <label className="text-lg">Phone</label>
                  <br />
                  <input
                    value={values.phone}
                    onBlur={handleBlur}
                    name="phone"
                    type="tel"
                    className="border border-gray-700  text-lg p-1 rounded-lg"
                    onChange={handleChange}
                  ></input>
                  {errors.phone && touched.phone ? (
                    <div style={{ color: "red" }}>{errors.phone}</div>
                  ) : null}
                  <br />
                  <label className="text-lg">Website</label>
                  <br />
                  <input
                    value={values.website}
                    onBlur={handleBlur}
                    name="website"
                    className="border border-gray-700  text-lg p-1 rounded-lg"
                    onChange={handleChange}
                  ></input>
                  {errors.website && touched.website ? (
                    <div style={{ color: "red" }}>{errors.website}</div>
                  ) : null}
                  <br />
                  {submit && (
                    <button
                      type="submit"
                      className="bg-green-600 ml-2 mt-2 rounded-md text-white p-2"
                    >
                      Submit
                    </button>
                  )}

                  {isUpdate && (
                    <button
                      className="bg-yellow-400 ml-2 mt-0 rounded-md text-white p-2"
                      onClick={() => UpdateUser(values)}
                    >
                      Update
                    </button>
                  )}
                  <button
                    className="bg-red-400 ml-2 mt-2 rounded-md text-white p-2"
                    onClick={clear}
                  >
                    Cancel
                  </button>
                </form>
              );
            }}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default UserModal;
