import { Button } from "@/components/ui/button"

interface HeaderProps {
    appState: string;
    setAppState: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({
    appState,
    setAppState,
}) => {
    const handleEnd = () => {
        setAppState("validation");
    }
    return (
        <header className="flex justify-between fixed top-0 left-0 w-full h-10 shadow">
            <h1 className="text-lg leading-10 ml-4">art innovation</h1>
            <div className="w-fit h-fit my-1 mx-4">
                {appState == "consultation" || appState == "absurdity"
                ? <Button
                onClick={handleEnd}
                variant={"destructive"}
                size={"sm"}>終了</Button>
                : <></>
                }
            </div>
        </header>
        )
}

export default Header;