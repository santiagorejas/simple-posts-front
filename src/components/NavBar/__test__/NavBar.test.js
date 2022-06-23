import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../../context/auth-context";
import ProfileContext from "../../../context/profile-context";
import ThemeContext from "../../../context/theme-context";
import NavBar from "../NavBar";

const renderNavBar = (authValue) => {
    return render(
        <BrowserRouter>
            <AuthContext.Provider value={authValue}>
                <ThemeContext.Provider value={{ toggleTheme: jest.fn() }}>
                    <ProfileContext.Provider
                        value={{ clearProfile: jest.fn() }}
                    >
                        <NavBar />
                    </ProfileContext.Provider>
                </ThemeContext.Provider>
            </AuthContext.Provider>
        </BrowserRouter>
    );
};

describe("NavBar", () => {
    it("when not logged in, signup and login buttons should appear.", () => {
        renderNavBar({ isLoggedIn: false });
        const loginBtnElement = screen.getByRole("button", { name: /Login/i });
        const signupBtnElement = screen.getByRole("button", {
            name: /Signup/i,
        });
        expect(loginBtnElement).toBeInTheDocument();
        expect(signupBtnElement).toBeInTheDocument();
    });

    it("when logged in, logout button should appear.", () => {
        renderNavBar({ isLoggedIn: true });
        const logoutBtnElement = screen.getByRole("button", {
            name: /logout/i,
        });
        expect(logoutBtnElement).toBeInTheDocument();
    });
});
