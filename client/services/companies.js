import { store } from "../store/configureStore";
import Resource from "./resource";
const CompanyResource = Resource.forge("/api/companies");

store.subscribe(() => {
  const { auth } = store.getState();
  if (auth.token && auth.token !== CompanyResource.authToken) {
    CompanyResource.setAuthToken(auth.token);
  }
});

export default CompanyResource;
