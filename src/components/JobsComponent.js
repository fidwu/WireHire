import React, { useState, useEffect } from 'react';
import JobPosting from './JobPostingComponent';
import Search from './SearchComponent';
import '../jobs.scss';
import { useDispatch, useSelector } from "react-redux";

const Jobs = () => {

    const [keywordInput, setKeywordInput] = useState('');
    const [locationInput, setLocationInput] = useState('');

    const jobs = useSelector((state) => state.jobs);

    const [jobDisplay, setJobDisplay] = useState(jobs?.data);
    const [emptyJobMsg, setEmptyJobMsg] = useState("");

    useEffect(() => {
        setJobDisplay(jobs?.data);
    },[jobs])

    const searchKeywordUpdated = (e) => {
        const searchQuery = e.target.value;
        setKeywordInput(searchQuery);
        setEmptyJobMsg("");
        if (!searchQuery) {
            setJobDisplay(jobs.data);
        }
    }

    const searchLocationUpdated = (e) => {
        const locationQuery = e.target.value;
        setLocationInput(locationQuery);
        setEmptyJobMsg("");
        if (!locationQuery) {
            setJobDisplay(jobs.data);
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setKeywordInput(keywordInput);
        setLocationInput(locationInput);
        const filterDisplay = jobDisplay.filter(job => {
            if (keywordInput && locationInput) {
                return (
                    job.role.toLowerCase().includes(keywordInput.toLowerCase()) &&
                    job.location.toLowerCase().includes(locationInput.toLowerCase())
                )
            }
            else if (keywordInput && !locationInput) {
                return (
                    job.role.toLowerCase().includes(keywordInput.toLowerCase())
                )
            }
            else {
                return (
                    job.location.toLowerCase().includes(locationInput.toLowerCase())
                )
            }
        });
        if (filterDisplay.length) {
            setJobDisplay(filterDisplay);
            setEmptyJobMsg("");
        }
        else {
            setEmptyJobMsg("Sorry, no jobs match your search.");
        }
    }

    return (
        <div className="jobs container">
            <Search
                keywordInput={keywordInput}
                keywordInputChanged={(e) => searchKeywordUpdated(e)}
                handleSearch={(e) => handleSearch(e)}
                locationInput={locationInput}
                locationInputChanged={e => searchLocationUpdated(e)}
            />
            {jobs.status === "loading" && 
                <h2>Loading...</h2>
            }
            {jobs.status === "failed" &&
                <h2>Error getting jobs</h2>
            }
            {jobs.status === "success" && !emptyJobMsg ?
                jobDisplay.map((job) => (
                    <JobPosting
                        key={job._id}
                        role={job.role}
                        description={job.description}
                        date={job.datePosted}
                        location={job.location}
                        id={job._id}
                    />
                ))
                :
                <div>{emptyJobMsg}</div>
            }
        </div>
    );
}

export default Jobs;