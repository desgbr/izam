'use client'
import React, { useMemo, useState } from "react";
import JobCard from "../ui/job-card";
import Pagionation from "./pagionation";
import { jobs } from "@/data/jobs";
import { splitArray } from "@/utils/chunk-array";

const JobsList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 4;
  const pages = useMemo(() => {
    return splitArray(jobs, pageSize)
  }, [])

  return (
    <>
      <div className="grid grid-cols-1 gap-[14px] mb-9">
        {
          pages[currentPage - 1].map((job) => (
            <JobCard key={job.title} job={job} />
          ))
        }   
      </div>
      <Pagionation currentPage={currentPage} pages={pages?.length} setCurrentPage={setCurrentPage} />
    </>
  );
};

export default JobsList;
