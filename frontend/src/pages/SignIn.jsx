import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const App = () => {
    return (
        <header style={{ paddingTop: 140 }}>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </header>
    )
}

export default App