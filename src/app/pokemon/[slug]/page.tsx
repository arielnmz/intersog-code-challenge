export default function Page({ params }: { params: { slug: string } }) {
  return <div>Details for {params.slug}</div>;
}
