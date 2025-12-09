"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutUsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 space-y-10">
      <section className="space-y-3 text-center">
        <h1 className="text-3xl font-bold">About Slido</h1>
        <p className="text-foreground/70">
          Slido is the platform for creating and hosting interactive meetings, helping teams
          build engaging experiences, foster connections, and measure outcomes in real-time.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Our Mission</h2>
        <p>
          We aim to bring simple, flexible tools that enable anyone to create engaging
          activities in classrooms, workshops, team building, and community events—all easy
          to set up, easy to join, and easy to track.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Key Features</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Create meetings quickly with unique participant codes.</li>
          <li>Manage participants and configure flexible rules.</li>
          <li>View results in real-time as events happen.</li>
          <li>Secure login/registration with password management.</li>
          <li>Modern interface optimized for desktop and mobile.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Our Team</h2>
        <p>
          Slido is built by people who love technology and engagement. We're committed to
          creating smooth, intuitive experiences and continuously improving based on user feedback.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Get in Touch</h2>
        <p>
          Have ideas, feedback, or need support? We'd love to hear from you.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/">
            <Button variant="outline">Home</Button>
          </Link>
          <Link href="/event/join">
            <Button variant="outline">Join Event</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline">Sign Up</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
