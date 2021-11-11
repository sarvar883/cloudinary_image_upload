export interface IDispatch {
  type: String,
  payload?: any
}


export interface IHistory {
  push(url: string): void;
}


export interface IOrder {
  _id: string;
  picture: {
    name: string,
    url: string,
    cloudinary_public_id: string,
  };
}