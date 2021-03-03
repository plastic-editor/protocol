export type Page = {
  id: string;
  title: string;
  type?: "default" | "daily";
  children: ShallowBlock[];
};

export type ShallowBlock = {
  id: string;
  children: ShallowBlock[];
};

export type Block = {
  id: string;
  content: string;
  pageId: string;
  references: string[]; // page id array
};