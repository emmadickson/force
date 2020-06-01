import React from "react"
import { AuctionHouseFilter } from "./AuctionHouseFilter"
import { MediumFilter } from "./MediumFilter"
import { SizeFilter } from "v2/Apps/Components/SizeFilter"
import { YearCreated } from "./YearCreated"
import { useAuctionResultsFilterContext } from "../../AuctionResultsFilterContext"

export const AuctionFilters: React.FC = () => {
  return (
    <>
      <MediumFilter />
      <SizeFilter useFilterContext={useAuctionResultsFilterContext} />
      <YearCreated />
      <AuctionHouseFilter />
    </>
  )
}