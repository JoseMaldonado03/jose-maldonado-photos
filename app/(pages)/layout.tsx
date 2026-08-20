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
      <Container>
        <NavBar color="#fffefe" />
        {children}
        <Footer color="#ffffff" />
      </Container>
    </div>
  );
}
