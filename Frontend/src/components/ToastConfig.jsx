import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMediaQuery } from "usehooks-ts";

function ToastConfig() {
  const isDesktop = useMediaQuery("(min-width: 1170px)");
  return (
    <ToastContainer
      position={isDesktop ? "bottom-right" : "top-center"}
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
}

export default ToastConfig;
