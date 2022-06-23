import { render, screen } from "@testing-library/react";
import { createBrowserHistory } from "history";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from "./App";

// const renderMockApp = (history) => {
//     return render(
//         <BrowserRouter location={history.location}>
//             <App />
//         </BrowserRouter>
//     );
// };

describe("App", () => {
    it("should render home (/post) when clicking the logo.", async () => {
        const history = createBrowserHistory();
        history.push("/login");

        render(
            <BrowserRouter location={history.location} navigator={history}>
                <App />
            </BrowserRouter>
        );

        const logoElement = screen.getByTestId("logo");

        const user = userEvent.setup();

        await user.click(logoElement);

        const postsListTitleElement = await screen.findByTestId(
            "posts-list-title"
        );

        expect(postsListTitleElement).toBeInTheDocument();
    });
});
