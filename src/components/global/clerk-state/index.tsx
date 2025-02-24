"use client";

import {
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import {
  DotIcon,
  LayoutDashboard,
  LayoutDashboardIcon,
  LoaderCircle,
  LucideLayoutDashboard,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ClerkState() {
  const router = useRouter();
  return (
    <>
      <SignedIn>
        <ClerkLoading>
          <LoaderCircle className="animate-spin" />
        </ClerkLoading>
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Link
              label="Dashboard"
              labelIcon={<LucideLayoutDashboard size={16} />}
              href="/dashboard"
            />
          </UserButton.MenuItems>
        </UserButton>
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </>
  );
}
