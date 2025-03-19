import LocationIcon from "@/components/icons/location";
import { Heart, Calendar } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
const JobCard = ({ job }) => {
  const [saved, setSaved] = useState(false);

  return (
    <div className="relative border rounded-lg p-[22px] flex justify-between flex-col gap-2 md:gap-[18px] group bg-white hover:bg-[#F3FDF3] shadow-sm">
      <div className="flex items-start gap-4 h-8 md:h-[70px]">
        <Image
          width={70}
          height={70}
          src={job?.company?.logo || "/placeholder-logo.png"}
          alt={job?.company?.name}
          className="h-8 md:h-[70px] w-8 md:w-[70px] object-contain rounded-lg"
        />
        <div className="flex flex-col justify-between h-full">
          <h2 className="text-sm md:text-xl font-semibold">{job?.title}</h2>
          <p className="text-xs text-green-600 font-medium">
            {job?.company?.name}
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-2 md:gap-[18px]">
          <div className="flex items-center text-gray-500 text-xs md:text-lg gap-2 mt-1">
            <div className="me-2.5 flex items-center gap-1">
              <LocationIcon width={14} />
              <span>{job?.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{job?.published}</span>
            </div>
          </div>

          <div className="flex gap-1 text-[9px] md:text-base">
            {[job?.exp, ...(job?.types || [])].map((item) => (
              <span
                key={item}
                className="bg-[#F7F7F7] group-hover:bg-white px-2 py-1 rounded"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="h-[1px] bg-[#F0F0F0] " />
          <div className="flex gap-4">
            {job?.categories?.map((cat, idx) => (
              <span
                key={cat}
                className="text-gray-500 text-[10px] md:text-sm mt-2 flex gap-4"
              >
                <span>{cat}</span>
                {idx !== job?.categories?.length - 1 && <span> - </span>}
              </span>
            ))}
          </div>
        </div>
      </div>
      <button
        className="absolute top-4 end-4 size-6 md:size-[55px] rounded-full flex items-center border border-[#C4C3C3] justify-center"
        onClick={() => setSaved(!saved)}
      >
        <Heart
          className={`transition size-3 md:size-5  ${
            saved
              ? " fill-red-500 stroke-red-500"
              : "stroke-[#C4C3C3] fill-[#C4C3C3]"
          }`}
        />
      </button>
    </div>
  );
};

export default JobCard;
