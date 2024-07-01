import { TFunction } from 'i18next';
import { useState, CSSProperties } from 'react';
import { withTranslation } from 'react-i18next';
import { BiTrash } from 'react-icons/bi';
import { BsFiletypeCsv } from 'react-icons/bs';
import { FiUpload } from 'react-icons/fi';

import {
  useCSVReader,
  lightenDarkenColor,
  formatFileSize,
} from 'react-papaparse';

const GREY = '#CCC';
const GREY_LIGHT = 'rgba(255, 255, 255, 0.4)';
const GREY_DIM = '#686868';

const styles = {
  zone: {
    alignItems: 'center',
    border: `2px dashed ${GREY}`,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    height: '15rem',
    justifyContent: 'center',
    padding: 10,
  } as CSSProperties,
  file: {
    background: 'linear-gradient(to bottom, #EEE, #DDD)',
    borderRadius: 20,
    display: 'flex',
    height: 120,
    width: 120,
    position: 'relative',
    zIndex: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  } as CSSProperties,
  info: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
  } as CSSProperties,
  size: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    marginBottom: '0.5em',
    justifyContent: 'center',
    display: 'flex',
  } as CSSProperties,
  name: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    fontSize: 12,
    marginBottom: '0.5em',
  } as CSSProperties,
  progressBar: {
    bottom: 14,
    position: 'absolute',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  } as CSSProperties,
  zoneHover: {
    borderColor: GREY_DIM,
  } as CSSProperties,
  default: {
    borderColor: GREY,
  } as CSSProperties,
  remove: {
    height: 23,
    position: 'absolute',
    right: 6,
    top: 6,
    width: 23,
  } as CSSProperties,
};
function CSVUploader({ t, handleFileUpload }: any) {
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);

  const DEFAULT_REMOVE_HOVER_COLOR = '#A01919';

  const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
    DEFAULT_REMOVE_HOVER_COLOR,
    40
  );
  const [removeHoverColor, setRemoveHoverColor] = useState(
    DEFAULT_REMOVE_HOVER_COLOR
  );

  return (
    <CSVReader
      accept="text/csv, .csv, application/vnd.ms-excel, .zip"
      multiple={false}
      onUploadAccepted={handleFileUpload}
      config={{ encoding: 'Shift-JIS' }}
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
        Remove,
      }: any) => {
        return (
          <>
            <div
              {...getRootProps()}
              style={Object.assign(
                {},
                styles.zone,
                zoneHover && styles.zoneHover
              )}
            >
              {acceptedFile ? (
                <>
                  <div style={styles.file}>
                    <div className="flex justify-center absolute top-[25%] left-[30%] opacity-[70%]">
                      <BsFiletypeCsv size={60} className="text-primary" />
                    </div>

                    <div style={styles.info}></div>
                    <div style={styles.progressBar}>
                      <ProgressBar />
                    </div>
                    <div
                      {...getRemoveFileProps()}
                      style={styles.remove}
                      onMouseOver={(event: Event) => {
                        event.preventDefault();
                        setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                      }}
                      onMouseOut={(event: Event) => {
                        event.preventDefault();
                        setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                      }}
                    >
                      <Remove color={removeHoverColor} />
                    </div>
                  </div>
                  <span className="mt-2" style={styles.name}>
                    {acceptedFile.name}{' '}
                    <span className="">{`(${formatFileSize(
                      acceptedFile.size
                    )})`}</span>
                  </span>
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <p>{t('dropCSVFileHereOrClickToUpload')}</p>
                  <button
                    type="submit"
                    className="button flex items-center justify-center gap-2 mt-1"
                  >
                    <div>
                      <FiUpload size={16} />
                    </div>
                    {t('upload')}
                  </button>
                </div>
              )}
            </div>
          </>
        );
      }}
    </CSVReader>
  );
}

export default withTranslation()(CSVUploader);
