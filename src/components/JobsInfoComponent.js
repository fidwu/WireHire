import React from 'react';
import '../jobs.scss';
import FullJobPosting from './FullPostingComponent';
import { useSelector } from "react-redux";

const JobsInfo = (props) => {

    const { match: { params } } = props;

    const jobs = useSelector((state) => state.jobs);

    console.log(jobs);

    return (
        <div className="jobs container">
            {jobs.data.filter(job => job._id === params.id).map(job =>
                <FullJobPosting
                    key={job._id}
                    role={job.role}
                    description={job.description}
                    date={job.datePosted}
                    id={job._id}
                />
            )}
        </div>
    );
}

export default JobsInfo;