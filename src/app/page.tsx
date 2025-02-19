import { Footer } from "@/components/footer";
import { MainFeature } from "@/components/main-feature";
import { Navbar } from "@/components/navbar";

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1">
                <MainFeature />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
