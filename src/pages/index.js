import { useState } from "react";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === "") {
      setErrors({ name: "Name is required" });
      return;
    }

    if (email === "") {
      setErrors({ email: "Email is required" });
      return;
    }

    const regex =
      // eslint-disable-next-line no-useless-escape
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
    if (!regex.test(email)) {
      setErrors({ email: "Please enter a valid email" });
      return;
    }

    setIsSubmitting(true);
    https: try {
      const response = fetch(
        "https://script.google.com/macros/s/AKfycbzttTQBhwk3dMcvBPcE58ZfJqzaUKqIUdi5lxFGBQiE73CBdeqxZwBIGBhm-p2ckeUQ/exec",
        {
          method: "POST",
          body: JSON.stringify({
            Name: name,
            Email: email,
          }),
          mode: "no-cors",
          credentials: "include", // include, *same-origin, omit
          redirect: "follow",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });

      if (response.ok) {
        // show success message or redirect to thank you page
        console.log("Form submitted successfully!");
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // handle error here
    } finally {
      setIsSubmitting(false);
    }
  };
    function Submit(e) {
      const formEle = document.querySelector("form");
      const formDatab = new FormData(formEle);
      fetch(
        "https://script.google.com/macros/s/AKfycbzL1q_VM82Vb6iGYoSJ97NObIFbpvoNjW4NEkpmK3jsb_23D8Y44rXXGKIJkc47syM9/exec",
        {
          method: "POST",
          body: formDatab,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

  return (
    <div>
      <form name="form" onSubmit={(e) => Submit(e)}>
        <label htmlFor="name">Name:</label>
        <input
          placeholder="Your Name"
          name="Name"
          type="text"
          className={`border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } px-2 py-1`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <label htmlFor="email">Email:</label>
        <input
          placeholder="Your Email"
          name="Email"
          type="text"
          className={`border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } px-2 py-1`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:pointer-events-none"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Form;
