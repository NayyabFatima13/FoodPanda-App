import { LoaderCircle } from "lucide-react";

function LoadingSpinner({ message = "Loading restaurants..." }) {
  return (
    <div className="loading-container">
      <LoaderCircle
        className="loading-spinner"
        size={45}
      />

      <h2>{message}</h2>

      <p>
        Please wait while we fetch the latest restaurants.
      </p>
    </div>
  );
}

export default LoadingSpinner;