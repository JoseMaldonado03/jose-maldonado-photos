import Container from "@/components/Container";
import Footer from "@/components/Footer";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Container>
        {children}
        <Footer color="black" />
      </Container>
    </div>
  );
}
