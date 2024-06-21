// import { render, screen, cleanup } from "@testing-library/react";
// 

// // Initial Render: Logo (Blogg), 3 Buttons (Home, Login, Signup)
// // Initial Behavior: Home- "/", Login- "/login", Signup- "/signup"
// // User Logged In, Render: Logo (Blogg), 4 Buttons (Home, All Articles, Write Article, Logout)
// // User Logged In, Behavior: Home- "/", All Articles- "/all_articles", Write Article- "/add-article", Logout- "No Logout Button"

// afterEach(cleanup());

// it("should have a logo and three buttons", () => {
//   const header = render(<Header />).toJSON();

//   expect(header).toMatchSnapshot();
// });
