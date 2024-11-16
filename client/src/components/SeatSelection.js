import { Col, Row } from "antd";
import React from "react";
import '../resourses/bus.css'
function SeatSelection({
    selectedSeats,
    setSelectedSeats,
    bus
}) {
    const capacity = bus.capacity;
    
    


    const selectOrUnselectSeats=(seatNumber)=>{
        if (selectedSeats.includes(seatNumber)){
            setSelectedSeats(selectedSeats.filter((seat)=> seat !== seatNumber));
        }else{
            setSelectedSeats([...selectedSeats,seatNumber]);
        }
    };

    return (
        <div classname="mx-5">
            <div className="bus-container">
                <Row gutter={[10,10]}>
                 
                    {Array.from({ length: capacity }, (_, seat) => seat + 1).map((seat) => 
                       {
                        let seatClass = ''
                        if(selectedSeats.includes(seat)){
                            seatClass = 'selected-seat'
                        }else if(bus.seatsBooked.includes(seat)){
                            seatClass = 'booked-seat'
                        }
                       return (<Col span={6} >
                        <div className={`seat ${seatClass}`}
                        onClick={()=>selectOrUnselectSeats(seat)}>{seat}</div>
                    
                    </Col>
                    );
                })}
                </Row>

            </div>
        </div>
    );
}

export default SeatSelection;