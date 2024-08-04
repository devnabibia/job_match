import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      const result = await axios.get(`/jobs?searchTerm=${searchTerm}`);
      setJobs(result.data);
    };
    fetchJobs();
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for jobs"
      />
      <ul>
        {jobs.map((job) => (
          <li key={job.jobId}>
            <h2>{job.jobTitle}</h2>
            <p>{job.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;

