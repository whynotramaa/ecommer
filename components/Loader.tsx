"use client";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;
