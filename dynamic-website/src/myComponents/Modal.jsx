/* eslint-disable react/prop-types */
import { useState } from "react";
import { Dialog } from "@radix-ui/react-dialog";

const DialogBox = ({ triggerClassName, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className={triggerClassName}>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />
        <Dialog.Content className="modal-content px-8 py-6">
          <Dialog.Title>Add Feature</Dialog.Title>
          <article className="flex gap-6">
            <div className="basis-1/2 space-y-6">
              {/* Your dialog content goes here */}
              <p>This is your dialog content.</p>
            </div>
          </article>

          <div className="flex justify-end gap-8">
            <button type="submit" className="bg-primary text-white px-6 py-2">
              Submit
            </button>
            <Dialog.Close
              className="bg-danger text-white px-6 py-2"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default DialogBox;
