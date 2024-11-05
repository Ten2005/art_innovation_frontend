import { Button } from "@/components/ui/button"
import { createClient } from '@supabase/supabase-js'

interface HeaderProps {
    appState: string;
    setAppState: React.Dispatch<React.SetStateAction<string>>;
    history: string[];
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const Header: React.FC<HeaderProps> = ({
    appState,
    // 通常の処理
    // setAppState,

    // TATと接続する時の処理
    history
}) => {
    const handleEnd = async () => {
        // 通常の処理
        // setAppState("validation");

        // TATと接続する時の処理
        const { data, error } = await supabase
        .from('ai_talk_basic')
        .insert([
            { history: history } // 保存するデータを指定
        ])

        if (error) {
            console.error('Error inserting data:', error)
        } else {
            console.log('Data inserted:', data)
        }

        window.location.href = "https://tat-app.vercel.app/";
    }
    return (
        <header className="flex justify-between fixed top-0 left-0 w-full h-10 shadow">
            <h1 className="text-lg leading-10 ml-4">art innovation</h1>
            <div className="w-fit h-fit my-1 mx-4">
                {!(appState == "first") && !(appState == "validation")
                ? <Button
                onClick={handleEnd}
                variant={"destructive"}
                size={"sm"}>会話を終了</Button>
                : <></>
                }
            </div>
        </header>
        )
}

export default Header;