import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { submit } from "@/lib/features/searchSlice";
import StepByStepSearchForm from "@/components/StepByStepSearchForm";

export default function Hero() {
  const dispatch = useDispatch();
  
  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.search.value;
    console.log(searchQuery);
    dispatch(submit(searchQuery));
  };

  return (
    <div className="">
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center  text-white justify-center px-8 pt-32 pb-32">
        <h1 className="text-4xl md:text-6xl font-bold  mb-8 text-center">
        Discover the Greatest Staycation
        </h1>
        <p className="text-xl  mb-12 text-center  max-w-2xl">
        Give us a description of your ideal location and experience, and we'll locate it for you.
        </p>

        {/* Step-by-Step Search Form */}
        <StepByStepSearchForm />
      </div>
    </div>
  );
}
