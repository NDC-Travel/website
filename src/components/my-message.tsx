"use client";

import React, { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    createdAt: string;
}

interface Conversation {
    userId: string;
    receiverName: string;
    lastMessage: string;
    profileImage: string;
}

export default function MessagesTab() {
    const { data: session } = useSession();
    const [messages, setMessages] = useState<Message[]>([]);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedUser, setSelectedUser] = useState<string>("");
    const [content, setContent] = useState("");
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Scroll chat to bottom
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Fetch all messages for session
    useEffect(() => {
        if (!session?.user?.id) return;

        const fetchMessages = async () => {
            try {
                const res = await fetch("/api/message");
                if (!res.ok) throw new Error("Erreur lors du chargement des messages");
                const data = await res.json();
                const allMessages: Message[] = data.messages || [];

                setMessages(allMessages);

                // Group messages by the other user to build conversation list
                const convoMap = new Map<string, Message>();
                allMessages.forEach((msg) => {
                    const otherUser = msg.senderId === session.user.id ? msg.receiverId : msg.senderId;
                    convoMap.set(otherUser, msg); // overwrite to keep the last message
                });

                const convoList: Conversation[] = Array.from(convoMap.entries()).map(
                    ([userId, msg]) => ({
                        userId,
                        receiverName: msg.receiver.name,
                        profileImage: msg.receiver.image,
                        lastMessage: msg.content,
                    })
                );
                setConversations(convoList);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMessages();
    }, [session?.user?.id]);

    // Pusher real-time updates
    useEffect(() => {
        if (!session?.user?.id) return;

        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER!,
        });

        const channel = pusher.subscribe(`chat-${session.user.id}`);
        channel.bind("new-message", (msg: Message) => {
            setMessages((prev) => [...prev, msg]);

            // Update conversation last message
            const otherUser = msg.senderId === session.user.id ? msg.receiverId : msg.senderId;
            setConversations((prev) => {
                const existing = prev.filter((c) => c.userId !== otherUser);
                return [...existing, { userId: otherUser, lastMessage: msg.content }];
            });
        });

        return () => {
            channel.unbind_all();
            pusher.unsubscribe(`chat-${session.user.id}`);
            pusher.disconnect();
        };
    }, [session?.user?.id]);

    const [isSending, setIsSending] = useState(false);

    const sendMessage = async () => {
        if (!selectedUser || !content.trim()) return;

        try {
            setIsSending(true); // start loading
            const res = await fetch("/api/message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ receiver: selectedUser, content }),
            });
            const data = await res.json();
            if (data.success) {
                setMessages((prev) => [...prev, data.message]);
                setContent("");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsSending(false); // stop loading
        }
    };


    // Filter messages for current conversation
    const currentMessages = messages.filter(
        (msg) => msg.senderId === selectedUser || msg.receiverId === selectedUser
    );

    return (
        <div className="grid md:grid-cols-3 gap-6 h-[60vh]">
            {/* Conversations list */}
            <Card className="md:col-span-1 flex flex-col">
                <CardHeader>
                    <CardTitle>Conversations</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto">
                    {conversations.length === 0 ? (
                        <p className="text-muted-foreground">Aucune conversation</p>
                    ) : (
                        <ul className="px-0 mx-0 space-y-2">
                            {conversations.map((convo) => (
                                <li
                                    key={convo.userId}
                                    className={`p-2 flex items-center gap-x-4 rounded-md cursor-pointer ${
                                        convo.userId === selectedUser ? "bg-muted/90 text-black" : "bg-muted/20"
                                    }`}
                                    onClick={() => setSelectedUser(convo.userId)}
                                >
                                    <Avatar className={'!w-[32px] !h-[32px] !bg-black !text-white'}>
                                        <AvatarImage src={convo.profileImage as string} />
                                        <AvatarFallback className={'!text-decoration-none !bg-black !text-white'}>{convo.receiverName?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-semibold">{convo.receiverName}</div>
                                        <div className="text-sm text-muted-foreground truncate">
                                            {convo.lastMessage}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </CardContent>
            </Card>

            {/* Chat area */}
            <Card className="md:col-span-2 flex flex-col">
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
                    {currentMessages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${
                                msg.senderId === session?.user?.id ? "justify-end" : "justify-start"
                            }`}
                        >
                            <div
                                className={`max-w-xs p-2 rounded-xl break-words ${
                                    msg.senderId === session?.user?.id ? "bg-primary text-primary-foreground" : "bg-muted"
                                }`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </CardContent>

                <div className="border-t p-3 flex gap-2">
                    <Input
                        placeholder="Écrivez un message..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <Button onClick={sendMessage} disabled={isSending}>
                        {isSending && <span className="animate-spin mr-2">⏳</span>}
                        {isSending ? "Envoi..." : "Envoyer"}
                    </Button>
                </div>
            </Card>
        </div>
    );
}
