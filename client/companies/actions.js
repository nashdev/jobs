import { normalize } from "normalizr";
import history from "client/common/history";
import { companyListSchema, companySchema } from "client/schema";
import Company from "client/companies/services";
import { LOAD, CREATE, READ, UPDATE, DELETE } from "client/companies/types";

export function loadCompanies(companies, append = false) {
  return { type: LOAD, payload: companies, append };
}

export function createCompany(company) {
  return {
    type: CREATE,
    payload: company,
    messages: {
      success: [{ msg: "Successfully created your company." }]
    }
  };
}

export function readCompany(company) {
  return { type: READ, payload: company };
}

export function updateCompany(company) {
  return {
    type: UPDATE,
    payload: company,
    messages: {
      success: [{ msg: "Successfully updated your company." }]
    }
  };
}

export function deleteCompany(company) {
  return {
    type: DELETE,
    payload: company,
    messages: {
      success: [{ msg: "Successfully deleted your company." }]
    }
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
      history.push("/companies");
    });
}

export function addCompany(values) {
  return async dispatch => {
    try {
      const { data } = await Company.create(values);
      dispatch(createCompany(normalize(data, companySchema)));
      history.push("/companies");
    } catch (error) {
      throw error;
    }
  };
}
