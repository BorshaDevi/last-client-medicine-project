

const ReviewPage = () => {
    return (
        <div className="mt-10">
            <h1 className="text-center font-bold  text-teal-800 text-2xl">Reviews</h1>
            <div className="flex gap-10">
                {/* 1 */}
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <div className="avatar">
  <div className="w-24 rounded-full">
    <img src="https://i.ibb.co/VtGB9Kr/young-smiling-man-red-shirt-with-optical-glasses-thumbs-up-isolated-orange-wall.jpg" />
  </div>
</div>
  <div className="card-body">
    <h2 className="card-title">MedicineSeeker22</h2>
    <p><span className="text-orange-300">Rating: ★★★★☆ (4/5)</span>
        <br />
        The medicine information page provided comprehensive details on medications,
        <br />
         but lacked in-depth user reviews for personal insights. Despite this, its user-friendly layout and credible information make it a valuable resource for understanding medication.

    </p>
   
  </div>
</div>
{/* 2 */}
<div className="card card-compact w-96 bg-base-100 shadow-xl">
<div className="avatar">
  <div className="w-24 rounded-full">
    <img src="https://i.ibb.co/VN8RCf4/front-view-smiley-girl-looking-away.jpg" />
  </div>
</div>
  <div className="card-body">
    <h2 className="card-title">MedInfoEnthusiast</h2>
    <p><span className="text-orange-300">Rating: ★★★★☆ (4/5)</span>
        
        <br></br>
    I recently visited this medicine information page, and overall,
    <br />
     I was quite impressed with the quality and depth of information provided.</p>
    
  </div>
</div>
{/* 3 */}
<div className="card card-compact w-96 bg-base-100 shadow-xl">
<div className="avatar">
  <div className="w-24 rounded-full">
    <img src="https://i.ibb.co/tbT8dzz/handsome-smiling-man-looking-with-disbelief.jpg" />
  </div>
</div>
  <div className="card-body">
    <h2 className="card-title">MedInfoExplorer</h2>
    <p> <span className="text-orange-300">Rating: ★★★★☆ (4/5)</span>
        <br />
        Overall, I found the medicine information page to be quite informative, providing comprehensive details about various medications. However, 
        <br />
        I wished there were more user reviews to gain personal insights. Nevertheless, the user-friendly layout and credible information make it a valuable resource for understanding medication.</p>
    
  </div>
</div>
            </div>
        </div>
    );
};

export default ReviewPage;