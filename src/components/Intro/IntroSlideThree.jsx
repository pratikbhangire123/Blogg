import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../index.js";

function IntroSlideThree() {
  const { userData } = useSelector((status) => status.auth.userData);

  console.log(userData);

  return (
    <section
      data-testid="IntroSlideThree"
      className="flex flex-col items-start justify-center min-h-[70vh] px-4 md:px-8 lg:px-12 xl:px-16 py-8 bg-blue-200"
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-800 tracking-[0.010em] leading-8">
        Welcome to <br />
        Blo<span className="text-blue-800">gg</span>.
      </h2>

      <p className="w-[80vw] mt-4 md:text-lg lg:text-xl xl:text-2xl font-light tracking-tight">
        A place where you can share your stories with the world.
      </p>

      <Link to={userData ? "/add-article" : "/signup"}>
        <Button className="mt-9 md:mt-10 lg:mt-11 xl:mt-12 text-sm md:text-base lg:text-lg xl:text-xl">
          {userData ? "Write a Story" : "Get Started"}
        </Button>
      </Link>
    </section>
  );
}

export default IntroSlideThree;
