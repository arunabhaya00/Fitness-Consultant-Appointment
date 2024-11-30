import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/FitnessConsultantList.css'

const FitnessConsultantList = ({ fitnessConsultant }) => {

    const navigate = useNavigate();
    return (
        <>
            <div className="card m-3"
            style={{cursor:"pointer"}}
            onClick={()=> navigate(`/fitness-consultant/book-appointment/${fitnessConsultant._id}`)}
            >

                <div className="card-header">
                    Spt. {fitnessConsultant.firstName} {fitnessConsultant.lastName}
                </div>

                <div className="card-body">
                    <p>
                        <b>Specialization:</b> {fitnessConsultant.specialization}
                    </p>
                    <p>
                        <b>Experience:</b> {fitnessConsultant.experience}
                    </p>
                    <p>
                        <b>Fees Per Consultation:</b> {fitnessConsultant.feesPerConsutation}
                    </p>
                    <p>
                        <b>Available:</b> {fitnessConsultant.timings[0]} - {fitnessConsultant.timings[1]}
                    </p>
                </div>
            </div>
        </>
    );
};

export default FitnessConsultantList;
