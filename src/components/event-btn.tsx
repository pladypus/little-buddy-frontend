import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gql } from "graphql-request";
import log from "loglevel";
import { useRouter } from "next/router";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import gqlClient from "~/utils/grqphql-client";
import Button from "./UI/Button";

type eventType = "pee" | "poop" | "walk" | "feed";

const EventBtn: React.FC<{
  icon: IconProp;
  type: eventType;
  setEvents: Dispatch<SetStateAction<any[]>>;
}> = (props) => {
  const router = useRouter();

  const handleClick = async () => {
    const query = gql`
    mutation {
      createEvent(input: {type: ${props.type}, dogId: "${router.query.dogId}"}){
        id
        type
        createdAt
      }
    }
  `;

    try {
      const res = await gqlClient.request(query);
      props.setEvents((prev) => [res.createEvent, ...prev]);
    } catch (error) {
      log.error("🚀 ~ file: event-btn.tsx:30 ~ handleClick ~ error:", error);
    }
  };

  return (
    <Button className="text-xl p-5 capitalize" onClick={handleClick}>
      {props.type} <FontAwesomeIcon icon={props.icon} />
    </Button>
  );
};

export default EventBtn;
