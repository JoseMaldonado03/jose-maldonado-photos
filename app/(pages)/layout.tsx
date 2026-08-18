import Container from "@/components/Container";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavBar color="#fffefe" />
      <Container>
        {children}
        <Footer color="#ffffff" />
      </Container>
    </div>
  );
}
