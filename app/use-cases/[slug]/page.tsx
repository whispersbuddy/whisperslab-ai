import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DEPARTMENTS, getDepartment } from "@/app/_content/useCases";
import JsonLd from "@/components/JsonLd";
import { DepartmentPage } from "@/components/usecases/UseCasePages";
import { breadcrumbSchema, buildMetadata, faqSchema, graph, requireLive, SITE_URL } from "@/lib/seo";

export function generateStaticParams() {
  return DEPARTMENTS.map((d) => ({ slug: d.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const dept = getDepartment(slug);
  if (!dept) return {};
  return buildMetadata({ title: dept.seo.title, description: dept.seo.description, path: `/use-cases/${slug}` });
}

export default async function DepartmentRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dept = getDepartment(slug);
  if (!dept) notFound();
  const path = `/use-cases/${slug}`;
  requireLive(path);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Use cases", path: "/use-cases" },
    { name: dept.name, path },
  ];

  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "WebPage",
            "@id": SITE_URL + path + "#page",
            name: dept.seo.title,
            description: dept.seo.description,
            url: SITE_URL + path,
            about: dept.seo.keyword,
            mainEntity: {
              "@type": "ItemList",
              name: `${dept.name} automation ideas`,
              itemListElement: dept.ideas.map((idea, i) => ({ "@type": "ListItem", position: i + 1, name: idea.title, description: idea.problem })),
            },
          },
          faqSchema(dept.faq),
          breadcrumbSchema(crumbs)
        )}
      />
      <DepartmentPage dept={dept} crumbs={crumbs} />
    </>
  );
}
