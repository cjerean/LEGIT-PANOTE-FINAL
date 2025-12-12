"use client";

import * as React from "react";
import { Image as ImageIcon, MessageSquarePlus, Paperclip, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function AIChat() {
    const [input, setInput] = React.useState("");
    const [attachments, setAttachments] = React.useState<string[]>([]);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            // Create object URLs for preview
            const newAttachments = files.map(file => URL.createObjectURL(file));
            setAttachments(prev => [...prev, ...newAttachments]);
        }
    };

    const removeAttachment = (index: number) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    };

    const handleSend = () => {
        // Placeholder for send logic
        console.log("Sending:", input, attachments);
        setInput("");
        setAttachments([]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex h-full flex-col">
            <div className="flex flex-1 flex-col items-center justify-center p-8 text-center bg-gray-50/50">
                <h2 className="mb-8 text-xl font-medium">How can I help you today?</h2>

                <div className="grid w-full max-w-2xl grid-cols-1 gap-4 md:grid-cols-2">
                    <Button
                        variant="secondary"
                        className="h-auto flex-col items-start gap-2 p-4 text-left bg-white shadow-sm hover:bg-gray-100/80 transition-colors"
                        onClick={() => setInput("Add context ")}
                    >
                        <MessageSquarePlus className="h-6 w-6 text-primary" />
                        <div className="space-y-1">
                            <span className="font-medium">Add context</span>
                            <p className="text-xs text-muted-foreground font-normal">
                                Ask anything!
                            </p>
                        </div>
                    </Button>

                    <Button
                        variant="secondary"
                        className="h-auto flex-col items-start gap-2 p-4 text-left bg-white shadow-sm hover:bg-gray-100/80 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <ImageIcon className="h-6 w-6 text-primary" />
                        <div className="space-y-1">
                            <span className="font-medium">Image to Text</span>
                        </div>
                    </Button>
                </div>
            </div>

            {/* Chat Input Area */}
            <div className="border-t bg-background p-4">
                <div className="mx-auto max-w-3xl space-y-4">
                    {/* Attachments Preview */}
                    {attachments.length > 0 && (
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {attachments.map((src, index) => (
                                <div key={index} className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border group">
                                    <img
                                        src={src}
                                        alt="Attachment"
                                        className="h-full w-full object-cover"
                                    />
                                    <button
                                        onClick={() => removeAttachment(index)}
                                        className="absolute right-1 top-1 rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/70"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex gap-2 items-end">
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            multiple
                            onChange={handleFileSelect}
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 shrink-0 text-muted-foreground hover:text-foreground"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Paperclip className="h-5 w-5" />
                            <span className="sr-only">Attach file</span>
                        </Button>

                        <div className="relative flex-1">
                            <Textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Message Baldy AI..."
                                className="min-h-[44px] max-h-32 resize-none py-3 pr-12"
                            />
                        </div>

                        <Button
                            onClick={handleSend}
                            size="icon"
                            disabled={!input.trim() && attachments.length === 0}
                            className="h-10 w-10 shrink-0"
                        >
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Send message</span>
                        </Button>
                    </div>
                    <div className="text-center text-xs text-muted-foreground">
                        Baldy AI can make mistakes. Consider checking important information.
                    </div>
                </div>
            </div>
        </div>
    );
}
