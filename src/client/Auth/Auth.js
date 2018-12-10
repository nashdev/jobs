const Auth = {
  isAuthenticated:
    typeof window !== "undefined"
      ? window.INITIAL_STATE.isAuthenticated
      : false,
  userId: typeof window !== "undefined" ? window.INITIAL_STATE.userId : null,
  update({ isAuthenticated, userId }) {
    console.log("Updating Auth");
    this.isAuthenticated = isAuthenticated;
    this.userId = userId;
  },
};

if (typeof window !== "undefined") {
  window.Auth = Auth;
}
export default Auth;
