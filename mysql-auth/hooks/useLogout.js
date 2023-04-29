import { useState } from "react";
import { useRouter } from "next/router";
import { destroySession } from "iron-session";

export default function useLogout() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const logout = async () => {
    setIsLoading(true);
    try {
      await destroySession();
      router.replace("/"); // redirect to the home page after logout
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return { isLoading, logout };
}