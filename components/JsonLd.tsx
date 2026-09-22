// Renders a JSON-LD <script>. Pass the output of graph() from lib/seo.ts.
export default function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
