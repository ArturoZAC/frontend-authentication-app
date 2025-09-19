export const sleep = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 10000);
  });
};
