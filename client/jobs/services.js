import { store } from "client/store";
import Resource from "client/common/resource";
const JobResource = Resource.forge("/api/jobs");

store.subscribe(() => {
  const { auth } = store.getState();
  if (auth.token && auth.token !== JobResource.authToken) {
    JobResource.setAuthToken(auth.token);
  }
});

export default JobResource;
