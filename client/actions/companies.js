import "whatwg-fetch";

import { browserHistory } from "react-router";
import { normalize } from "normalizr";
import { companyListSchema, companySchema } from "./schema";
import Company from "../services/companies";

// Actions
const LOAD = "nashjobs/companies/LOAD";
const CREATE = "nashjobs/companies/CREATE";
const READ = "nashjobs/companies/READ";
const UPDATE = "nashjobs/companies/UPDATE";
const DELETE = "nashjobs/companies/DELETE";

// Action Creators
export function loadCompanies(companies, append = false) {
  return { type: LOAD, payload: companies, append };
}

export function createCompany(company) {
  return {
    type: CREATE,
    payload: company,
    messages: [{ msg: "Successfully created your company." }]
  };
}

export function readCompany(company) {
  return { type: READ, payload: company };
}

export function updateCompany(company) {
  return {
    type: UPDATE,
    payload: company,
    messages: [{ msg: "Successfully updated your company." }]
  };
}

export function deleteCompany(company) {
  return {
    type: DELETE,
    payload: company,
    messages: [{ msg: "Successfully deleted your company." }]
  };
}

export function getCompany(id) {
  return dispatch =>
    Company.read(id).then(({ data }) =>
      dispatch(readCompany(normalize(data, companySchema)))
    );
}

export function getAllCompanies(page = 1, pageSize = 10) {
  return dispatch =>
    Company.paginate(page, pageSize).then(({ data }) =>
      dispatch(loadCompanies(normalize(data, companyListSchema)))
    );
}
export function getOwnedCompanies() {
  return dispatch =>
    Company.request("/owned").then(({ data }) =>
      dispatch(loadCompanies(normalize(data, companyListSchema), true))
    );
}

export function editCompany(values) {
  return dispatch =>
    Company.update(values.id, values).then(({ data }) =>
      dispatch(updateCompany(normalize(data, companySchema)))
    );
}

export function removeCompany(id) {
  return dispatch =>
    Company.delete(id).then(() => {
      dispatch(deleteCompany({ company: { id } }));
      browserHistory.push("/companies");
    });
}

export function addCompany(values) {
  return async dispatch => {
    try {
      const { data } = await Company.create(values);
      dispatch(createCompany(normalize(data, companySchema)));
      browserHistory.push("/companies");
    } catch (error) {
      throw error;
    }
  };
}
