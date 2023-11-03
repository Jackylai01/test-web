export const checkMobileDevice = () => {
  const mobileDevice = [
    'Android',
    'webOS',
    'iPhone',
    'iPad',
    'iPod',
    'BlackBerry',
    'Windows Phone',
  ];
  let isMobileDevice = mobileDevice.some((e) => navigator.userAgent.match(e));
  return isMobileDevice;
};
