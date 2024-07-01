import * as Alert from '@radix-ui/react-alert-dialog';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import Button from './Button';

interface Props {
  clickHandler: () => void;
  children: React.ReactNode;
  btnText?: string;
  closeHandler?: () => void;
  triggerClassName?: string;
  asChild?: boolean;
  t: TFunction;
}

const ConfirmDialog = ({
  children,
  clickHandler,
  closeHandler = () => null,
  triggerClassName = '',
  asChild = false,
  t,
}: Props) => (
  <Alert.Root onOpenChange={open => open === false && closeHandler()}>
    <Alert.Trigger className={triggerClassName} asChild={asChild}>
      {children}
    </Alert.Trigger>
    <Alert.Portal>
      <Alert.Overlay className="overlay" />
      <Alert.Content className="modal-content xs:px-4 xs:gap-4 flex max-w-md flex-col gap-5 px-7 py-5">
        <Alert.Title className="xs:text-base text-lg font-medium">
          {t('areYouSure')}
        </Alert.Title>
        <Alert.Description className="xs:text-xs text-[15px] text-grayText">
          {t('confirmWarning')}
        </Alert.Description>
        <div className="xs:gap-4 flex gap-2 self-end md:gap-6">
          <Alert.Cancel asChild>
            <Button
              color="danger"
              className="bg-danger text-white px-6 w-44  h-9 rounded border border-danger hover:bg-white hover:text-danger"
            >
              {t('cancel')}
            </Button>
          </Alert.Cancel>
          <Alert.Action asChild onClick={clickHandler}>
            <button className="bg-primary text-white px-6 w-44  h-9 rounded border border-primary hover:bg-white hover:text-primary">
              {t('yesSendFax')}
            </button>
          </Alert.Action>
        </div>
      </Alert.Content>
    </Alert.Portal>
  </Alert.Root>
);

export default withTranslation()(ConfirmDialog);
