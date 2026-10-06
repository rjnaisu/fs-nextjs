export type CreateBlogState = {
  success: boolean;
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
  success: false,
  errors: {},
  values: {
    title: "",
    author: "",
    url: "",
  },
};
