import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React, { useState } from 'react';

interface FooterProps {
    choicedModel: string;
    appState: string;
    setAppState: React.Dispatch<React.SetStateAction<string>>;
    history: string[];
    setHistory: React.Dispatch<React.SetStateAction<string[]>>;
}

const Footer: React.FC<FooterProps> = ({
    choicedModel,
    appState,
    setAppState,
    history,
    setHistory
}) => {
    return (
        <footer className="fixed bottom-0 left-0 w-full h-fit bg-inherit">
            {!(appState == "validation")
            ? <InputArea
            choicedModel={choicedModel}
            appState={appState}
            setAppState={setAppState}
            history={history}
            setHistory={setHistory} />
            : <></>}
        </footer>
        )
}

export default Footer;

interface InputAreaProps {
    choicedModel: string;
    appState: string;
    setAppState: React.Dispatch<React.SetStateAction<string>>;
    history: string[];
    setHistory: React.Dispatch<React.SetStateAction<string[]>>;
}

const InputArea: React.FC<InputAreaProps> = ({
    choicedModel,
    appState,
    setAppState,
    history,
    setHistory
}) => {
    const [inputValue, setInputValue] = useState("");

    const generateResponse = async (history: string[]) => {
        const baseURL = process.env.NODE_ENV === 'production'
        ? 'https://artinnovation-6c8774b7024e.herokuapp.com'
        : 'http://127.0.0.1:8000';
        console.log(`${baseURL}/reply/${choicedModel}`);
        try {
            const response = await fetch(`${baseURL}/reply/${choicedModel}`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                history: history,
            }),
            });

            if (!response.ok) {
            throw new Error('Network response was not ok');
            }

            const reply = await response.json();
            return reply;
        } catch (error) {
            console.error('Error', error);
            }
        }
    const handleSubmit = async (e: React.FormEvent, inputValue: string) => {
        e.preventDefault();
        if (appState == "first") { setAppState(choicedModel) }
        const postHistory = [...history, inputValue];
        console.log(postHistory);
        const reply = await generateResponse(postHistory);
        setHistory((prev) => [...prev, inputValue]);
        setHistory((prev) => [...prev, reply.response]);
        setInputValue("");

    }
    return (
        <form
        className="flex w-full h-fit pb-8 px-4"
        typeof="submit"
        onSubmit={(e) => handleSubmit(e, inputValue)}
        >
        <Input
        placeholder={`${choicedModel} model is selected`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
        size={"sm"}
        className="ml-2"
        >送信</Button>
        </form>
        )
}