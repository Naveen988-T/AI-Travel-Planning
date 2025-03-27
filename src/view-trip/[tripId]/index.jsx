import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../../service/firebaseConfig";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';






function Viewtrip() {
    const { tripId } = useParams(); // Get tripId from URL
    const [trip, setTrip] = useState(null);

    useEffect(() => {
        const GetTripData = async () => {
            const docRef = doc(db, 'AiTrip', tripId); // Reference to the document
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                const data = docSnap.data();
                console.log("Document:", {
                    id: docSnap.id,
                    ...data
                });
                setTrip(data);
            } else {
                console.log("No such document!");
            }
        };
    
        if (tripId) {
            GetTripData();
        }
    }, [tripId]);
    

    return (
        <div>
            {/* Information section */}
            <InfoSection trip={trip} />

            {/* Recommanded hotels */}
            <Hotels trip={trip} />

            {/* Daily plans */}
             <PlacesToVisit trip={trip} />

            {/* Footer */}
            <Footer trip={trip} />


        </div>
    );
}

export default Viewtrip;
