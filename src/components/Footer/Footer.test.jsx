import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import Footer from "./Footer";


it("should render a copyright statement & logo", () => {
  render(<Footer />);

  const footer = screen.getByTestId("footer");

  expect(footer).toBeInTheDocument();

  expect(footer).toHaveTextContent(
    /^© Copyright 2024. All Rights Reserved by Blogg.$/
  );
});

it("should matches snapshot", () => {
  const footerComponent = renderer.create(<Footer />).toJSON();

  expect(footerComponent).toMatchSnapshot();
});
