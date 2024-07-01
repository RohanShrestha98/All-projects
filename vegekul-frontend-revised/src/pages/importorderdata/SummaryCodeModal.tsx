import * as Dialog from '@radix-ui/react-dialog';
import { t } from 'i18next';
import { useState } from 'react';
import { FiUpload } from 'react-icons/fi';

interface propTypes {
  openSummaryDialog: boolean;
  setOpenSummaryDialog: (open: boolean) => void;
  submitHandler: (e: any, summaryCode: string) => void;
  cancelHandler: () => void;
  isSubmitting?: boolean;
}

export const SummaryCodeModal = ({
  openSummaryDialog = false,
  setOpenSummaryDialog = () => null,
  submitHandler = (e: any, summaryCode: string) => null,
  cancelHandler = () => null,
  isSubmitting = false,
}: propTypes) => {
  const [summaryCode, setSummaryCode] = useState<string>('');

  return (
    <Dialog.Root open={openSummaryDialog} onOpenChange={setOpenSummaryDialog}>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />
        <Dialog.Content className="modal-content w-[500px] px-8 py-6">
          <form
            className="space-y-8"
            onSubmit={(e: any) => submitHandler(e, summaryCode)}
          >
            <fieldset className="mb-[15px] flex items-center gap-5">
              <label
                className="font-medium whitespace-nowrap text-grayTextDark peer-hover:text-blackText peer-focus:text-primary"
                htmlFor="summaryCode"
              >
                {t('summaryCode')}
              </label>
              <input
                className="peer rounded border border-grayBorderDark py-2 px-3 text-[14.5px] w-full  placeholder:text-grayText hover:border-grayText focus:border-primary focus:outline-none"
                id="summaryCode"
                type="text"
                placeholder={t('enterOrderBatchSummaryCode')}
                value={summaryCode || ''}
                onChange={e => setSummaryCode(e.target.value)}
              />
            </fieldset>

            <div className="flex justify-end gap-4">
              <Dialog.Close
                className="bg-danger text-white px-6 h-9 rounded border border-danger hover:bg-white hover:text-danger"
                onClick={cancelHandler}
              >
                {t('cancel')}
              </Dialog.Close>
              <button
                type="submit"
                disabled={isSubmitting}
                className=" px-6 disabled:opacity-50 h-9 button bg-primary rounded-4 border border-primary text-white hover:bg-white hover:text-primary flex items-center justify-center gap-2 "
              >
                <FiUpload />
                {t('upload')}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
