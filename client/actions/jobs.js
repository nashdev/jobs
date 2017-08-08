import "whatwg-fetch";
import { browserHistory } from "react-router";
import { normalize } from "normalizr";
import { jobListSchema, jobSchema } from "./schema";
import Job from "../services/jobs";

// Actions
const LOAD = "nashjobs/jobs/LOAD";
const CREATE = "nashjobs/jobs/CREATE";
const READ = "nashjobs/jobs/READ";
const UPDATE = "nashjobs/jobs/UPDATE";
const DELETE = "nashjobs/jobs/DELETE";

// Action Creators
export function loadJobs(jobs, pagination) {
  return { type: LOAD, payload: jobs, pagination: pagination };
}
export function createJob(job) {
  return {
    type: CREATE,
    payload: job,
    messages: [{ msg: "Successfully created your job." }]
  };
}

export function readJob(job) {
  return { type: READ, payload: job };
}

export function updateJob(job) {
  return {
    type: UPDATE,
    payload: job,
    messages: [{ msg: "Successfully updated your job." }]
  };
}

export function deleteJob(job) {
  return {
    type: DELETE,
    payload: job,
    messages: [{ msg: "Successfully deleted your job." }]
  };
}

export function getJob(id) {
  return dispatch =>
    Job.read(id).then(({ data }) =>
      dispatch(readJob(normalize(data, jobSchema)))
    );
}

export function getAllJobs(page = 1, pageSize = 10) {
  return dispatch =>
    Job.paginate(page, pageSize).then(({ data, pagination }) =>
      dispatch(loadJobs(normalize(data, jobListSchema), pagination))
    );
}

export function editJob(values) {
  return dispatch =>
    Job.update(values.id, values).then(({ data }) =>
      dispatch(updateJob(normalize(data, jobSchema)))
    );
}

export function removeJob(id) {
  return dispatch =>
    Job.delete(id).then(() => {
      dispatch(deleteJob({ job: { id } }));
      browserHistory.push("/jobs");
    });
}

export function addJob(payload) {
  return dispatch =>
    Job.create(payload).then(({ data }) => {
      dispatch(createJob(normalize(data, jobSchema)));
      browserHistory.push("/jobs");
    });
}
