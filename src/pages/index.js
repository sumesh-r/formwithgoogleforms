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
      const response = await fetch(
        "https://docs.google.com/forms/u/0/d/e/1FAIpQLScErRER2CdS2MOiaFv0D0j0ezo4_-0c26UZynZQYnoe2IM8jg/formResponse",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `entry.1543894947=${name}&entry.2065254615=${email}`, // replace the entry IDs with the actual ones from your form
        }
      );

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

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={`border ${
          errors.name ? "border-red-500" : "border-gray-300"
        } px-2 py-1`}
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
  );
};

export default Form;
