import './Tickets.css'

const Tickets = ({ context, send }) => {

    const finish = () => {
        send({ type: 'FINISH'})
    }

    return (
        <div className='Tickets'>
        <p className='Tickets-description description'>Gracias por volar con book a fly 💚</p>
        <div className='Tickets-ticket'>
            <div className='Tickets-country'>{context.selectedCountry}</div>
            <div className='Tickets-passengers'>
            <span>✈</span>
            {context.passengers.map((person, index) => {
                return <p key={index}>{person}</p>
            })}
            </div>
        </div>
            <button onClick={finish} className='Tickets-finalizar button'>Finalizar</button>
        </div>
    );

};

export default Tickets;