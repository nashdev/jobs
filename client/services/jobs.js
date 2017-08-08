import { store } from "../store/configureStore";
import Resource from "./resource";
const JobResource = Resource.forge("/api/jobs");

store.subscribe(() => {
  const { auth } = store.getState();
  if (auth.token && auth.token !== JobResource.authToken) {
    JobResource.setAuthToken(auth.token);
  }
});

export default JobResource;
