import { useEffect, useState } from "react";
import createMachine from "../services/axios-create.js";
import Alert from "@mui/material/Alert";

export default function Form({
  setIsCreate,
  dataOld,
  setFormRow,
  model,
  formEntryData,
}) {
  const [formValues, setFormValues] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    if (dataOld) {
      setFormValues(dataOld);
    }
  }, [dataOld]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    console.log(formValues);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    let method;
    if (Object.keys(dataOld).length > 0) {
      method = "edit";
      createMachine(formValues, setFormValues, method, model)
        .then(() => {
          setShowSuccessAlert(true);
          setFormRow(null);
          //close the form in 1 seconds
          setTimeout(() => {
            setIsCreate(false);
          }, 1000);
        })
        .catch((error) => {
          alert("An error occurred. Please try again");
        });
    } else {
      method = "create";
      createMachine(formValues, setFormValues, method, model)
        .then(() => {
          setShowSuccessAlert(true);
          //close the form in 1 seconds
          setTimeout(() => {
            setIsCreate(false);
          }, 1000);
        })
        .catch((error) => {
          alert("An error occurred. Please try again");
        });
    }
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

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div
      className={`w-full z-40 h-screen items-center justify-center p-10 backdrop-blur-lg shadow rounded-md bg-inherit flex flex-col  fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
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
                      color: darkMode ? "black" : "black",
                      fontSize: "1.3rem",
                    }}
                  >
                    {data.name}
                  </label>
                  {data.options ? (
                    <select
                      id={data.placeholder}
                      name={data.placeholder}
                      value={data ? formValues[data.placeholder] : ""}
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
                      //if data.value is not null, set the value to data.value else set it to an empty string
                      value={
                        data.value ? data.value : formValues[data.placeholder]
                      }
                      onChange={handleChange}
                      placeholder={data.placeholder}
                      required={data.required}
                      type={data.type}
                      className="mt-2 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-black"
                    />
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
                onClick={() =>
                  setFormValues({
                    item_id: "",
                    name: "",
                    type: "",
                    driver_id: "",
                    registration_number: "",
                  })
                }
              >
                CLEAR FORM
              </button>
              <button
                className={`bg-color_button text-black border shadow-md px-4 py-1 rounded-md`}
                onClick={() => setIsCreate(false)}
                type={"button"}
              >
                CLOSE
              </button>
            </div>
          </form>
        </div>

        {showSuccessAlert && (
          <Alert
            onClose={() => setShowSuccessAlert(false)}
            severity="success"
            className="m-5"
          >
            Data saved successfully
          </Alert>
        )}
      </div>
    </div>
  );
}
