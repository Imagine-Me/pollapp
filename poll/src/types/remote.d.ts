declare module "utils/localStorage" {
  function getFromLocalStorage(key: string): Record<string, any>;
  function setToLocalStorage(key: string, value: Record<string, any>);
  function updateLocalStorage(key: string, value: Record<string, any>);
  export const getFromLocalStorage;
  export const setToLocalStorage;
  export const updateLocalStorage;
}
