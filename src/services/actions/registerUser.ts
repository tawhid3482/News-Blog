"use server";

export const registerUser = async (formData: FormData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/sign-up`,
    {
      method: "POST",
      body: formData,
      cache: "no-store",
    }
  );

  const userInfo = await res.json();
  return userInfo;
};
