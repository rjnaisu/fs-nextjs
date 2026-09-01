export type CreateBlogState = {
  errors: {
    title?: string;
    author?: string;
    url?: string;
  };
  values: {
    title: string;
    author: string;
    url: string;
  };
};

export const initialCreateBlogState: CreateBlogState = {
  errors: {},
  values: {
    title: "",
    author: "",
    url: "",
  },
};
