import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";

const opportunities = [
  {
    id: 1,
    title: "Muko Iron And Steel",
    details:
      "Muko hosts hematite deposits of iron ore with 150 million tones. This haematite Iron Ore, show characteristics of high-quality iron ore (55-68% Fe).",
    sector: "Agriculture",
    amountSought: "$240K",
    match: "80% Match",
    status: "Prospecting",
  },
  {
    id: 6,
    title: "Kampala Solar Power",
    details:
      "Kampala Solar Power is a renewable energy company seeking to expand its solar farm. The company has a proven track record of generating clean energy efficiently.",
    sector: "Energy",
    amountSought: "$500K",
    match: "70% Match",
    status: "Prospecting",
  },
  {
    id: 7,
    title: "Nile Microfinance",
    details:
      "Nile Microfinance provides small loans to entrepreneurs and small businesses that lack access to banking services. The company has a high repayment rate and is looking to expand its services.",
    sector: "Finance",
    amountSought: "$300K",
    match: "90% Match",
    status: "Due Diligence",
  },
  {
    id: 8,
    title: "Victoria Fisheries",
    details:
      "Victoria Fisheries is a sustainable fishing company that operates in Lake Victoria. The company is seeking funds to upgrade its fishing equipment and processing facilities.",
    sector: "Agriculture",
    amountSought: "$200K",
    match: "80% Match",
    status: "Negotiation",
  },
  {
    id: 9,
    title: "Savannah Real Estate",
    details:
      "Savannah Real Estate is a property development company that builds affordable housing. The company is seeking investment for a new housing project in Nairobi.",
    sector: "Real Estate",
    amountSought: "$1M",
    match: "75% Match",
    status: "Funding",
  },
  {
    id: 10,
    title: "Rift Valley Tech",
    details:
      "Rift Valley Tech is a tech startup that develops innovative solutions for the agriculture sector. The company is in the final stages of securing funding for its latest project.",
    sector: "Technology",
    amountSought: "$600K",
    match: "85% Match",
    status: "Closure",
  },
];

export const KanbanBoard = () => {
  const [prospectingOpportunities, setProspectingOpportunities] = useState(
    opportunities.filter((opportunity) => opportunity.status === "Prospecting")
  );
  const [dueDiligenceOpportunities, setDueDiligenceOpportunities] = useState(
    opportunities.filter((opportunity) => opportunity.status === "Due Diligence")
  );
  const [negotiationOpportunities, setNegotiationOpportunities] = useState(
    opportunities.filter((opportunity) => opportunity.status === "Negotiation")
  );
  const [fundingOpportunities, setFundingOpportunities] = useState(
    opportunities.filter((opportunity) => opportunity.status === "Funding")
  );
  const [closureOpportunities, setClosureOpportunities] = useState(
    opportunities.filter((opportunity) => opportunity.status === "Closure")
  );
  const [winReady, setWinReady] = useState(false);

  useEffect(() => {
    setWinReady(true);
  }, []);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceOpportunities = getSourceOpportunities(source.droppableId);
    const destinationOpportunities = getDestinationOpportunities(destination.droppableId);

    if (source.droppableId === destination.droppableId) {
      // Reorder opportunities within the same stage
      const newOpportunities = Array.from(sourceOpportunities);
      const [removedOpportunity] = newOpportunities.splice(source.index, 1);
      newOpportunities.splice(destination.index, 0, removedOpportunity);
      setOpportunitiesForStage(source.droppableId, newOpportunities);
    } else {
      // Move opportunities between stages
      const newSourceOpportunities = Array.from(sourceOpportunities);
      const newDestinationOpportunities = Array.from(destinationOpportunities);
      const [removedOpportunity] = newSourceOpportunities.splice(source.index, 1);

      // Update opportunity status based on destination stage
      removedOpportunity.status = destination.droppableId;

      newDestinationOpportunities.splice(destination.index, 0, removedOpportunity);

      setOpportunitiesForStage(source.droppableId, newSourceOpportunities);
      setOpportunitiesForStage(destination.droppableId, newDestinationOpportunities);
    }
  };

  function getSourceOpportunities(stage) {
    switch (stage) {
      case "Prospecting":
        return prospectingOpportunities;
      case "Due Diligence":
        return dueDiligenceOpportunities;
      case "Negotiation":
        return negotiationOpportunities;
      case "Funding":
        return fundingOpportunities;
      case "Closure":
        return closureOpportunities;
      default:
        return [];
    }
  }

  function getDestinationOpportunities(stage) {
    switch (stage) {
      case "Prospecting":
        return prospectingOpportunities;
      case "Due Diligence":
        return dueDiligenceOpportunities;
      case "Negotiation":
        return negotiationOpportunities;
      case "Funding":
        return fundingOpportunities;
      case "Closure":
        return closureOpportunities;
      default:
        return [];
    }
  }

  function setOpportunitiesForStage(stage, opportunities) {
    switch (stage) {
      case "Prospecting":
        setProspectingOpportunities(opportunities);
        break;
      case "Due Diligence":
        setDueDiligenceOpportunities(opportunities);
        break;
      case "Negotiation":
        setNegotiationOpportunities(opportunities);
        break;
      case "Funding":
        setFundingOpportunities(opportunities);
        break;
      case "Closure":
        setClosureOpportunities(opportunities);
        break;
      default:
        break;
    }
  }

  if (!winReady) return null;

  return (
    <Box sx={{ overflowX: "auto", width: "100%" }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={2} direction="row" sx={{ flexWrap: "nowrap" }}>
          {["Prospecting", "Due Diligence", "Negotiation", "Funding", "Closure"].map((stage) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={stage}>
              <h2>{stage}</h2>
              <Droppable droppableId={stage}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {getSourceOpportunities(stage).map((opportunity, index) => (
                      <Draggable
                        key={opportunity.id}
                        draggableId={`${opportunity.id}`}
                        index={index}
                      >
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <CardContent>
                              <Typography variant="h5">{opportunity.title}</Typography>
                              <Typography variant="body1">
                                <strong>Sector: </strong>
                                {opportunity.sector}
                              </Typography>
                              <Typography variant="body1">
                                <strong>Amount Sought:</strong> {opportunity.amountSought}
                              </Typography>
                              <Typography variant="body1">
                                <strong>Match:</strong> {opportunity.match}
                              </Typography>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
    </Box>
  );
};
