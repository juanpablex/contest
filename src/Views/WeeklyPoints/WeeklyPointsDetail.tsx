
import { Link, useParams } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import WeeklyPointsList from "./WeeklyPointsList";
import ActionButtons from "../../components/ActionButtons";
import { useDeleteEntity, useFetchEntities, useFetchEntity } from "../../hooks/useEntityManager";
import { WeeklyPoints } from "../../types/weeklyPoints";
import { Participants } from "../../types/participants";

const WeeklyPointsDetail = () => {
    const { id } = useParams();

    const tableName = "WeeklyPoints";
    if (!id) throw Error(`${tableName} id not found`);
    const entityId = parseInt(id);

    const { data: dataEntity, status: statusEntity, isSuccess: isSuccessEntity } = useFetchEntity<WeeklyPoints>(
        {
            id: entityId,
            endpoint: '/api/WeeklyPoints',
            navTo: '/weeklyPoints'
        });

    const deleteEntityMutation = useDeleteEntity<WeeklyPoints>(
        {
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

    if (!isSuccessEntity) return <ApiStatus status={statusEntity} />;

    if (!dataEntity) return <div>WeeklyPoints not found.</div>;

    return (
        <div className="row" >
            <div className="row mb-2">
                <h5 className="themeFontColor text-center">

                </h5>
            </div>
            <div className="col-6">
                <div className="row">
                    <WeeklyPointsList />
                </div>

            </div>
            <div className="col-6" >
                {/* <div className="row">
          <h3 className="col-12">{dataWeeklyPoints.name}</h3>
        </div> */}
                <ActionButtons
                    display={getParticipant(dataEntity.participantId)}
                    entity={dataEntity}
                    onDelete={deleteEntityMutation.mutate}
                    editPath={`/weeklyPoints/edit/${dataEntity.id}`}
                />
            </div>
        </div>
    );
};

export default WeeklyPointsDetail;
