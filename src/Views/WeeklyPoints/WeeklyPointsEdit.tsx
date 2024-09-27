import { useParams } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import ValidationSummary from "../../ValidationSummary";
import WeeklyPointsForm from "./WeeklyPointsForm";
import { useFetchEntities, useFetchEntity, useUpdateEntity } from "../../hooks/useEntityManager";
import { WeeklyPoints } from "../../types/weeklyPoints";
import { useQueryClient } from "@tanstack/react-query";
import { Participants } from "../../types/participants";

const WeeklyPointsEdit = () => {
    const queryClient = useQueryClient();
    const { id } = useParams();
    if (!id) throw Error("Need a state id");
    const entityId = parseInt(id);


    const { data, status, isSuccess } = useFetchEntity<WeeklyPoints>(
        {
            id: entityId,
            endpoint: '/api/WeeklyPoints',
            navTo: '/weeklyPoints'
        });

        const { data: dataEntityParticipant } = useFetchEntities<Participants>(
            {
              endpoint: '/api/Participants',
              navTo: '/participants'
            });
    const getParticipant = (id: any) => {
        const entity: string[] = [];
        dataEntityParticipant?.forEach((element: { id: any; singer: string; }) => {
            if (element.id == id) {
                entity.push(element.singer);
            }
        });
        return entity;
    }

    const updateEntityMutation = useUpdateEntity<WeeklyPoints>(
        {
            endpoint: '/api/WeeklyPoints',
            navTo: '/weeklyPoints'
        });

    if (!isSuccess) return <ApiStatus status={status} />;

    return (
        <>
            {updateEntityMutation.isError && (
                <ValidationSummary error={updateEntityMutation.error} />
            )}
            <div className="row mb-2">
                <h5 className="themeFontColor text-center">
                    {getParticipant(data.participantId)}
                </h5>
            </div>
            <WeeklyPointsForm
                entity={data}
                submitted={(entity) => {
                    updateEntityMutation.mutate(entity);
                }} parent={null}
            />
        </>
    );
};

export default WeeklyPointsEdit;
