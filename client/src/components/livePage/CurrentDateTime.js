import React, {useState, useEffect} from 'react';

function CurrentDateTime() {
   
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 1000);
        return () => {
          clearInterval(interval);
        };
      }, []);

      let updatedTime = new Date(time)

    return (
        <div>
            {updatedTime.toLocaleDateString('en-US', { hour: '2-digit', minute: "2-digit", hour12: true } )}
        </div>
    );
}

export default CurrentDateTime;