import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [about, setAbout] = useState('');
  const [cv, setCV] = useState(null);
  const [loading, setLoading] = useState(false);
  const [receivedDetails, setReceivedDetails] = useState(null);

  const isValidEmail = (email) => {
    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !about || !cv) {
      return toast.error('Please complete the form');
    }
    if (!isValidEmail(email)) {
      return toast.error('Please enter a valid email address');
    }
    if (!cv.name.endsWith('.pdf')) {
      return toast.error('Please upload a PDF document');
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('about', about);
      formData.append('cv', cv);

      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setReceivedDetails(response.data);
      setLoading(false);
      toast.success('Form submitted successfully');
    } catch (err) {
      setLoading(false);
      toast.error(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };

  const handleCVChange = (e) => {
    setCV(e.target.files[0]);
  };

  return (
    <div className="App">
      <ToastContainer /> 
      <h1>May We Know You</h1>
      {!receivedDetails ? (
        <form className="form-container" onSubmit={submitHandler}>
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Tell us about yourself:</label>
            <textarea value={about} onChange={(e) => setAbout(e.target.value)} />
          </div>
          <div className="upload-cv">
            <label>Upload Your CV:</label>
            <input type="file" accept=".pdf" onChange={handleCVChange} />
          </div>
          <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Submit'}</button>
        </form>
      ) : (
        <div className="form-container">
          <h2>Details:</h2>
          <p>Name: {receivedDetails.name}</p>
          <p>Email: {receivedDetails.email}</p>
          <p>About: {receivedDetails.about}</p>
          <p><a href={receivedDetails.cvUrl} download>Download CV</a></p>
        </div>
      )}
    </div>
  );
}

export default App;
