import React, { useEffect, useState } from "react";
import createMachine from "../services/axios-create.js";

export default function Form({
  setIsCreate,
  dataOld,
  setFormRow,
  model,
  formEntryData,
}) {
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    if (dataOld) {
      setFormValues(dataOld);
    } else {
      const initialValues = {};
      formEntryData.forEach((data) => {
        if (data.options && data.options.length > 0) {
          initialValues[data.placeholder] = data.options[0].value;
        } else {
          initialValues[data.placeholder] = "";
        }
      });
      setFormValues(initialValues);
    }
  }, [dataOld, formEntryData]);

  const validateField = (name, value) => {
    let error = "";
    const field = formEntryData.find((f) => f.placeholder === name);

    if (!field) {
      console.warn(`Field ${name} not found in formEntryData`);
      return error;
    }

    if (field.required && !value) {
      error = "This field is required";
    } else if (field.type === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "Invalid email address";
    } else if (field.type === "number" && isNaN(value)) {
      error = "Must be a number";
    } else if (field.type === "date") {
      const inputDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (inputDate < today) {
        error = "Date must not be in the past";
      }
    } else if (field.minLength && value.length < field.minLength) {
      error = `Must be at least ${field.minLength} characters`;
    } else if (field.maxLength && value.length > field.maxLength) {
      error = `Must not exceed ${field.maxLength} characters`;
    }

    return error;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    const error = validateField(name, value);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate all fields before submission
    const errors = {};
    Object.keys(formValues).forEach((key) => {
      const error = validateField(key, formValues[key]);
      if (error) {
        errors[key] = error;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const method = Object.keys(dataOld || {}).length > 0 ? "edit" : "create";

    createMachine(formValues, setFormValues, method, model)
      .then(() => {
        setShowSuccessAlert(true);
        if (method === "edit") {
          setFormRow(null);
        }
        setTimeout(() => {
          setIsCreate(false);
        }, 1000);
      })
      .catch((error) => {
        alert("An error occurred. Please try again");
      });
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setDarkMode(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setIsCreate(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      window.removeEventListener("keydown", handleEsc);
    };
  }, [setIsCreate]);

  return (
    <div
      className={`w-full z-40 h-screen items-center justify-center p-10 backdrop-blur-lg shadow rounded-md bg-inherit flex flex-col fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
    >
      <div className="md:w-[60dvw] shadow rounded-md flex bg-white_modified flex-col p-5">
        <div className="text-center font-bold text-2xl bg-color_extra py-5 rounded-sm">
          Add new machine
        </div>
        <div className="p-5">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {formEntryData.map((data, index) => (
                <div key={index}>
                  <label
                    htmlFor={data.placeholder}
                    className="block font-medium"
                    style={{
                      color: darkMode ? "black" : "white",
                      fontSize: "1.3rem",
                    }}
                  >
                    {data.name}
                  </label>
                  {data.options ? (
                    <select
                      id={data.placeholder}
                      name={data.placeholder}
                      value={formValues[data.placeholder] || ""}
                      onChange={handleChange}
                      required={data.required}
                      className="mt-2 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-black"
                    >
                      {data.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={data.placeholder}
                      name={data.placeholder}
                      value={formValues[data.placeholder] || ""}
                      onChange={handleChange}
                      placeholder={data.placeholder}
                      required={data.required}
                      type={data.type}
                      min={
                        data.type === "date"
                          ? new Date().toISOString().split("T")[0]
                          : undefined
                      }
                      className="mt-2 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-black"
                    />
                  )}
                  {formErrors[data.placeholder] && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors[data.placeholder]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="p-3 flex gap-2 justify-end">
              <button
                className="bg-color_button text-black border shadow-md px-4 py-1 rounded-md"
                style={{
                  fontSize: "1.5rem",
                  color: darkMode ? "white" : "black",
                }}
                type="submit"
              >
                SUBMIT
              </button>
              <button
                type="button"
                className="bg-action text-black border shadow-md px-4 py-1 rounded-md"
                onClick={() => {
                  setFormValues({});
                  setFormErrors({});
                }}
              >
                CLEAR FORM
              </button>
              <button
                className={`bg-color_button text-black border shadow-md px-4 py-1 rounded-md`}
                onClick={() => setIsCreate(false)}
                type="button"
              >
                CLOSE
              </button>
            </div>
          </form>
        </div>

        {showSuccessAlert && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative m-5"
            role="alert"
          >
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Data saved successfully</span>
            <span
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
              onClick={() => setShowSuccessAlert(false)}
            >
              <svg
                className="fill-current h-6 w-6 text-green-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
