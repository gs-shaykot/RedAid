import React, { useEffect, useState } from 'react';

const useDivDis = () => {
    const [districts, setDistricts] = useState([]);
    const [upazillas, setUpazillas] = useState([]); 

    useEffect(() => {
        fetch('/districts.json')
            .then(res => res.json())
            .then(data => setDistricts(data));

        fetch('/upazillas.json')
            .then(res => res.json())
            .then(data => setUpazillas(data));
    }, []); 
    return [districts, upazillas]
};

export default useDivDis;