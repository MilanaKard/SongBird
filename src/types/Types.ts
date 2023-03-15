export type ServerResponse<T> = T[];

export type BirdData = {
  id: string;

  name: {
    ru: string;
    en: string;
  };
  description: string;
  species: {
    ru: string;
    en: string;
  };
  image: string;
  audio: string;
};

export type PlayerData = {
  name: string;
  score: number;
  date: Date | string;
};
