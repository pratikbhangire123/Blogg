import renderer from "react-test-renderer";
import IntroSlideOne from "./IntroSlideOne";

it("should match snapshot", () => {
  const introSlideOneComponent = renderer.create(<IntroSlideOne />);

  expect(introSlideOneComponent).toMatchSnapshot();
});
