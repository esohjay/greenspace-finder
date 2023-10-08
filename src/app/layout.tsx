import "./globals.css";
import { Inter } from "next/font/google";
// import Nav from "@/components/nav";
import NavContainer from "@/components/navContainer";
import { Providers } from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Greenspace finder",
  description:
    "Helping people to find the nearest greenspace around their localty",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main className="bg-LgBg bg-gray-300 ">
            <section className="bg-whit  max-w-full overflow-hiddn">
              {children}
            </section>
            <NavContainer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
