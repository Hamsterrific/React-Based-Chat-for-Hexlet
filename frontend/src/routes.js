const apiPath = '/api/v1';

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  signUpPath: () => [apiPath, 'signup'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  rootPath: () => '/',
  loginPagePath: () => '/login',
  signUpPagePath: () => '/signup',
};

export default routes;