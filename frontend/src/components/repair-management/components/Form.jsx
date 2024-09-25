import { useEffect, useState } from "react";
import formEntryData from "../data-files/form-entry-data.js";
import createMachine from "../services/axios-create.js";
import Alert from "@mui/material/Alert";

export default function Form({ setIsCreate, data, setFormRow }) {
  const [formValues, setFormValues] = useState({
    item_id: "",
    name: "",
    m_status: "",
    type: "",
    driver_id: "",
    registration_number: "",
  });
  const [darkMode, setDarkMode] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    if (data) {
      setFormValues(data);
    }
  }, [data]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    console.log(data);
    let method;
    if (Object.keys(data).length > 0) {
      method = "edit";
      createMachine(formValues, setFormValues, method)
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
      createMachine(formValues, setFormValues, method)
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
                    value={formValues[data.placeholder]}
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
                    value={formValues[data.placeholder]}
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
  );
}
