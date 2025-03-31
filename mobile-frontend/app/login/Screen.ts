export type Screen = "REGISTER" | "LOGIN";

let currentScreen: Screen = "LOGIN";

export function setScreen(screen: Screen) {
    currentScreen = screen;
}

export function isRegisterScreen() {
    return currentScreen === "REGISTER";
}
export function isLoginScreen() {
    return currentScreen === "LOGIN";
}