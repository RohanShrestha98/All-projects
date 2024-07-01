import { TFunction } from 'i18next';
import ListInquaryModal from '../table/MorikiListInquiry/listInquaryModal';
import { withTranslation } from 'react-i18next';
import { useState } from 'react';
import { HiOutlineDownload } from 'react-icons/hi';
import { AiOutlinePlus } from 'react-icons/ai';

interface Props {
  t: TFunction;
}

function FooterCell({ t }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="button flex items-center justify-center gap-2"
      >
        <div>
          <AiOutlinePlus size={16} />
        </div>
        {t('addNew')}
      </button>
      {open && (
        <ListInquaryModal
          data={[]}
          mode={true}
          open={open}
          setOpen={setOpen}
        ></ListInquaryModal>
      )}{' '}
    </>
  );
}

export default withTranslation()(FooterCell);
