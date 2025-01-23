"use client";

import { useEffect, useState } from "react";
import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { user } = useUser();
  const client = useStreamVideoClient();

  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });

  const [callDetails, setCallDetails] = useState<Call | null>(null);
  const { toast } = useToast();

  const createMeeting = async () => {
    if (!user || !client) return;

    try {
      if (!values.dateTime) {
        toast({ title: "Please select a date and time" });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call");

      const startsAt = values.dateTime.toISOString();
      const description = values.description || "Instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({ title: "Meeting has created" });
    } catch (error) {
      console.error(error);
      toast({
        title: "Fialed to create meeting room",
      });
    }
  };

  if (!isMounted) return null;

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New meeting"
        description="Start a new meeting"
        className="bg-orange-1"
        handleClick={() => setMeetingState("isInstantMeeting")}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-blue-1"
        handleClick={() => setMeetingState("isScheduleMeeting")}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Check out your recordings"
        className="bg-purple-1"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join meeting"
        description="Via invitation link"
        className="bg-yellow-1"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start a new Meeting"
        className="text-center"
        buttonText="Start meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
