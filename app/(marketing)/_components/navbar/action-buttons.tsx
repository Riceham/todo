import { Button } from "@/components/ui/button";
import React from "react";

const ActionButtons = () => {
  return (
    <div className="flex items-center gap-4">
      <Button aria-label="login button" variant="custom" className="text-md text-black bg-yellow-400 hover:bg-yellow-400/90">
        Sign in
      </Button>
      {/* Updated Pricing button */}
      <a href="#pricing-section"> {/* Changed href to "#pricing-section" */}
        <Button aria-label="get started button" variant="custom" className="text-md text-black bg-yellow-400 hover:bg-yellow-400/90">
          Try CountWave
        </Button>
      </a>
    </div>
  );
};

export default ActionButtons;
