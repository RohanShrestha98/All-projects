import { FormControl, MenuItem, Select } from '@mui/material';
import { withTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { getLanguage, setLanguage } from '../../utils/cookie';

import profile from '../../assets/profileAvatar.jpg';
import { useAuth } from '../../context/Authcontext';
import '../../App.scss';
import japanFlag from '../../assets/japanflag.png';
import ukFlag from '../../assets/usaflag.png';
import { useNavigate } from 'react-router-dom';
interface PageTitleProps {
  pagetitle: string;
  i18n: any;
}

const languages = [
  {
    id: 1,
    name: 'English',
    flag: ukFlag,
    code: 'en',
    jpName: '英語',
  },
  {
    id: 2,
    name: 'Japanese',
    flag: japanFlag,
    code: 'jp',
    jpName: '日本語',
  },
];

function Navbar({ i18n, pagetitle }: PageTitleProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedLanguage, setSelectedLanguage] = useState<any>(
    languages.find(language => language.code === getLanguage())
  );

  useEffect(() => {
    const lang = getLanguage();
    if (lang === null) {
      i18n.changeLanguage('"en"');
      setLanguage('en');
      setSelectedLanguage(languages.filter(lang => lang.code === 'en')[0]);
    }
    setLanguage(lang);
    setSelectedLanguage(
      languages.filter(language => language.code === lang)[0]
    );
  }, [i18n]);

  const toggleLanguage = (code: string) => {
    const lang = languages.find(lang => lang.code === code) || languages[0];
    i18n.changeLanguage(lang.code);
    setSelectedLanguage(lang);
    setLanguage(lang.code);
  };

  return (
    <div className="navbar w-full flex flex-row sticky top-0 items-center z-40 bg-white justify-between px-6 py-4">
      <h2 className="text-md font-semibold">{pagetitle}</h2>
      <div className="profile_side flex items-center">
        <FormControl className="mr-1" style={{ marginRight: 10, width: 120 }}>
          <Select
            id=""
            label="Language"
            className="w-[130px]  h-[36px] "
            value={selectedLanguage?.code || 'en'}
            defaultValue={getLanguage()}
            onChange={e => toggleLanguage(e.target.value)}
          >
            {languages.map((language, index) => (
              <MenuItem key={index} value={language.code} className="flex ">
                <img src={language.flag} className="mr-1 w-6 h-6" />
                <span>
                  {selectedLanguage?.code === 'jp'
                    ? language.jpName
                    : language.name}
                </span>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <h3
          onClick={() => navigate('/profile-settings')}
          className="text-base font-medium text-sidebar cursor-pointer ml-2"
        >
          {user
            ? `${user?.first_name} ${user?.last_name}`
            : user?.first_name === '' && 'User'}
        </h3>
      </div>
    </div>
  );
}

export default withTranslation()(Navbar);
