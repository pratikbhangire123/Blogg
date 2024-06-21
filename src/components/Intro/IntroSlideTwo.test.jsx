import renderer from "react-test-renderer";
import IntroSlideTwo from "./IntroSlideTwo";

it("should match snapshot", () => {
  const IntroSlideTwoComponent = renderer.create(<IntroSlideTwo />);

  expect(IntroSlideTwoComponent).toMatchSnapshot();
});
