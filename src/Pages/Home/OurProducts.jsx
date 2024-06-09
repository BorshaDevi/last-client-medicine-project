import Marquee from "react-fast-marquee";


const OurProducts = () => {
    return (
        <>
        <h1 className="text-center font-bold  text-teal-800 text-2xl">Our Products</h1>
            <Marquee>
                <div className="flex gap-8 mt-10">
                <div className="relative">
                    <img src="https://i.ibb.co/0qWbLjr/71v-LACObv2-L-AC-UL320.jpg" alt="" />
                    <h1 className=" hover:mb-5 card absolute bottom-4 font-bold p-2 bg-teal-200">Claritin Children's Chewables 24 Hour Allergy Relief,<br></br> Non Drowsy Kids Allergy Medicine,<br></br> Grape Antihistamine Chewable Tablets, For Children 2 Years and Older, 40 Count</h1>
                    
                </div>
                <div className="relative">
                    <img src="https://i.ibb.co/1fGHN4q/61w-SFB03-NML-AC-UL320.jpg" alt="" />
                    <h1 className="hover:mb-5 card absolute font-bold bottom-4 p-2 bg-teal-200">Sambucol Cold and Flu Relief Tablets - Homeopathic Cold Medicine, Cold Remedy for Adults, Black Elderberry for Colds, Zinc Cold Remedy - 30 Count</h1>
                </div>
                <div className="relative">
                    <img src="https://i.ibb.co/dQ17MPT/91-GK9-KPCXIL-AC-UL320.jpg" alt="" />
                    <h1 className="hover:mb-5 card absolute font-bold bottom-4 p-2 bg-teal-200">Medicine: The Definitive Illustrated History (DK Definitive Visual Histories)</h1>
                </div>
                <div className="relative">
                    <img src="https://i.ibb.co/dJY0nXp/81-Fkw1q-LLIL-AC-UL320.jpg" alt="" />
                    <h1 className="card hover:mb-5 absolute font-bold bottom-4 p-2 bg-teal-200">Zyrtec 24 Hour Allergy Relief Tablets, Indoor & Outdoor Allergy Medicine with 10 mg Cetirizine HCl per Antihistamine Tablet, Relief of Allergies, 60 ct</h1>
                </div>
                <div className="relative">
                    <img src="https://i.ibb.co/C5ffX0h/71qr4w-Fm-Nd-L-AC-UL320.jpg" alt="" />
                    <h1 className="card hover:mb-5 absolute font-bold bottom-4 p-2 bg-teal-200">Sports Medicine 4-in-1 Lumbar Support Back Brace, Men and Women, Adjustable Lower Waist Belt, Back Pain Relief from Soreness, Fatigue, or Injury, Black</h1>
                </div>
                <div className="relative">
                    <img src="https://i.ibb.co/cg589Tn/61-LTL1-Ya-Vl-L-AC-UL320.jpg" alt="" />
                    <h1 className="card hover:mb-5 absolute font-bold bottom-4 p-2 bg-teal-200">Amazon Basics Hypoallergenic 100% Cotton Rounds, 600 Count (6 Packs of 100)</h1>
                </div>
                </div>
            </Marquee>
            </>
    );
};

export default OurProducts;