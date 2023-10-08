"use client";
import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

function SignOutBtn() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <button className="block text-altColor font-medium" onClick={handleSignOut}>
      Logout
    </button>
  );
}

export default SignOutBtn;
