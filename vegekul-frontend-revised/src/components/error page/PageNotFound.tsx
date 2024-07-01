import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="rightSidePart flex flex-row items-center justify-center">
      <div className=" flex flex-col items-center">
        <h4 className="text-5xl font-extrabold text-grayHeading ">404</h4>
        <h1 className="text-3xl font-extrabold text-grayHeading my-4">
          Page not Found
        </h1>
        <Link
          to=""
          className="border border-blue-950 px-8 py-2  rounded-3xl hover:bg-blue-950 hover hover:text-white"
        >
          Go back to Dashboard
        </Link>
      </div>
    </div>
  );
}
