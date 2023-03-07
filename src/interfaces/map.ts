export interface IPos {
  name: string;
  image: {
    key: string;
    url: string;
  };
  href?: string;
}

export interface IState {
  name: string;
  xml: string;
  posList: IPos[];
  available: boolean;
  _id: string;
}
