import { Bounce, toast } from "react-toastify";

export const getAuth = () =>
{
  try {
    const auth = JSON.parse(sessionStorage.getItem("auth"));

    const token = auth.authToken;
    const expireAt = auth.tokenExpireAt;
    if (token && expireAt) {
      if (Date.now() < expireAt) {
        return auth;
      } else {
        sessionStorage.removeItem("auth");

        toast.error('Token expired. Please log in again.', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    }
    return null;
  } catch (error) {
    return null;
  }
};