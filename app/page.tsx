"use client";

import { useState } from "react";
import GlobalHeader from "./Components/SearchBar";
import ReviewCard from "./Components/ReviewCard";

const reviews = [
  { 
    id: 1, 
    rating: 5, 
    category: "Professor", 
    text: "Professor John makes complex algorithms feel like a breeze. Best CS teacher I've ever had! The way he explains concepts makes even the most complicated topics feel manageable. Exams are based on what was taught, no weird surprises. They focus more on understanding than memorization, which I really appreciate. Overall, this is the type of professor that actually makes you want to attend class, not just go for attendance.", 
    likes: 0, 
    dislikes: 0,
    major: "Computer Science", 
    year: "Senior" 
  },
  { 
    id: 2, 
    rating: 4, 
    category: "Cafeteria", 
    text: "The food is decent, but the lines are way too long during peak hours. If you want the pasta, get there 10 minutes early!", 
    likes: 0, 
    dislikes: 0,
    major: "Business", 
    year: "Sophomore" 
  }
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredReviews = activeCategory === "All" 
    ? reviews 
    : reviews.filter(r => r.category === activeCategory);

  return (
    <main className="snap-container bg-[#f8f9fa]">
      <GlobalHeader activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      
      <div className="w-full">
        {/* CONDITIONAL RENDERING: Check if category has reviews */}
        {filteredReviews.length > 0 ? (
          <>
            {filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}

            {/*the end card(only shows if there were reviews to scroll through) */}
            <div className="snap-item flex flex-col items-center justify-center text-center px-10">
              <div className="bg-white border-2 border-black rounded-[3rem] p-10 shadow-xl max-w-[400px]">
                <div className="text-4xl mb-4"></div>
                <h2 className="text-2xl font-black uppercase italic mb-2">No more ratings</h2>
                <p className="text-zinc-500 font-bold leading-tight">
                  You've reached the end! <br /> Check back later for more updates.
                </p>
                <button 
                  onClick={() => {
                    const container = document.querySelector('.snap-container');
                    if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="mt-6 px-6 py-2 bg-black text-white font-black rounded-full text-xs uppercase tracking-widest hover:scale-105 transition-transform active:scale-95"
                >
                  Back to Top
                </button>
              </div>
            </div>
          </>
        ) : (
          /*empty state: Shows when no ratings exist for a category */
          <div className="snap-item flex flex-col items-center justify-center text-center px-10">
            <div className="bg-white border-2 border-black rounded-[3rem] p-10 shadow-xl max-w-[400px]">
              <div className="text-4xl mb-4">🔍</div>
              <h2 className="text-2xl font-black uppercase italic mb-2">Empty Category</h2>
              <p className="text-zinc-500 font-bold leading-tight">
                There are currently no ratings for <span className="text-blue-600">"{activeCategory}"</span>.
              </p>
              <button 
                onClick={() => setActiveCategory("All")}
                className="mt-6 px-6 py-2 bg-blue-600 text-white font-black rounded-full text-xs uppercase tracking-widest hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-blue-200"
              >
                View All Ratings
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}