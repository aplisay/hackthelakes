import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import axios from 'axios';



const GoogleEmbed = ({ calendar }) => {
  let [dimensions, setDimensions] = useState({width: 800, height: 600});
  useEffect(() => {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    if (vw) {
      setDimensions({width: vw*0.82, height: (vw*0.82*3)/4})
    }

  }, [calendar]);

  return (
    <iframe src={`https://calendar.google.com/calendar/embed?src=${calendar}&ctz=Europe%2FLondon`} title="Google Calendar" style={{ border: 0 }} width={dimensions.width} height={dimensions.height} frameborder="0" scrolling="no"></iframe>
  )
}



const ImagePopout = ({ src, children }) => {
  Modal.setAppElement('#___gatsby')
  let [isOpen, setOpen] = useState(false);
  let munged = src && src.replace(/https:\/\/drive.google.com\/.*id=/, "https://drive.google.com/uc?export=view&id=");
  const customStyles = {
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      opacity: '100%',
      zIndex: 1
    },
  };

  const handleShowDialog = () => {
    setOpen(!isOpen);
    console.log('cliked', { src });
  };

  return (
    <div>
      <div onClick={handleShowDialog}>
        {children}
        {src && <div width="100px">
            <img style={{zIndex: 0, width: '60%'}}
              src={munged}
              alt="no image"
            />
        </div>}
      </div>
        <Modal
          isOpen={isOpen && src}
          onRequestClose={handleShowDialog}
          style={customStyles}
        contentLabel="Poster"

      >
        <img
          style={{
            maxHeight: 'calc(100vh - 100px)',
            zIndex: 1
          }}
          src={munged}
          onClick={handleShowDialog}
            alt="no image"
          />
        </Modal>
    </div>
  );
};

async function getCalendarEvents(calendar, key) {
  let now = (new Date()).toISOString();
  let sixMonths = (new Date((new Date()).valueOf() + 186 * 86400 * 1000)).toISOString();
  let path = `https://www.googleapis.com/calendar/v3/calendars/${calendar}/events?key=${key}&singleEvents=true&orderBy=startTime&timeMin=${now}&timeMax=${sixMonths}`;
  let { data } = await axios.get(path);
  console.log({ path, data });
  return data;
}

const Calendar = ({ calendar, apiKey, eventId }) => {
  console.log({ calendar, apiKey, eventId });
  let [events, setEvents] = useState([]);
  let dateTimeFormat = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short', month: 'short', day: 'numeric',
    hour: 'numeric', minute: 'numeric'
  });
  useEffect(() => {
    calendar && apiKey && getCalendarEvents(calendar, apiKey).then(c => {
      let cEvents = (c.items.length && c.items.filter(i => i.summary)) || [];
      console.log({ items: c.items, cEvents });
      setEvents(cEvents);
    });
  }, [calendar, apiKey]);

  const FmtDates = ({ from, to }) => {
    let dates = dateTimeFormat.formatRange(from, to).split(',');
    return <>
      {dates.slice(0, dates.length - 1).join(',')}
      <br/>
        {dates[dates.length-1]}
    </>
    
  }

  return (
    <>
      {calendar && apiKey &&
        <div class="table-wrapper">
          <table>
            <tbody>

              {events.map(event => (
                <tr>
                  <td>
                    <div class="row">
                      <div class="col-2 col-3-medium col-12-small"><h5>{
                        <FmtDates from={new Date(event.start.dateTime)} to={new Date(event.end.dateTime)}/>
                      }</h5></div>
                      <div class="col-3 col-9-medium col-12-small">
                        <ImagePopout src={event?.attachments?.[0].fileUrl}>
                          <h5>{event.summary}</h5>
                        </ImagePopout>
                      </div>
                      <div class="col-7 col-12-medium" dangerouslySetInnerHTML={{ __html: event.description }}></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
              <tfoot>
              <tr><td>
                <h2>Full Calendar</h2>
                <GoogleEmbed calendar={calendar}/>
                </td></tr>
            </tfoot>

          </table>
          
       
        </div>
      }
    </>
  );
};

export default Calendar;
