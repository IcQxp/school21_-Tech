import { FC, useEffect, useState } from "react";
import { User } from "../../types";
import { avatars } from "../../assets/images/avatars/avatars";
import styles from "./FriendsRequestsList.module.css";
import { RequestCard } from "./RequestCard/RequestCard";

interface FriendsListReqProps {
  friendsReq: {
    createdAt:string;
    friend: User;
    id:number;
    status:string;
    updatedAt:string;
    user:User;
    
  }[];
  removeFromState: (username:string)=>void;
  RelocateReqToFriend: (username: string, firstname: string, lastname: string, profileImageId: string)=>void;
}


export const FriendsRequestsList: FC<FriendsListReqProps> = ({friendsReq,removeFromState,RelocateReqToFriend}) => {


  return (
    <section className={styles.friends_requests_list__container}>
      {friendsReq&&friendsReq.map((request) => {
        const friend = request.user;
        console.log("1.5.1",friend);
        const avatarId = friend.profileImageId as keyof typeof avatars;
        return (
          <RequestCard
            key={friend.username}
            firstname={friend.firstname}
            lastname={friend.lastname}
            description={friend.description}
            username={friend.username}
            avatar={avatarId}
            removeFromState={removeFromState} // Pass function reference
            RelocateReqToFriend={RelocateReqToFriend}
          />
        );
      })}
    </section>
  );
};
