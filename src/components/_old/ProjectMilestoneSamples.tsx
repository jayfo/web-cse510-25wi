import * as React from "react";

import { AppLink } from "@/components/links/AppLink";
import { TBD } from "@/components/TBD";
import {
  getProjectSamplesStore,
  ProjectSamplesProjectKeyValues,
} from "@/data/ProjectSamplesData";
import {
  assertProjectSampleMilestoneKey,
  ProjectSamplesMilestoneKey,
} from "@/types/ProjectSamplesStore";
import { Alert } from "@mui/material";

interface ProjectMilestoneSamplesProps {
  milestone: ProjectSamplesMilestoneKey;
}

export const ProjectMilestoneSamples: React.FunctionComponent<
  ProjectMilestoneSamplesProps
> = (props) => {
  // Validate props, TypeScript does not validate in MDX
  assertProjectSampleMilestoneKey(props.milestone);

  return (
    <React.Fragment>
      {(() => {
        const projectSamplesStore = getProjectSamplesStore();

        return (
          <ul>
            {ProjectSamplesProjectKeyValues.map((sampleKeyCurrent) => {
              const sampleCurrent =
                projectSamplesStore.samples[sampleKeyCurrent];

              const renderMilestone: ProjectSamplesMilestoneKey = (() => {
                if (
                  props.milestone == "assignment1b" &&
                  [
                    "bookwurm",
                    "dash",
                    "jasper",
                    "wishingwell", // 17wi
                    "backtrack",
                    "hermes",
                    "pilltender",
                    "simpark", // 17au
                    "laundr",
                    "note",
                    "pawsitive",
                    "seek", // 19wi
                  ].includes(sampleKeyCurrent)
                ) {
                  return "assignment1c";
                }

                return props.milestone;
              })();

              return (
                // Ensure we have a sample for this project
                !!sampleCurrent.sampleCanvasLinks?.[renderMilestone] && (
                  <React.Fragment key={sampleKeyCurrent}>
                    <li>
                      <AppLink
                        href={sampleCurrent.sampleCanvasLinks[renderMilestone]}
                      >
                        {"Sample " + renderMilestone}
                      </AppLink>
                      {" from "}
                      <AppLink href={sampleCurrent.link}>
                        {sampleCurrent.name}
                      </AppLink>
                    </li>
                  </React.Fragment>
                )
              );
            })}
          </ul>
        );
      })()}
    </React.Fragment>
  );
};
