import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React,{ useState } from "react";

interface ContentsAreaProps {
    appState: string;
    setAppState: React.Dispatch<React.SetStateAction<string>>;
    choicedModel: string;
    setChoicedModel: React.Dispatch<React.SetStateAction<string>>;
    history: string[];
    setHistory: React.Dispatch<React.SetStateAction<string[]>>;
}

const ContentsArea: React.FC<ContentsAreaProps> = ({
    appState,
    setAppState,
    choicedModel,
    setChoicedModel,
    history,
    setHistory
}) => {
    return (
        <div className="items-center h-full w-full py-20">
            {appState == "first"
            ? <Description setChoicedModel={setChoicedModel} />
            : <></>
            }
            {!(appState == "first")
            ? <TextField history={history} appState={appState} />
            : <></>
            }
            {appState == "validation"
            ? <ValidationField
            setAppState={setAppState}
            history={history}
            setHistory={setHistory}
            choicedModel={choicedModel} />
            : <></>
            }
        </div>
    )
}

export default ContentsArea;

interface DescriptionProps {
    setChoicedModel: React.Dispatch<React.SetStateAction<string>>;
}

const Description: React.FC<DescriptionProps> = ({ setChoicedModel }) => {
    return(
        <Tabs
        defaultValue="会話AI"
        className="max-w-96 p-4 mx-auto">
        <TabsList>
            {/* <TabsTrigger
            onClick={() => setChoicedModel("consultation")}
            value="相談AI">相談AI</TabsTrigger>
            <TabsTrigger
            onClick={() => setChoicedModel("absurdity")}
            value="不条理AI">不条理AI</TabsTrigger> */}

            <TabsTrigger
            onClick={() => setChoicedModel("latest")}
            value="会話AI">会話AI</TabsTrigger>
        </TabsList>
        <TabsContent
        className="text-start"
        value="相談AI">相談AIは ChatGPT APIを活用した会話システムです。</TabsContent>
        <TabsContent
        className="text-start"
        value="不条理AI">不条理AIは不条理小説を元に作成した、不条理な発言をする会話システムです。</TabsContent>
        <TabsContent
        className="text-start"
        value="会話AI">生成AIによる日常会話に適したチャットボットです。</TabsContent>
        </Tabs>
    )
}

interface TextFieldProps {
    appState: string;
    history: string[];
}

const TextField: React.FC<TextFieldProps> = ({
    history,
    appState
}) => {
    return(
        <div className={`w-3/4 max-w-screen-md mx-auto mb-20 p-10 ${appState === "validation"
        ? "shadow"
        : ""}`}>
            {appState === "validation"
            ? <h1 className="mb-10">会話履歴</h1>
            : <></>}
            {history.map((text, index) => (
                <div
                key={index}
                className={`break-words w-4/5 max-w-fit text-start h-fit shadow p-2 rounded-xl mb-5${index%2 === 0 ? " ml-auto" : ""}`}>{text}</div>
            ))}
        </div>
    )
}

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface ValidationAreaProps {
    setAppState: React.Dispatch<React.SetStateAction<string>>;
    choicedModel: string;
    history: string[];
    setHistory: React.Dispatch<React.SetStateAction<string[]>>;
}

const ValidationField: React.FC<ValidationAreaProps> = ({
    setAppState,
    history,
    setHistory,
    choicedModel,
}) => {
    const [name, setName] = useState("");
    const initialValues = Array.from({ length: 15 }, (_, i) => ({ [i + 1]: "3" }))
    .reduce((acc, cur) => ({ ...acc, ...cur }), {});
    const [values, setValues] = useState<{ [key: string]: string }>({ ...initialValues });
    const valuesInt = Object.values(values);
    const [comment, setComment] = useState("");

    const handleSelectChange = (id: string, value: string) => {
        setValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }))
    };
    const handleSaveToEnd = async (e: React.FormEvent) => {
        e.preventDefault();
        const baseURL = process.env.NODE_ENV === 'production'
        ? 'https://artinnovation-6c8774b7024e.herokuapp.com'
        : 'http://127.0.0.1:8000';
        try {
            const response = await fetch(`${baseURL}/saveData`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: choicedModel,
                    history: history,
                    name: name,
                    value: valuesInt,
                    comment: comment
                }),
            });

            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            console.log('Success:', response);
        } catch (error) {
            console.error('Error', error);
        }
        setAppState("first");
        setHistory([]);
    }

    const questions = Array.from({ length: 15 }, (_, i) => ({
    id: (i + 1).toString(),
    question: `質問${i + 1}`
    }));
    return(
        <Card className="w-full max-w-96 mx-auto">
        <CardHeader>
            <CardTitle>会話の評価</CardTitle>
            <CardDescription>評価についての注意事項</CardDescription>
        </CardHeader>
        <CardContent>
            <form>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                id="name"
                placeholder="your name"
                value={name}
                onChange={(e) => setName(e.target.value)} />
                </div>
            {questions.map((question) => (
                <div key={question.id} className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">{question.question}</Label>
                    <Select
                    onValueChange={(value)=>handleSelectChange(question.id, value)}
                    defaultValue="3"
                    >
                        <SelectTrigger id={question.id}>
                        <SelectValue />
                        </SelectTrigger>
                        <SelectContent position="popper">
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            ))}
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="comment">comment</Label>
                <Input
                id="comment"
                placeholder="write comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)} />
                </div>
            </div>
            </form>
        </CardContent>
        <CardFooter className="flex justify-end">
            <Button onClick={handleSaveToEnd}>保存して終了</Button>
        </CardFooter>
        </Card>
    )
}