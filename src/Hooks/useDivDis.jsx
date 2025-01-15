import React, { useEffect, useState } from 'react';

const useDivDis = () => {
    const [districts, setDistricts] = useState([]);
    const [divisions, setDivisions] = useState([]); 

    useEffect(() => {
        fetch('/districts.json')
            .then(res => res.json())
            .then(data => setDistricts(data));

        fetch('/divisions.json')
            .then(res => res.json())
            .then(data => setDivisions(data));
    }, []); 
    return [districts, divisions]
};

export default useDivDis;