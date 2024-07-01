import { useMemo } from "react";
import { defaultCountries } from "react-international-phone";
import Select from "react-select";

export default function CountrySelect() {
  const countryListOptions = useMemo(() => {
    return defaultCountries.map((item) => {
      return {
        value: item[1],
        label: item[0],
      };
    });
  }, []);
  return (
    <div>
      <Select options={countryListOptions} />
    </div>
  );
}
