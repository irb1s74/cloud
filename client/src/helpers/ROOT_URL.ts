const rootUrl = () => {
  if (document.location.host === 'localhost') {
    return 'http://localhost:5000/';
  }
  if (document.location.host === 'localhost:3000') {
    return 'http://localhost:5000/';
  }
  if (document.location.host === 'irb1s.ru') {
    return 'http://irb1s.ru:5000/';
  }
  return 'http://irb1s.ru:5000/';
};

export const ROOT_URL = rootUrl();
