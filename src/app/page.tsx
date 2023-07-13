import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae
      obcaecati suscipit exercitationem at, veniam velit, id itaque vitae
      explicabo quaerat sequi veritatis quia dolorem sapiente quae labore eaque
      adipisci laboriosam?<Link href="/about">Go to about page</Link>
    </main>
  );
}
