export default (uri) => {
  const urlSegments = uri.split('/');
  const token = urlSegments[2];
  const uid = urlSegments[3];

  return { token, uid };
};
