import CategorySection from "./CategorySection";
import Discount from "./Discount/Discount";
import OurProducts from "./OurProducts";
import ReviewPage from "./ReviewPage";


const Home = () => {
    return (
        <div>
            <CategorySection></CategorySection>
            <OurProducts></OurProducts>
            <ReviewPage></ReviewPage>
            <Discount></Discount>
        </div>
    );
};

export default Home;