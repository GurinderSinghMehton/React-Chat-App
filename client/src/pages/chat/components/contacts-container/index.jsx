import React, { useEffect } from "react";
import AppLogo from "@/assets/Logo.png"
import ProfileInfo from "./components/profile-info";
import NewDm from "./components/new-dm";
import { apiClient } from "@/lib/api-client";
import { GET_DM_CONTACTS_ROUTES } from "@/utils/constants";
import { useAppStore } from "@/store";
import ContactList from "@/components/contact-list";

function ContactsContainer() {

  const { setDirectMessagesContacts, directMessagesContacts } = useAppStore();

  useEffect(() => {
    const getContacts = async () => {
      const response = await apiClient.get(GET_DM_CONTACTS_ROUTES, {withCredentials: true});

      if(response.data.contacts) {
        setDirectMessagesContacts(response.data.contacts);
      }
    }

    getContacts();
  }, [])

  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
      <div className="pt-3">
        <Logo />
      </div>

      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
            <Title text="Direct Messages" />
            <NewDm />
        </div>

        <div className="max-h-[30vh] overflow-y-auto scrollbar-hidden">
            <ContactList contacts={directMessagesContacts} />
        </div>
      </div>

      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
            <Title text="Channels" />
        </div>
      </div>

      <ProfileInfo />
    </div>
  );
}

export default ContactsContainer;

const Logo = () => {
  return (
    <div className="flex p-5  justify-start items-center gap-2">
      <img src={AppLogo} alt="Stickers Logo" height={30} width={70} />
      <span className="text-3xl font-semibold ">Stickers</span>
    </div>
  );
};

const Title = ({text}) => {
    return (
        <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">{text}</h6>
    )
}