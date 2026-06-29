import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COVERS, getCoverBySlug } from "@/data/covers";
import CoverDetailTemplate from "@/components/covers/CoverDetailTemplate";

export function generateStaticParams() {
  return COVERS.map((cover) => ({ slug: cover.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cover = getCoverBySlug(slug);
  if (!cover) return {};
  return {
    title: cover.name,
    description: cover.overview,
  };
}

export default async function CoverPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cover = getCoverBySlug(slug);
  if (!cover) notFound();
  return <CoverDetailTemplate cover={cover} />;
}
