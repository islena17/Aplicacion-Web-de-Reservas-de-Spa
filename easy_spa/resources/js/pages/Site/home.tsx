import Hero from "@/components/layouts/Hero";
import Navbar from "@/components/layouts/Navbar";
import HomeSections from "./HomeSections";
import TopServices from "./TopServices";
import LatestServices from "./LatestServices";
import Footer from "@/components/layouts/Footer";
export function Home (){

return(
<>
    <Navbar/>
    <Hero/>
    <TopServices/>
    <HomeSections />
    <LatestServices />
    
    <Footer />
    
   </> 
)

}