import React from "react";
import { FadeLoader, BarLoader } from "react-spinners";

interface LoaderProps {
  loading: boolean;
  spinner?: string;
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({
  loading,
  spinner = "scale",
  color = "0989FF",
}) => {
  return (
    <div className="text-center">
      {spinner === "scale" && (
        <BarLoader
          color={`#${color}`}
          loading={loading}
          height={8}
          width={100}
        />
      )}

      {spinner === "fade" && (
        <FadeLoader
          loading={loading}
          color="#0989FF"
        />
      )}
    </div>
  );
};

export default Loader;