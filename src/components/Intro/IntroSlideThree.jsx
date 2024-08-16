import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, H2, P, Section } from "../index.js";

function IntroSlideThree() {
  const authStatus = useSelector((state) => state?.auth?.status);

  return (
    <Section>
      <H2>
        Welcome to <br />
        Blo<span className="text-blue-800">gg</span>.
      </H2>

      <P className="w-[80vw] mt-4">
        A place where you can share your stories with the world.
      </P>

      <Link to={authStatus ? "/add-article" : "/signup"}>
        <Button className="mt-9 md:mt-10 lg:mt-11 xl:mt-12 text-sm md:text-base lg:text-lg xl:text-xl">
          {authStatus ? "Write a Story" : "Get Started"}
        </Button>
      </Link>
    </Section>
  );
}

export default IntroSlideThree;
