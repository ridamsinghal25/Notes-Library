import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMediaQuery } from "usehooks-ts";

function ToastConfig() {
  const isDesktop = useMediaQuery("(min-width: 1170px)");
  const theme = useSelector((state) => state.theme?.theme);

  return (
    <ToastContainer
      position={isDesktop ? "bottom-right" : "top-center"}
      autoClose={2000}
      hideProgressBar={false}
      limit={3}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme === "dark" ? "dark" : "colored"}
    />
  );
}

export default ToastConfig;
