export type Mimetypes = "none" | "doc" | "docx" | "rtf" | "other";
export type Lang = "UA" | "EN" | "RU";

export type Input = {
  lang: Lang;
  mimetype: Mimetypes;
  chars: number;
  date: string;
};

export type Output = {
  price: number;
  time: number;
  deadline: string;
};

export type languageItem = {
  title: "Українська" | "Російська" | "Англійська";
  value: Lang;
};
