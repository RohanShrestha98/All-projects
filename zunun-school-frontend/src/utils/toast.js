import { notification } from "antd";

const className = "!pb-3";

const toast = {
  success: (message = "Successful!", description = "") => {
    notification.success({
      message,
      description,
      className,
      duration: 5,
    });
  },

  info: (message = "Greetings!", description = "") => {
    notification.info({
      message,
      description,
      className,
      duration: 5,
    });
  },

  warning: (message = "Please check it again!", description = "") => {
    notification.warning({
      message,
      description,
      className,
      duration: 5,
    });
  },

  error: (message = "Something went wrong!", description = "") => {
    notification.error({
      message,
      description,
      className,
      duration: 5,
    });
  },
};

export default toast;
