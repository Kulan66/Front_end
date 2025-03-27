import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { submit } from "@/lib/features/searchSlice";

const steps = [
  { id: 1, label: "Destination", placeholder: "Enter your destination" },
  { id: 2, label: "Experience", placeholder: "Describe your experience" },
  { id: 3, label: "Hotel Type", placeholder: "Enter type of hotel" },
];

export default function StepByStepSearchForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const handleNext = () => {
    if (!formData[steps[currentStep - 1].label]) {
      toast.error(`Please enter ${steps[currentStep - 1].label.toLowerCase()}.`);
      return;
    }

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [steps[currentStep - 1].label]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData[steps[currentStep - 1].label]) {
      toast.error(`Please enter ${steps[currentStep - 1].label.toLowerCase()}.`);
      return;
    }

    const searchQuery = Object.values(formData).join(", ");
    dispatch(submit(searchQuery));
    toast.success("Search submitted successfully!");
  };

  return (
    <form className="w-full max-w-2xl bg-black/10 backdrop-blur-md rounded-lg p-6 flex flex-col items-center gap-6">
      <h2 className="text-3xl text-white mb-4">AI Search Engine</h2>
      <div className="w-full">
        <label className="text-xl text-white">{steps[currentStep - 1].label}</label>
        <Input
          type="text"
          name={steps[currentStep - 1].label}
          placeholder={steps[currentStep - 1].placeholder}
          value={formData[steps[currentStep - 1].label] || ""}
          onChange={handleChange}
          className="mt-2 bg-transparent text-white placeholder:text-white/50 border-none outline-none focus:border-none focus:outline-none focus-visible:ring-0"
        />
      </div>
      <div className="flex gap-4">
        <Button
          type="button"
          onClick={handleBack}
          className="rounded-full w-24"
          disabled={currentStep === 1}
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          className="rounded-full w-24"
        >
          {currentStep === steps.length ? "Submit" : "Next"}
        </Button>
      </div>
    </form>
  );
}