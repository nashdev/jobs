import React from "react";
import { getExperience, getType, getSalary } from "./Form";

const TagList = ({ job }) => {
  return (
    <section className="field is-grouped is-grouped-multiline">
      <div className="control">
        <div className="tags has-addons">
          <span className="tag is-dark">{getType(job.type)} @ </span>
          <span className="tag is-success">{getSalary(job.salary_range)}</span>
        </div>
      </div>
      <div className="control">
        <div className="tags has-addons">
          <span className="tag is-dark">XP:</span>
          <span className="tag is-info">
            {getExperience(job.experience_range)}
          </span>
        </div>
      </div>
      <div className="control">
        <div className="tags has-addons">
          <span className="tag is-dark">Remote:</span>
          <span className="tag is-light">
            {job.remote_available && <span>✅</span>}
            {!job.remote_available && <span>🚫</span>}
          </span>
        </div>
      </div>
      {job.recruiter && (
        <div className="control">
          <div className="tags has-addons">
            <span className="tag is-dark">Recruiter:</span>
            <span className="tag is-warning is-capitalized">
              {job.recruiter_agency}
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default TagList;
