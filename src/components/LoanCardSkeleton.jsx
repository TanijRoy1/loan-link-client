const LoanCardSkeleton = () => {
  return (
    <div className="bg-base-200 rounded shadow border border-base-300 p-3 flex flex-col animate-pulse">
      {/* Image Skeleton */}
      <div className="h-40 rounded bg-base-300 mb-3"></div>

      {/* Content */}
      <div className="flex-1 space-y-2">
        {/* Title */}
        <div className="h-5 w-3/4 bg-base-300 rounded"></div>

        {/* Description lines */}
        <div className="h-4 w-full bg-base-300 rounded"></div>
        <div className="h-4 w-11/12 bg-base-300 rounded"></div>
        <div className="h-4 w-9/12 bg-base-300 rounded"></div>

        {/* Category & Interest */}
        <div className="h-4 w-2/3 bg-base-300 rounded mt-2"></div>
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between">
        <div>
          <div className="h-3 w-16 bg-base-300 rounded mb-1"></div>
          <div className="h-4 w-24 bg-base-300 rounded"></div>
        </div>

        {/* Button */}
        <div className="h-8 w-24 bg-base-300 rounded"></div>
      </div>
    </div>
  );
};

export default LoanCardSkeleton;
