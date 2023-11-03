// https://www.w3resource.com/javascript/form/email-validation.php
export const EmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;

export const TelephoneNumberRegex = /(\(\d{2,3}\))\d{7,8}/;

export const PhoneNumberRegex = /^09\d{8}$/;

// https://identity.tw/
export const IdNumberRegex = /^[A-Z]{1}[1-2A-D8-9]{1}[0-9]{8}$/;

const ID_LETTERS = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';

export const isIdNumberValid = (id: string) => {
  id = id.toUpperCase();
  if (!IdNumberRegex.test(id)) {
    return false;
  }

  let letterIndex = ID_LETTERS.indexOf(id[0]);
  let sum = Math.floor(letterIndex / 10 + 1) + letterIndex * 9;

  // Legacy ARC
  if (/[A-Z]/.test(id[1])) {
    sum += (ID_LETTERS.indexOf(id[1]) % 10) * 8;
  } else {
    sum += parseInt(id[1]) * 8;
  }

  for (let i = 2; i < 9; i++) {
    sum += (9 - i) * parseInt(id[i]);
  }
  sum += parseInt(id[9]);

  return sum % 10 === 0;
};
