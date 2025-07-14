export interface User {
  gender: string;
  name: {
    title: string;
    last: string;
    first: string;
  };
  location: {
    city: string;
    country: string;
  };
  email: string;
  login: {
    uuid: string;
  };
  nat: string;
  picture: {
    thumbnail: string;
    medium: string;
    large: string;
  };
}
