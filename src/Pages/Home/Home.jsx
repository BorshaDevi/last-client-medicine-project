import { Helmet } from "react-helmet-async";
import CategorySection from "./CategorySection";
import Discount from "./Discount/Discount";
import OurProducts from "./OurProducts";
import ReviewPage from "./ReviewPage";


const Home = () => {
    return (
        <div>
            <Helmet>
            <title>Indigo Medicine || Home</title>
          </Helmet>
            <CategorySection></CategorySection>
            <OurProducts></OurProducts>
            <ReviewPage></ReviewPage>
            <Discount></Discount>
        </div>
    );
};

export default Home;