import { EventModalTypes } from 'src/types/types';

import { DesktopEventModal } from './DesktopEventModal';
import { MobileEventModal } from './MobileEventModal';

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
