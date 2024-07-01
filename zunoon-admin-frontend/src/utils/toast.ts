import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function success(msg: string): void {
  toast.success(msg, { autoClose: 3000 });
}

function info(msg: string): void {
  toast.info(msg, { autoClose: 3000 });
}

function warning(msg: string): void {
  toast.warning(msg, { autoClose: 3000 });
}

function error(error: string | any): void {
  let errMsg = typeof error === typeof 'string' ? String(error) : 'Something went wrong';
  const err = error?.response;

  if (err && err?.data) {
    errMsg = err.data?.data.error[0];
  }
  toast.error(errMsg, { autoClose: 3000 });
}

const toasts = { success, warning, error, info };
export default toasts;
