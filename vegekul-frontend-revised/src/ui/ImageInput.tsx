import { TFunction } from 'i18next';
import { ImageOutlineSvg, UploadSvg } from '../icons/Allsvgs';
import { withTranslation } from 'react-i18next';
import { t } from 'i18next';

interface Props {
  className?: string;
  setImage?: any;
  image: File | null;
  imageUrl: string;
  t: TFunction;
}

function ImageInput({ className = '', image, setImage, imageUrl }: Props) {
  return (
    <div className={`flex w-full flex-col gap-2 ${className}`}>
      <div className="flex flex-grow items-center justify-center rounded border  shadow">
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="event"
            className="w-full  rounded "
          />
        ) : imageUrl !== '' ? (
          <img src={imageUrl} alt={UploadSvg} className="w-full   rounded " />
        ) : (
          <ImageOutlineSvg className="h-10 text-secondary" />
        )}
      </div>
      <label
        htmlFor="identity"
        className="btn-secondary peer flex cursor-pointer border  bg-secondary text-white items-center justify-center gap-2 px-4 h-10 rounded-sm border-secondary hover:text-secondary hover:bg-white"
      >
        <UploadSvg className="h-6" />
        <span>{t('changeImage')}</span>
      </label>
      <input
        id="identity"
        type="file"
        name="identity"
        className="hidden"
        onChange={e => setImage(e.target.files![0])}
      />
    </div>
  );
}

export default withTranslation()(ImageInput);
