import React, { useEffect, useState } from 'react';

const useDivDis = () => {
    const [districts, setDistricts] = useState([]);
    const [upazillas, setUpazillas] = useState([]);
    const [divisions, setDivision] = useState([]);

    useEffect(() => {
        fetch('/divisions.json')
            .then(res => res.json())
            .then(data => setDivision(data));
        fetch('/districts.json')
            .then(res => res.json())
            .then(data => setDistricts(data));

        fetch('/upazillas.json')
            .then(res => res.json())
            .then(data => setUpazillas(data));
    }, []);
    return [districts, upazillas, divisions]
};

export default useDivDis;