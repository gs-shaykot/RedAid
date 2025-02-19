// make responsive
import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { FaPhone, FaLocationArrow, FaClock } from "react-icons/fa";
import useDivDis from "../Hooks/useDivDis";
import useBanks from "../Hooks/useBanks";

const BloodBanks = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [searchParams, setSearchParams] = useState({});
    const { Division, District } = searchParams || {};
    console.log('Destructured Div: ', Division, "District: ", District)
    const [BloodBanks, isPending, refetch] = useBanks(Division, District);
    const [districts, upazillas, divisions] = useDivDis();
    const [SelectDivisionId, setSelectedDivisionId] = useState(null);
    const [SelectDistrictId, setSelectedDistrictId] = useState(null);
    const filteredDistrict = SelectDivisionId ?
        districts.filter((district) => district.division_id == SelectDivisionId) : []

    const filteredUpazila = SelectDistrictId ?
        upazillas.filter((upazilla) => upazilla.district_id == SelectDistrictId) : []


    const onSubmit = (data) => {
        console.log(data)
        const FinalData = {
            Division: JSON.parse(data.Divisions).name,
            District: JSON.parse(data.District).name,
        };
        // const Div = JSON.parse(data.Divisions).name
        // const Dist = JSON.parse(data.District).name
        setSearchParams(FinalData);
        refetch();
    };

    return (
        <div className="bg-gray-50 font-inter">
            {/* Main Content */}
            <main className="pt-20">
                {/* Hero Section */}
                <section className="text-center py-16 bg-gray-50">
                    <h1 className="text-4xl font-bold text-gray-900">Find a Blood Bank Near You</h1>
                    <p className="mt-3 text-gray-500 max-w-3xl mx-auto">
                        Search for blood banks in your area and help save lives through blood
                        donation.
                    </p>
                </section>
                <a href="https://shorturl.at/F5XWd" className="center flex justify-center items-center underline mb-3">For Recruiter (Blood Bank Lists)</a>
                {/* Search Section */}
                <section className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7 justify-center">
                            {/* District Selection */}
                            <div>
                                <label className="block mb-2">Division</label>
                                <select
                                    defaultValue=""
                                    className="select select-bordered w-full max-w-xs border rounded p-2"
                                    {...register('Divisions', { required: 'Divisions is required' })}
                                    onChange={(e) => setSelectedDivisionId(JSON.parse(e.target.value).id)}
                                >
                                    <option disabled selected>Select Your District:</option>
                                    {divisions.map((division) => (
                                        <option key={division.id} value={JSON.stringify({ id: division.id, name: division.name })}>
                                            {division.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.Divisions && <p className="text-red-500 text-sm">{errors.Divisions.message}</p>}
                            </div>

                            {/* Upazila Selection */}
                            <div>
                                <label className="block mb-2">Districts</label>
                                <select
                                    defaultValue=""
                                    className="select select-bordered max-w-xs border rounded w-full p-2"
                                    {...register('District', { required: 'District is required' })}
                                >
                                    <option disabled selected>Select Your District:</option>
                                    {filteredDistrict.map((district) => (
                                        <option key={district.id} value={JSON.stringify({ id: district.id, name: district.name })}>
                                            {district.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.District && <p className="text-red-500 text-sm">{errors.District.message}</p>}
                            </div>

                        </div>

                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                        >
                            <span className="text-lg">🔍</span>
                            Search Banks
                        </button>
                    </form>
                </section>

                {/* Stats Section */}
                <section className="py-12 bg-white">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {["Registered Blood Banks", "Available Blood Types", "Active Donors"].map(
                            (item, index) => (
                                <div
                                    key={index}
                                    className="bg-white shadow rounded-lg p-5 flex items-center"
                                >
                                    <div className="text-3xl text-error">
                                        {index === 0 && "🏥"}
                                        {index === 1 && "💉"}
                                        {index === 2 && "🩸"}
                                    </div>
                                    <div className="ml-5">
                                        <p className="text-sm font-medium text-gray-500">{item}</p>
                                        <p className="text-2xl font-semibold text-gray-900">
                                            {index === 0 ? "2,345" : index === 1 ? "8 Types" : "12,456"}
                                        </p>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </section>
                {/* Locations Section */}
                {
                    isPending ? <h1 className="font-5xl flex justify-center items-center font-bold py-5 text-red-500">Search for See Nearest Blood Banks</h1> :
                        <section>
                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-4">Blood Banks Directory</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {BloodBanks.map((bank, index) => (
                                        <div key={index} className="card bg-base-100 shadow-xl border">
                                            <div className="card-body">
                                                <div className="flex gap-2">
                                                    <div className="w-6/12">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h3 className="text-lg font-semibold">{bank.name}</h3>
                                                                <p className="text-yellow-500">⭐⭐⭐⭐⭐ ({bank.reviews} reviews)</p>
                                                            </div>
                                                        </div>
                                                        <p className="flex items-center gap-2 mt-2 text-gray-600">
                                                            <FaLocationArrow /> {bank.Faddress}
                                                        </p>
                                                        <p className="flex items-center gap-2 mt-1 text-gray-600">
                                                            <FaClock /> {bank.hours}
                                                        </p>
                                                        <p className="flex items-center gap-2 mt-1 text-gray-600">
                                                            <FaPhone /> {bank.phone}
                                                        </p>
                                                    </div>
                                                    <div className="w-6/12 h-44">
                                                        {
                                                            <iframe
                                                                src={bank.mapSrc}
                                                                width="100%"
                                                                height="100%"
                                                                style={{ borderRadius: '8px' }}
                                                                allowFullScreen=""
                                                                loading="lazy"
                                                                referrerPolicy="no-referrer-when-downgrade"
                                                            />

                                                        }
                                                    </div>
                                                </div>
                                                <button className="btn bg-red-500 text-white mt-4 w-full" >Get Directions</button>
                                            </div>
                                        </div>

                                    ))}
                                </div>
                            </div>
                        </section>
                }
            </main>
        </div>
    );
};

export default BloodBanks;
