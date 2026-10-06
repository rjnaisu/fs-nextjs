"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav className="border-b">
      <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center gap-4 px-6 py-3 text-sm font-medium">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <Link href="/blogs" className="text-muted-foreground hover:text-foreground">
          Blogs
        </Link>
        <Link href="/users" className="text-muted-foreground hover:text-foreground">
          Users
        </Link>
        {session ? (
          <>
            <Link href="/blogs/new" className="text-muted-foreground hover:text-foreground">
              New Blog
            </Link>
            <Link href="/me" className="hover:text-foreground">
              Me
            </Link>
            <Button type="button" variant="destructive" size="sm" onClick={() => signOut()}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-muted-foreground hover:text-foreground">
              Login
            </Link>
            <Link href="/register" className="text-muted-foreground hover:text-foreground">
              Register
            </Link>
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}
