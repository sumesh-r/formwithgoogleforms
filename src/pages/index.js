import { useForm } from "react-hook-form";

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }, // catch error messages
  } = useForm();

  function submitHandler(data) {
    // const photoData = data.photo[0];// assuming the photo input name is 'photo'
    // data.photoData = photoData
    // console.log(data);
    fetch("/api/sheet", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    reset(); // clears the input on submitting
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-400">
      <form onSubmit={handleSubmit(submitHandler)} className="w-full max-w-lg ">
        <div className="mb-4">
          <label htmlFor="Name" className="block font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="Name"
            name="Name"
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            {...register("Name", {
              required: "Please enter your Name",
            })}
          />
          {errors.Name && errors.Name.message}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="Email"
            name="Email"
            {...register("Email", { required: "Enter your Email!" })}
            className="w-full border-gray-700 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.Email && errors.Email.message}
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block font-medium mb-2">
            phoneNumber
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            {...register("phoneNumber", {
              required: "Please enter your phoneNumber",
            })}
          />
          {errors.phoneNumber && errors.phoneNumber.message}
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md shadow-sm"
          >
            Register
          </button>
        </div>
        {/* {message && (
          <div className="text-green-600 font-medium mb-4">{message}</div>
        )} */}
      </form>
    </div>
  );
}
