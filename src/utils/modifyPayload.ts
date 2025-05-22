/* eslint-disable @typescript-eslint/no-explicit-any */
export const modifyPayload = (values: any) => {
  const obj = { ...values };
  const file = obj["profilePhoto"][0]; // <-- Fixed key
  delete obj["profilePhoto"]; // remove from JSON payload

  const data = JSON.stringify(obj);
  const formData = new FormData();
  formData.append("data", data);
  formData.append("file", file); // send only file separately

  return formData;
};
