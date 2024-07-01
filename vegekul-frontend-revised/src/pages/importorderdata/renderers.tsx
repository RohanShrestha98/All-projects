import dateFormats from '../../constants/date';
import moment from 'moment';

export const numberHeaderValidator = params => {
  const valid = !Number.isNaN(parseInt(params.getValue()));

  return (
    <div className={`${!valid && 'w-1/2 h-1/2 p-8 bg-red-500 text-white'}`}>
      <span>{params.getValue()}</span>
    </div>
  );
};

export const stringHeaderValidator = params => {
  const valid =
    typeof params.getValue() === 'string' && isNaN(Number(params.getValue()));

  return (
    <div className={`${!valid && 'w-1/2 h-1/2 p-8 bg-red-500 text-white'}`}>
      <span>{params.getValue()}</span>
    </div>
  );
};

export const dateHeaderValidator = params => {
  const date = moment(params.getValue()?.trim(), dateFormats, true);
  return (
    <div>
      <span>
        {date.isValid() ? date.format(dateFormats[0]) : params.getValue()}
      </span>
    </div>
  );
};
