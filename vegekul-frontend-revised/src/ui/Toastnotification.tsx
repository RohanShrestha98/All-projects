import * as Toast from "@radix-ui/react-toast";
import { useToast } from "../context/Aoastcontext";
import {
  CheckCircleSvg,
  CrossSvg,
  ErrorSvg,
  InfoSvg,
  WarningSvg,
} from "../icons/Allsvgs";

export default function ToastNotification() {
  const { toast, setOpen } = useToast();
  const ToastSvg =
    toast.type === "success"
      ? CheckCircleSvg
      : toast.type === "warning"
      ? WarningSvg
      : toast.type === "info"
      ? InfoSvg
      : ErrorSvg;

  return (
    <Toast.Provider>
      <Toast.Root
        open={toast.show}
        onOpenChange={setOpen}
        className={`flex items-center gap-3 rounded-md py-3 px-4 shadow-md ${
          toast.type === "success"
            ? "bg-green-100 text-green-800"
            : toast.type === "warning"
            ? "bg-orange-100 text-orange-800"
            : toast.type === "info"
            ? "bg-blue-100 text-blue-800"
            : "bg-red-100 text-red-800"
        }`}
        id="ToastRoot"
      >
        <ToastSvg className="h-6" />
        <Toast.Title className="text-[15px] font-medium">
          {toast.message}
        </Toast.Title>
        <Toast.Close>
          <CrossSvg className="ml-1 h-6" />
        </Toast.Close>
      </Toast.Root>

      <Toast.Viewport className="fixed bottom-0 right-0 z-[99999] p-4" />
    </Toast.Provider>
  );
}
