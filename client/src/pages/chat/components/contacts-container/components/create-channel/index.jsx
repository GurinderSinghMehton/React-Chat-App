import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Lottie from "react-lottie";
import { animationDefaultOptions, getColor } from "@/lib/utils";
import { apiClient } from "@/lib/api-client";
import {
  GET_ALL_CONTACTS_ROUTES,
  HOST,
  SEARCH_CONTACTS_ROUTES,
} from "@/utils/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";
import { Button } from "@/components/ui/button";
import MultipleSelector from "@/components/ui/multipleselect";

function CreateChannel() {
  const { setSelectedChatType, setSelectedChatData } = useAppStore();

  const [newChannelModal, setOpenNewChannelModal] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [channelName, setChannelName] = useState("");

  //  • data States • >
  const [paginatedData, setPaginatedData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [hasSearchValue, setHasSearchValue] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncingRef = useRef(null);
  const [page, setPage] = useState({
    normal: 1,
    search: 1,
  });
  const [isFetching, setIsFetching] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = (value) => {
    setHasSearchValue(value.trim().length > 0);
    if (debouncingRef.current) {
      clearTimeout(debouncingRef.current);
    }

    debouncingRef.current = setTimeout(() => {
      setSearchTerm(value.trim());
      setPage((prev) => ({ ...prev, search: 1 }));
      setSearchedData([]);
    }, 800);
  };

  useEffect(() => {
    const getContacts = async () => {
      setIsFetching(true);
      try {
        const response = await apiClient.get(GET_ALL_CONTACTS_ROUTES, {
          params: {
            page: page.normal,
            limit: 8,
          },
          withCredentials: true,
        });

        if (response.status === 200 && response.data.contacts) {
          setPaginatedData((prev) => [...prev, ...response.data.contacts]);
          setTotalPages(response.data?.pagination?.totalPages);
          setIsFetching(false);
        }
      } catch (err) {
        console.error({ err });
        setIsFetching(false);
      }
    };

    if (newChannelModal) {
      getContacts();
    }
  }, [page.normal, newChannelModal]);

  useEffect(() => {
    const searchContacts = async (searchTerm) => {
      setIsFetching(true);
      try {
        if (searchTerm.length > 0) {
          const response = await apiClient.post(
            SEARCH_CONTACTS_ROUTES,
            { searchTerm, page: page.search, limit: 8 },
            { withCredentials: true },
          );

          if (response.status === 200 && response.data.contacts) {
            setSearchedData((prev) => [...prev, ...response.data.contacts]);
            setTotalPages(response.data?.pagination?.totalPages);
            setIsFetching(false);
          }
        }
      } catch (error) {
        console.error(error);
        setIsFetching(false);
      }
    };

    searchContacts(searchTerm);
  }, [searchTerm, page.search]);

  const handleScroll = (e) => {
    if (isFetching || totalPages === page.normal) return;
    if (hasSearchValue && totalPages === page.search) return;
    const target = e.target;
    const { scrollHeight, clientHeight, scrollTop } = target;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      if (hasSearchValue) {
        setPage((prev) => ({ ...prev, search: prev.search }));
      } else {
        setPage((prev) => ({ ...prev, normal: prev.normal }));
      }
    }
  };

  useEffect(() => {
    if (!newChannelModal) {
      setSearchTerm("");
      setHasSearchValue(false);
      setPaginatedData([]);
      setSearchedData([]);
    }
  }, [newChannelModal]);

  const selectNewContact = (contact) => {
    setOpenNewChannelModal(false);
    setSelectedChatType("contact");
    setSelectedChatData(contact);
    setSearchedContacts([]);
    setHasSearchValue(false);
    setPage(1);
    setSearchTerm("");
  };

  const createChannel = async () => {};

  useEffect(() => {
    console.log("Searched Data", searchedData);
  }, [searchedData]);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 text-sm hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setOpenNewChannelModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] text-white mb-2 p-3">
            Create New Channel
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={newChannelModal} onOpenChange={setOpenNewChannelModal}>
        <DialogContent className="bg-[#181920] text-white w-[350px] h-[400px] sm:h-[400px] sm:w-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>
              Please fill up the details for new channel.
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div>
            {/* <Input
              placeholder="Search Contacts"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => handleSearch(e.target.value)}
            /> */}
            <Input
              placeholder="Channel Name"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => setChannelName(e.target.value)}
              value={channelName}
            />
          </div>
          <div>
            <MultipleSelector
              className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white"
              options={!hasSearchValue ? paginatedData : searchedData}
              placeholder="Search Contacts"
              value={selectedContacts}
              onChange={(options) => {
                setSelectedContacts(options);
                // setSearchTerm("");
                // setSearchedContacts([]);
                // setHasSearchValue(false);
              }}
              onSearch={handleSearch}
            />
          </div>
          <div>
            <Button
              className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
              onClick={createChannel}
            >
              Create Channel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateChannel;
