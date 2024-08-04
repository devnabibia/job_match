import React, { useState } from 'react';
import axios from 'axios';

const ApplyJob = () => {
  const [applicationData, setApplicationData] = useState({
    jobId: '',
    userId: '',
    resume: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplicationData({ ...applicationData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.prevent

