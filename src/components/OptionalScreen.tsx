import '../App.css'
import { Button } from "@/components/ui/button"

interface OptionalScreenProps {
    setIsOptionalScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OptionalScreen: React.FC<OptionalScreenProps> = ({ setIsOptionalScreen }) => {
    return (
        <div className='w-full h-full px-5 pb-20'>
        <div className='shadow w-[500px] h-fit max-w-full max-h-full mx-auto relative p-5'>
            <div className='mb-16 px-4'>
                <h1>実施について</h1>
                <p className='my-5 text-start'>
                    <br />初めに、チャットボットとの会話を行います。右下の「開始する」ボタンを押すと会話画面が自動で表示されます。ここでは、自由に会話をしてください。
                    <br /><br />次に、「会話を終了」ボタンを押すと別のページに移動します。指示が書かれているので、それに従ってください。
                    <br />表示される絵について物語を考えるTATを行なっていただきます。
                </p>
            </div>
            <Button
            className='absolute bottom-4 right-6'
            onClick={() => setIsOptionalScreen(false)}
            >開始する</Button>
        </div>
        </div>
    )
}

export default OptionalScreen;