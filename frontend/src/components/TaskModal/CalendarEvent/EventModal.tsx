import { TaskObjTypes } from 'src/types/types';

import { DesktopEventModal } from './DesktopEventModal';
import { MobileEventModal } from './MobileEventModal';

export type EventModalTypes = {
    closeEventModal: () => void;
    currentEventData: TaskObjTypes | null;
    eventOpen: boolean;
    position: { left: number; top: number };
};
export const EventModal = ({ closeEventModal, eventOpen, position, currentEventData }: EventModalTypes) => {
    console.log(currentEventData);
    return (
        <div>
            {eventOpen && currentEventData ? (
                <>
                    <DesktopEventModal
                        closeEventModal={closeEventModal}
                        eventOpen={eventOpen}
                        position={position}
                        currentEventData={currentEventData}
                    />
                    <MobileEventModal closeEventModal={closeEventModal} currentEventData={currentEventData} />
                </>
            ) : null}
        </div>
    );
};
