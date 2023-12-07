import Link from "next/link";
import React from "react";

export default function JobsLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <section className="container mr-auto">
      <div className="back-button-container pb-4 border-b-2 border-gray-300/50">
        <Link
          href="/"
          className="text-xl w-full h-full"
        >
          &lt; Go back home
        </Link>
      </div>
      {children}
    </section>
  );
}
