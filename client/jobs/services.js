import { store } from "client/store";
import Resource from "client/common/resource";
const JobResource = Resource.forge("/api/jobs");

const setAuthToken = () => {
  const { auth } = store.getState();
  if (auth.token && auth.token !== JobResource.authToken) {
    JobResource.setAuthToken(auth.token);
  }
};
store.subscribe(() => setAuthToken);
setAuthToken();

export default JobResource;
