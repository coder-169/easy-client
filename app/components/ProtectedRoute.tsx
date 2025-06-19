import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status, router]);

  if (status === "loading") {
    return <Skeleton className="h-screen w-full" />; // Minimal loading state for fast perceived performance
  }

  if (status === "authenticated") {
    return <>{children}</>;
  }

  return null;
};

export default ProtectedRoute;
