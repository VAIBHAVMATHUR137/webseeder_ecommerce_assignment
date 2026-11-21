import { Link, isRouteErrorResponse, useRouteError } from "react-router";
import Navbar from "../components/Navbar";

const ErrorPage = () => {
  const error = useRouteError();

  let status = 500;
  let title = "Something went wrong";
  let message = "An unexpected error occurred. Please try again.";

  if (isRouteErrorResponse(error)) {
    status = error.status;
    if (error.status === 404) {
      title = "Page not found";
      message = "The page you're looking for doesn't exist or has moved.";
    } else {
      title = error.statusText || title;
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-[calc(100vh-4rem)] bg-neutral-950 text-white flex flex-col items-center justify-center gap-6 px-5 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
          Error {status}
        </p>

        <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>

        <p className="text-neutral-400 max-w-md">{message}</p>

        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Link
            to="/"
            className="bg-white text-black font-semibold px-6 py-3 rounded-xl hover:bg-neutral-300 transition"
          >
            Go Home
          </Link>

          <Link
            to="/productListing"
            className="border border-neutral-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-neutral-800 transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;