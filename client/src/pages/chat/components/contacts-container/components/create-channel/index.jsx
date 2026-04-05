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
import { HOST, SEARCH_CONTACTS_ROUTES } from "@/utils/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";

function CreateChannel() {
  const { setSelectedChatType, setSelectedChatData } = useAppStore();

  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);

  const [hasSearchValue, setHasSearchValue] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncingRef = useRef(null);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = (value) => {
    setHasSearchValue(value.trim().length > 0);
    if (debouncingRef.current) {
      clearTimeout(debouncingRef.current);
    }

    debouncingRef.current = setTimeout(() => {
      setSearchTerm(value.trim());
      setPage(1);
      setSearchedContacts([]);
    }, 800);
  };

  useEffect(() => {
    const searchContacts = async (searchTerm) => {
      setIsFetching(true);
      try {
        if (searchTerm.length > 0) {
          const response = await apiClient.post(
            SEARCH_CONTACTS_ROUTES,
            { searchTerm, page: page, limit: 8 },
            { withCredentials: true },
          );

          if (response.status === 200 && response.data.contacts) {
            setSearchedContacts((prev) => [...prev, ...response.data.contacts]);
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
  }, [searchTerm, page]);

  const handleScroll = (e) => {
    console.log("scrolling");
    // if (isFetching || totalPages === page) return;
    const target = e.target;
    const { scrollHeight, clientHeight, scrollTop } = target;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      setPage((prev) => prev + 1);
    }
  };

  const selectNewContact = (contact) => {
    setOpenNewContactModal(false);
    setSelectedChatType("contact");
    setSelectedChatData(contact);
    setSearchedContacts([]);
    setHasSearchValue(false);
    setPage(1);
    setSearchTerm("");
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 text-sm hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setOpenNewContactModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] text-white mb-2 p-3">
            Select New Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
        <DialogContent className="bg-[#181920] text-white w-[350px] h-[400px] sm:h-[400px] sm:w-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Please Select a Contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div>
            <Input
              placeholder="Search Contacts"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateChannel;
