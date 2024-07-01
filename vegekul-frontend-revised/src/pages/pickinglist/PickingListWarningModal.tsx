import { DialogContentText } from '@mui/material';
import * as Dialog from '@radix-ui/react-dialog';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';

interface propTypes {
  modalFor: string;
  openWarningDialoge: boolean;
  setOpenWarningDialoge: () => void;
  submitHandler: () => void;
  cancelHandler: () => void;
  finalDate: string;
  t: TFunction;
}

function PickingListWarningModal({
  modalFor = 'pdf',
  finalDate,
  openWarningDialoge = false,
  setOpenWarningDialoge,
  submitHandler,

  t,
}: propTypes) {
  return (
    <Dialog.Root open={openWarningDialoge} onOpenChange={setOpenWarningDialoge}>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />
        <Dialog.Content className="modal-content w-[400px] px-8 py-6">
          <div>
            <DialogContentText className="flex flex-col gap-y-2">
              <div>
                {modalFor === 'pdf' ? t('pdfWarning') : t('faxWarning')}
              </div>
              <div>
                {t('lastProcessedDate')}: {finalDate}
              </div>
            </DialogContentText>
            <div className="mt-4 flex gap-2">
              <Dialog.Close
                className="bg-danger text-white px-2 w-44 h-9 rounded border border-danger hover:bg-white hover:text-danger"
                onClick={setOpenWarningDialoge}
              >
                {t('cancel')}
              </Dialog.Close>
              <button
                onClick={submitHandler}
                type="submit"
                className="bg-primary text-white px-6 w-44 h-9 rounded border border-primary hover:bg-white hover:text-primary"
              >
                {t('proceed')}
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default withTranslation()(PickingListWarningModal);
