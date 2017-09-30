import normalize from "jsonapi-normalizer";
import history from "client/common/history";
import Job from "client/jobs/services";
import { LOAD, CREATE, READ, UPDATE, DELETE } from "client/jobs/types";

export function loadJobs(jobs) {
  return { type: LOAD, payload: jobs };
}

export function createJob(job) {
  return {
    type: CREATE,
    payload: job,
    messages: {
      success: [{ msg: "Successfully created your job." }]
    }
  };
}

export function readJob(job) {
  return { type: READ, payload: job };
}

export function updateJob(job) {
  return {
    type: UPDATE,
    payload: job,
    messages: {
      success: [{ msg: "Successfully updated your job." }]
    }
  };
}

export function deleteJob(job) {
  return {
    type: DELETE,
    payload: job,
    messages: {
      success: [{ msg: "Successfully deleted your job." }]
    }
  };
}

export function getJob(id) {
  return dispatch =>
    Job.read(id).then(data => dispatch(readJob(normalize(data))));
}

export function getAllJobs(page = 1, pageSize = 9) {
  return dispatch =>
    Job.paginate(page, pageSize).then(data =>
      dispatch(loadJobs(normalize(data)))
    );
}

export function editJob(values) {
  return dispatch =>
    Job.update(values.id, values).then(data =>
      dispatch(updateJob(normalize(data)))
    );
}

export function removeJob(id) {
  return dispatch =>
    Job.delete(id).then(data => {
      dispatch(deleteJob(normalize(data)));
      // TODO: Figure out how to allow this during tests
      // Maybe set redirect in state and use <Redirect />
      history.push("/jobs");
    });
}

export function addJob(payload) {
  return dispatch =>
    Job.create(payload).then(data => {
      dispatch(createJob(normalize(data)));
      // TODO: Figure out how to allow this during tests
      // Maybe set redirect in state and use <Redirect />
      history.push("/jobs");
    });
}
