import { store } from "client/store";
import Resource from "client/common/resource";
const CompanyResource = Resource.forge("/api/companies");

const setAuthToken = () => {
  const { auth } = store.getState();
  if (auth.token && auth.token !== CompanyResource.authToken) {
    CompanyResource.setAuthToken(auth.token);
  }
};
store.subscribe(() => setAuthToken);
setAuthToken();

export default CompanyResource;
