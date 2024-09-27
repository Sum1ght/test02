import httpInstance from "@/utils/http";

export const getUserAPI = ({ account, password  }) => {
  return httpInstance({
    url: "/login",
    method: "POST",
    data: {
      account,
      password,
    },
  });
};
