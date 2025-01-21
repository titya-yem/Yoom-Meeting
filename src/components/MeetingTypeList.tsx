"use client";

import { useState } from "react";
import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";

const MeetingTypeList = () => {
  const [meetingSate, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoingingMeeting" | "isInstantMeeting" | undefined
  >();

  const createMeeting = () => {
    
  };

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New meeting"
        description="start a new meeting"
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
        description="Check out your recprdongs"
        className="bg-purple-1"
        handleClick={() => setMeetingState("isJoingingMeeting")}
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join meeting"
        description="Via invitation link"
        className="bg-yellow-1"
        handleClick={() => setMeetingState("isJoingingMeeting")}
      />

      <MeetingModal
        isOpen={meetingSate === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start meeting"
        handClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
