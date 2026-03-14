import BrandNetwork from "../components/home/BrandNetwork";
import Hero from "../components/home/Hero";
import ShopByCategory from "../components/home/ShopByCategory";
import Values from "../components/home/Values";
import WhyChooseUs from "../components/home/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandNetwork />
      <ShopByCategory />
      <WhyChooseUs />
      <Values />
    </>
  );
}
