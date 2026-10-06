"use client";

import { CheckCircle2Icon, CircleAlertIcon } from "lucide-react";
import { useNotification } from "./NotificationContext";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export default function Notification() {
  const { message, type } = useNotification();

  if (!message) return null;

  return (
    <div
      data-testid="notification"
      className="fixed right-4 bottom-4 z-50 w-[calc(100vw-2rem)] max-w-sm"
    >
      <Alert variant={type === "error" ? "destructive" : "default"}>
        {type === "error" ? <CircleAlertIcon /> : <CheckCircle2Icon />}
        <AlertTitle>{type === "error" ? "Error" : "Success"}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  );
}
